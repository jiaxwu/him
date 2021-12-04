package auth

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/apache/rocketmq-client-go/v2"
	"github.com/apache/rocketmq-client-go/v2/primitive"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/go-playground/validator/v10"
	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"him/conf"
	"him/model"
	"him/service/common"
	"him/service/service/sm"
	"regexp"
	"strconv"
	"time"
)

type Service struct {
	db                *gorm.DB
	rdb               *redis.Client
	validate          *validator.Validate
	logger            *logrus.Logger
	smService         *sm.Service
	authEventProducer rocketmq.Producer
	config            *conf.Config
}

func NewService(authEventProducer rocketmq.Producer, db *gorm.DB, rdb *redis.Client, validate *validator.Validate,
	logger *logrus.Logger, smService *sm.Service, config *conf.Config) *Service {
	return &Service{
		db:                db,
		rdb:               rdb,
		validate:          validate,
		logger:            logger,
		smService:         smService,
		config:            config,
		authEventProducer: authEventProducer,
	}
}

// Login 登录
func (s *Service) Login(req *LoginReq) (rsp *LoginRsp, err error) {
	// 检查终端是否正确
	if !TerminalSet[req.Terminal] {
		return nil, common.ErrCodeInvalidParameter
	}

	// 短信验证码登录
	if req.Type == LoginTypeSmVerCode {
		rsp, err = s.loginBySmVerCode(req.Terminal, req.Content.SmVerCodeLoginContent)
		if err != nil {
			return nil, err
		}
	} else
	// 密码登录
	if req.Type == LoginTypePassword {
		rsp, err = s.loginByPassword(req.Terminal, req.Content.PasswordLoginContent)
		if err != nil {
			return nil, err
		}
	} else {
		return nil, common.ErrCodeInvalidParameter
	}

	// 发送登录事件
	s.sendLoginEvent(&LoginEvent{
		UserID:    rsp.UserID,
		LoginTime: uint64(time.Now().Unix()),
		Terminal:  req.Terminal,
		LoginType: req.Type,
	})

	return rsp, nil
}

// 短信验证码登录
func (s *Service) loginBySmVerCode(terminal Terminal, req *SmVerCodeLoginContent) (*LoginRsp, error) {
	// 验证手机号码和验证码格式
	var validateStruct = struct {
		Phone     string `validate:"required,phone"`
		SmVerCode string `validate:"required,len=6,numeric"`
	}{
		Phone:     req.Phone,
		SmVerCode: req.SmVerCode,
	}
	if err := s.validate.Struct(&validateStruct); err != nil {
		return nil, common.ErrCodeInvalidParameter
	}

	// 验证短信验证码
	if err := s.validSmVerCode(req.SmVerCode, req.Phone, SmVerCodeActionLogin); err != nil {
		return nil, err
	}

	return s.loginByPhone(terminal, req.Phone)
}

// 验证短信验证码
func (s *Service) validSmVerCode(smVerCode, phone string, action SmVerCodeAction) error {
	smVerCodeKey := s.smVerCodeRedisKey(phone, action)
	smVerByRedis, err := s.rdb.Get(context.Background(), smVerCodeKey).Result()
	if err == redis.Nil {
		return ErrCodeInvalidParameterSmVerCodeNotExist
	}
	if err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return err
	}
	if smVerByRedis != smVerCode {
		return ErrCodeInvalidParameterSmVerCodeError
	}

	// 验证成功要把验证码删了
	if err := s.rdb.Del(context.Background(), smVerCodeKey).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
	}
	return nil
}

// loginByPhone 通过手机登录
func (s *Service) loginByPhone(terminal Terminal, phone string) (*LoginRsp, error) {
	// 获取用户编号
	phoneLogin := model.PhoneLogin{
		Phone: phone,
	}
	err := s.db.Where(&phoneLogin).Take(&phoneLogin).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}
	userID := phoneLogin.UserID

	// 如果用户还没有使用手机注册，则进行注册
	if errors.Is(err, gorm.ErrRecordNotFound) {
		if userID, err = s.register(phone); err != nil {
			return nil, err
		}
	}

	return s.login(terminal, userID)
}

// 密码登录
func (s *Service) loginByPassword(terminal Terminal, req *PasswordLoginContent) (*LoginRsp, error) {
	// 获取对应的用户
	phoneLogin := model.PhoneLogin{
		Phone: req.Account,
	}
	err := s.db.Where(&phoneLogin).Take(&phoneLogin).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrCodeInvalidParameterLoginUsernameOrPassword
	}
	if err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}

	// 获取密码
	passwordLogin := model.PasswordLogin{
		UserID: phoneLogin.UserID,
	}
	err = s.db.Where(&passwordLogin).Take(&passwordLogin).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrCodeInvalidParameterLoginUsernameOrPassword
	}
	if err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}

	// 判断密码是否正确
	if err := bcrypt.CompareHashAndPassword([]byte(passwordLogin.Password), []byte(req.Password)); err != nil {
		return nil, ErrCodeInvalidParameterLoginUsernameOrPassword
	}

	return s.login(terminal, phoneLogin.UserID)
}

// login 登录
func (s *Service) login(terminal Terminal, userID uint64) (*LoginRsp, error) {
	// 获取用户类型
	var user model.User
	if err := s.db.Take(&user, userID).Error; err != nil {
		return nil, err
	}

	// 检查该用户在该终端是否已经登录了
	antiKey := s.antiTokenRedisKey(userID, terminal)
	oldToken, err := s.rdb.Get(context.Background(), antiKey).Result()
	if err != nil && !errors.Is(err, redis.Nil) {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}
	// 如果已经存在，把原来的token过期了
	if err == nil {
		// 删除token和反向token
		tokenKey := s.tokenRedisKey(oldToken)
		if err := s.rdb.Del(context.Background(), tokenKey, antiKey).Err(); err != nil {
			s.logger.WithField("err", err).Error("rdb exception")
			return nil, err
		}
	}

	// 生成Token并添加到Redis
	token := gofakeit.UUID()
	tokenKey := s.tokenRedisKey(token)
	session := &Session{
		UserID:   userID,
		UserType: UserType(user.Type),
		Terminal: terminal,
	}
	sessionBytes, _ := json.Marshal(session)
	// 先插入反向Token
	if err := s.rdb.Set(context.Background(), antiKey, token, TokenExp).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}
	// 再插入正向token
	if err := s.rdb.Set(context.Background(), tokenKey, sessionBytes, TokenExp).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}

	return &LoginRsp{
		Token:  token,
		UserID: userID,
	}, nil
}

// SendSmVerCode 发送短信验证码
func (s *Service) SendSmVerCode(req *SendSmVerCodeReq) (*SendSmVerCodeRsp, error) {
	// 验证行为
	if SmVerCodeActionToTemplateIDMap[req.Action] == "" {
		return nil, common.ErrCodeInvalidParameter
	}
	if err := s.validate.Struct(req); err != nil {
		return nil, common.ErrCodeInvalidParameter
	}

	// 把验证码加到缓存
	smVerCode := gofakeit.DigitN(SmVerCodeLen)
	key := s.smVerCodeRedisKey(req.Phone, req.Action)
	expireTime := SmVerCodeExpMinute * time.Minute
	if err := s.rdb.Set(context.Background(), key, smVerCode, expireTime).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}

	// 发送验证码
	if _, err := s.smService.SendSm(&sm.SendSmReq{
		Phone:      req.Phone,
		TemplateID: SmVerCodeActionToTemplateIDMap[req.Action],
		Params:     []string{smVerCode, strconv.Itoa(SmVerCodeExpMinute)},
	}); err != nil {
		return nil, err
	}

	return &SendSmVerCodeRsp{}, nil
}

// 注册账号
func (s *Service) register(phone string) (uint64, error) {
	var user = model.User{
		Type:         uint8(UserTypeUser),
		RegisteredAt: uint64(time.Now().Unix()),
	}
	if err := s.db.Transaction(func(tx *gorm.DB) error {
		// 创建用户
		if err := tx.Create(&user).Error; err != nil {
			return err
		}

		// 创建手机登录
		if err := tx.Create(&model.PhoneLogin{
			UserID: user.ID,
			Phone:  phone,
		}).Error; err != nil {
			return err
		}

		return nil
	}); err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return 0, err
	}
	return user.ID, nil
}

// ChangePassword 修改密码
func (s *Service) ChangePassword(req *ChangePasswordReq) (*ChangePasswordRsp, error) {
	// 检查验证码
	if err := s.validSmVerCode(req.SmVerCode, req.Phone, SmVerCodeActionChangePassword); err != nil {
		return nil, err
	}

	// 检查密码强度
	if err := s.checkPasswordLevel(req.Password); err != nil {
		return nil, err
	}

	// 根据手机号获取用户编号
	phoneLogin := model.PhoneLogin{
		Phone: req.Phone,
	}
	err := s.db.Where(&phoneLogin).Take(&phoneLogin).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	// 如果手机号码还没注册
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrCodeInvalidParameterPhoneNotRegister
	}

	// 获取原始密码
	passwordLogin := model.PasswordLogin{
		UserID: phoneLogin.UserID,
	}
	takeErr := s.db.Where(&passwordLogin).Take(&passwordLogin).Error
	if takeErr != nil && !errors.Is(takeErr, gorm.ErrRecordNotFound) {
		s.logger.WithField("err", takeErr).Error("db exception")
		return nil, takeErr
	}

	// 设置新密码
	passwordBytes, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		s.logger.WithField("err", err).Error("bcrypt GenerateFromPassword exception")
		return nil, err
	}
	passwordLogin.Password = string(passwordBytes)

	// 如果没有绑定过密码，则创建
	if errors.Is(takeErr, gorm.ErrRecordNotFound) {
		if err := s.db.Create(&passwordLogin).Error; err != nil {
			s.logger.WithField("err", err).Error("db exception")
			return nil, err
		}
		return &ChangePasswordRsp{}, nil
	}

	// 否则更新密码
	if err := s.db.Updates(&passwordLogin).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}
	return &ChangePasswordRsp{}, nil
}

// checkPasswordLevel 检查密码强度
func (s *Service) checkPasswordLevel(password string) error {
	// 强度检查
	if len(password) < 8 || len(password) > 20 {
		return ErrCodeInvalidParameterLoginPasswordNotMeetRequirements
	}

	var count uint
	for _, passwordCharSetRegexp := range PasswordCharSetRegexps {
		if passwordCharSetRegexp.MatchString(password) {
			count++
		}
	}
	if count < 3 {
		return ErrCodeInvalidParameterLoginPasswordNotMeetRequirements
	}

	// 字符集检查
	passwordCharSetRegexp := fmt.Sprintf(`[%s]{%d}`, PasswordCharSet, len(password))
	if match, _ := regexp.MatchString(passwordCharSetRegexp, password); !match {
		return ErrCodeInvalidParameterLoginPasswordNotMeetRequirements
	}

	return nil
}

// Logout 退出登录
func (s *Service) Logout(req *LogoutReq) (*LogoutRsp, error) {
	// 退出登录
	tokenKey := s.tokenRedisKey(req.Token)
	antiKey := s.antiTokenRedisKey(req.UserID, req.Terminal)
	sha1, err := s.rdb.ScriptLoad(context.Background(), LogoutRedisScript).Result()
	if err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}
	if err := s.rdb.EvalSha(context.Background(), sha1, []string{tokenKey, antiKey}).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}

	// 发送退出登录事件
	s.sendLogoutEvent(&LogoutEvent{
		UserID:     req.UserID,
		Terminal:   req.Terminal,
		LogoutTime: uint64(time.Now().Unix()),
	})

	return &LogoutRsp{}, nil
}

// Authorize 权限验证
func (s *Service) Authorize(req *AuthorizeReq) (*AuthorizeRsp, error) {
	// 获取Session
	rsp, err := s.GetSession(&GetSessionReq{Token: req.Token})
	if err != nil {
		return nil, err
	}

	// 判断是否有需要的角色
	if req.UserTypes != nil && len(req.UserTypes) != 0 {
		hasRole := false
		for _, userType := range req.UserTypes {
			if rsp.Session.UserType == userType {
				hasRole = true
				break
			}
		}
		if !hasRole {
			return nil, common.ErrCodeForbidden
		}
	}

	return &AuthorizeRsp{
		Session: rsp.Session,
	}, nil
}

// GetSession 获取Session
func (s *Service) GetSession(req *GetSessionReq) (*GetSessionRsp, error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, ErrCodeUnauthorizedInvalidToken
	}

	// 判断Token是否过期
	key := s.tokenRedisKey(req.Token)
	sessionBytes, err := s.rdb.Get(context.Background(), key).Bytes()
	if errors.Is(err, redis.Nil) {
		return nil, ErrCodeUnauthorizedInvalidToken
	}
	if err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}

	// 解析Session
	var session Session
	_ = json.Unmarshal(sessionBytes, &session)

	// 延长Token的过期时间
	if err := s.rdb.Expire(context.Background(), key, TokenExp).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}

	// 延长AntiToken过期时间
	antiKey := s.antiTokenRedisKey(session.UserID, session.Terminal)
	if err := s.rdb.Expire(context.Background(), antiKey, TokenExp).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}

	return &GetSessionRsp{
		Session: &session,
	}, nil
}

// smVerCodeRedisKey 登录短信验证码 Redis Key
func (s *Service) smVerCodeRedisKey(phone string, action SmVerCodeAction) string {
	return fmt.Sprintf("auth:sm-ver-code:%s:%s", phone, action)
}

// tokenRedisKey Token Redis Key
func (s *Service) tokenRedisKey(token string) string {
	return fmt.Sprintf("auth:token:%s", token)
}

// antiTokenRedisKey 反向Token Redis Key
func (s *Service) antiTokenRedisKey(userID uint64, terminal Terminal) string {
	return fmt.Sprintf("auth:token:anti:%d:%s", userID, terminal)
}

// sendLoginEvent 发送登录事件
func (s *Service) sendLoginEvent(loginEvent *LoginEvent) {
	body, _ := json.Marshal(loginEvent)
	message := primitive.NewMessage(s.config.RocketMQ.Topic, body).WithTag(LoginEventTag)
	s.sendEventMessage(message)
}

// sendLogoutEvent 发送退出登录事件
func (s *Service) sendLogoutEvent(logoutEvent *LogoutEvent) {
	body, _ := json.Marshal(logoutEvent)
	message := primitive.NewMessage(s.config.RocketMQ.Topic, body).WithTag(LogoutEventTag)
	s.sendEventMessage(message)
}

// sendEventMessage 发送事件消息
func (s *Service) sendEventMessage(message *primitive.Message) {
	resCB := func(ctx context.Context, result *primitive.SendResult, err error) {
		s.logger.WithField("res", result).Info("send msg success")
	}
	if err := s.authEventProducer.SendAsync(context.Background(), resCB, message); err != nil {
		s.logger.WithField("err", err).Error("consumer msg exception")
	}
}
