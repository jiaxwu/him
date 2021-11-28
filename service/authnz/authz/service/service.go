package service

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
	"github.com/xiaohuashifu/him/api/authnz"
	"github.com/xiaohuashifu/him/api/authnz/authn"
	pb "github.com/xiaohuashifu/him/api/authnz/authz"
	"github.com/xiaohuashifu/him/api/authnz/authz/mq"
	"github.com/xiaohuashifu/him/api/constant"
	"github.com/xiaohuashifu/him/api/sm"
	"github.com/xiaohuashifu/him/conf"
	"github.com/xiaohuashifu/him/service/authnz/authz/code"
	authzConstant "github.com/xiaohuashifu/him/service/authnz/authz/constant"
	"github.com/xiaohuashifu/him/service/authnz/authz/db"
	"github.com/xiaohuashifu/him/service/common"
	smsModel "github.com/xiaohuashifu/him/service/sm/model"
	smService "github.com/xiaohuashifu/him/service/sm/service"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/protobuf/proto"
	"gorm.io/gorm"
	"time"
)

type AuthzService struct {
	db                 *gorm.DB
	rdb                *redis.Client
	validate           *validator.Validate
	logger             *logrus.Logger
	smService          *smService.SmService
	loginEventProducer rocketmq.Producer
	config             *conf.Config
}

func NewAuthzService(loginEventProducer rocketmq.Producer, db *gorm.DB, rdb *redis.Client, validate *validator.Validate,
	logger *logrus.Logger, smService *smService.SmService, config *conf.Config) *AuthzService {
	return &AuthzService{
		db:                 db,
		rdb:                rdb,
		validate:           validate,
		logger:             logger,
		smService:          smService,
		config:             config,
		loginEventProducer: loginEventProducer,
	}
}

// Login 登录
func (s *AuthzService) Login(req *pb.LoginReq) (resp *pb.LoginResp, err error) {
	// 判断终端
	if req.Terminal < constant.Terminal_TERMINAL_APP && req.Terminal > constant.Terminal_TERMINAL_WEB {
		return nil, common.CodeInvalidParameter
	}

	var loginType pb.LoginType
	// 登录
	if req.GetSmVerCodeContent() != nil {
		loginType = pb.LoginType_LOGIN_TYPE_SM_VER_CODE
		resp, err = s.loginBySmVerCode(ctx, req.Terminal, req.GetSmVerCodeContent())
	} else if req.GetPwdContent() != nil {
		loginType = pb.LoginType_LOGIN_TYPE_PWD
		resp, err = s.loginByPwd(ctx, req.Terminal, req.GetPwdContent())
	} else {
		return nil, common.CodeInvalidParameter
	}
	if err != nil {
		return nil, err
	}

	// 发送登录事件
	s.sendLoginEvent(&mq.LoginEvent{
		UserId:    resp.UserId,
		LoginType: loginType,
		LoginTime: uint64(time.Now().Unix()),
	})
	return resp, nil
}

// 短信验证码登录
func (s *AuthzService) loginBySmVerCode(ctx context.Context, terminal constant.Terminal,
	req *pb.LoginReq_SmVerCodeContent) (*pb.LoginResp, error) {
	// 判断手机号码格式
	if s.validate.Var(req.Phone, "required,phone") != nil {
		return nil, code.InvalidParameterLoginPhone
	}
	// 判断验证码格式
	if s.validate.Var(req.SmVerCode, "required,len=6,numeric") != nil {
		return nil, code.InvalidParameterLoginSmVerCode
	}

	// 验证短信验证码
	smVerCodeKey := s.smVerCodeRedisKeyForLogin(req.Phone, terminal)
	smVerCodeByRedis, err := s.rdb.Get(ctx, smVerCodeKey).Result()
	if err == redis.Nil {
		return nil, code.InvalidParameterLoginSmVerCodeNotExist
	}
	if err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}
	if smVerCodeByRedis != req.SmVerCode {
		return nil, code.InvalidParameterLoginSmVerCodeError
	}

	// 验证成功要把验证码删了
	if err := s.rdb.Del(ctx, smVerCodeKey).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}

	return s.loginByPhone(ctx, terminal, req.Phone)
}

// loginByPhone 通过手机登录
func (s AuthzService) loginByPhone(ctx context.Context, terminal constant.Terminal, phone string) (
	*pb.LoginResp, error) {
	// 获取用户编号
	phoneLogin := db.PhoneLogin{
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

	return s.login(ctx, terminal, userID)
}

// 密码登录
func (s *AuthzService) loginByPwd(ctx context.Context, terminal constant.Terminal, req *pb.LoginReq_PwdContent) (
	*pb.LoginResp, error) {
	// 获取对应的用户
	phoneLogin := db.PhoneLogin{
		Phone: req.Account,
	}
	err := s.db.Where(&phoneLogin).Take(&phoneLogin).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, code.InvalidParameterLoginUsernameOrPwd
	}
	if err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}

	// 获取密码
	passwordLogin := db.PwdLogin{
		UserID: phoneLogin.UserID,
	}
	err = s.db.Where(&passwordLogin).Take(&passwordLogin).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, code.InvalidParameterLoginUsernameOrPwd
	}
	if err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}

	// 判断密码是否正确
	if err := bcrypt.CompareHashAndPassword([]byte(passwordLogin.Pwd), []byte(req.Pwd)); err != nil {
		return nil, code.InvalidParameterLoginUsernameOrPwd
	}

	return s.login(ctx, terminal, phoneLogin.UserID)
}

// login 登录
func (s *AuthzService) login(ctx context.Context, terminal constant.Terminal, userID uint64) (*pb.LoginResp, error) {
	// 获取用户类型
	var user db.User
	if err := s.db.Take(&user, userID).Error; err != nil {
		return nil, err
	}

	// 检查该用户在该终端是否已经登录了
	antiKey := s.antiTokenRedisKey(userID, terminal)
	oldToken, err := s.rdb.Get(ctx, antiKey).Result()
	if err != nil && !errors.Is(err, redis.Nil) {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}
	// 如果已经存在，把原来的token过期了
	if err == nil {
		// 删除token和反向token
		tokenKey := s.tokenRedisKey(oldToken)
		if err := s.rdb.Del(ctx, tokenKey, antiKey).Err(); err != nil {
			s.logger.WithField("err", err).Error("rdb exception")
			return nil, err
		}
	}

	// 生成Token并添加到Redis
	token := gofakeit.UUID()
	tokenKey := s.tokenRedisKey(token)
	session := &authnz.Session{
		UserId:   userID,
		UserType: authnz.UserType(user.Type),
		Terminal: terminal,
	}
	sessionBytes, _ := proto.Marshal(session)
	// 先插入反向Token
	if err := s.rdb.Set(ctx, antiKey, token, authzConstant.TokenExp).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}
	// 再插入正向token
	if err := s.rdb.Set(ctx, tokenKey, sessionBytes, authzConstant.TokenExp).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}

	return &pb.LoginResp{
		Token: token,
	}, nil
}

// SendSmVerCodeForLogin 发送登录需要的短信验证码
func (s *AuthzService) SendSmVerCodeForLogin(ctx context.Context, req *pb.SendSmVerCodeForLoginReq) (
	*pb.SendSmVerCodeForLoginResp, error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, common.CodeInvalidParameter
	}

	// 把验证码加到缓存
	smVerCode := gofakeit.DigitN(authzConstant.SmVerCodeLen)
	key := s.smVerCodeRedisKeyForLogin(req.Phone, req.Terminal)
	expireTime := authzConstant.SmVerCodeExpMinute * time.Minute
	if err := s.rdb.Set(ctx, key, smVerCode, expireTime).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, err
	}

	// 发送验证码
	if _, err := s.smServiceClient.SendVecCodeForLogin(ctx, &sm.SendVecCodeForLoginReq{
		Phone:     req.Phone,
		VecCode:   smVerCode,
		ExpMinute: authzConstant.SmVerCodeExpMinute,
	}); err != nil {
		return nil, err
	}

	return &pb.SendSmVerCodeForLoginResp{}, nil
}

// 注册账号
func (s *AuthzService) register(phone string) (uint64, error) {
	var user = db.User{
		Type:         uint8(authnz.UserType_USER_TYPE_USER),
		RegisteredAt: uint64(time.Now().Unix()),
	}
	if err := s.db.Transaction(func(tx *gorm.DB) error {
		// 创建用户
		if err := tx.Create(&user).Error; err != nil {
			return err
		}

		// 创建手机登录
		if err := tx.Create(&db.PhoneLogin{
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

// UpdatePwd 更新密码
func (s *AuthzService) UpdatePwd(_ context.Context, req *pb.UpdatePwdReq) (*pb.UpdatePwdResp,
	error) {
	// 检查密码强度
	if err := s.checkPwdLevel(req.Pwd); err != nil {
		return nil, err
	}

	// 编码新密码
	pwdBytes, err := bcrypt.GenerateFromPassword([]byte(req.Pwd), bcrypt.DefaultCost)
	if err != nil {
		s.logger.WithField("err", err).Error("bcrypt GenerateFromPassword exception")
		return nil, err
	}

	// 获取原始密码
	pwdLogin := db.PwdLogin{
		UserID: req.UserId,
	}
	err = s.db.Where(&pwdLogin).Take(&pwdLogin).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}
	pwdLogin.Pwd = string(pwdBytes)

	// 如果没有绑定过密码，则创建
	if errors.Is(err, gorm.ErrRecordNotFound) {
		if err := s.db.Create(&pwdLogin).Error; err != nil {
			s.logger.WithField("err", err).Error("db exception")
			return nil, err
		}
		return &pb.UpdatePwdResp{}, nil
	}

	// 否则更新密码
	if err := s.db.Updates(&pwdLogin).Error; err != nil {
		s.logger.WithField("err", err).Error("db exception")
		return nil, err
	}
	return &pb.UpdatePwdResp{}, nil
}

// checkPwdLevel 检查密码强度
func (s *AuthzService) checkPwdLevel(pwd string) error {
	if len(pwd) < 8 || len(pwd) > 20 {
		return code.InvalidParameterLoginPwdNotMeetRequirements
	}

	var count uint
	for _, regexp := range authzConstant.PasswordCharRegexpSet {
		if regexp.MatchString(pwd) {
			count++
		}
	}
	if count < 3 {
		return code.InvalidParameterLoginPwdNotMeetRequirements
	}
	return nil
}

// Logout 退出登录
func (s *AuthzService) Logout(ctx context.Context, req *pb.LogoutReq) (*pb.LogoutResp, error) {
	// 退出登录
	tokenKey := s.tokenRedisKey(req.Token)
	session, err := s.rdb.Get(ctx, tokenKey).Result()

	if errors.Is(err, redis.Nil) {
		return &pb.LogoutResp{}, nil
	} else if err != nil {
		return nil, err
	}

	antiKey := s.antiTokenRedisKey(req.UserID)
	sha1, err := s.rdb.ScriptLoad(context.Background(), smsModel.LogoutRedisScript).Result()
	if err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorRDB, err)
	}
	if err := s.rdb.EvalSha(context.Background(), sha1, []string{tokenKey, antiKey}).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorRDB, err)
	}

	// 发送退出登录事件
	s.sendLogoutEvent(&mq.LogoutEvent{
		UserID:     req.UserID,
		LogoutTime: uint64(time.Now().Unix()),
	})

	return &smsModel.LogoutRsp{}, nil
}

// Authorize 权限验证
func (s *AuthzService) Authorize(req *authn.AuthnReq) (*authn.AuthnResp, error) {
	// 获取Session
	rsp, err := s.GetSession(&smsModel.GetSessionReq{Token: req.Token})
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
			return nil, common.NewError(common.CodeForbidden)
		}
	}

	return &smsModel.AuthorizeRsp{
		Session: rsp.Session,
	}, nil
}

// GetSession 获取Session
func (s *AuthzService) GetSession(req *smsModel.GetSessionReq) (*smsModel.GetSessionRsp, common.Error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, common.WrapError(code.UnauthorizedInvalidToken, err)
	}

	// 判断Token是否过期
	key := s.tokenRedisKey(req.Token)
	sessionBytes, err := s.rdb.Get(context.Background(), key).Bytes()
	if errors.Is(err, redis.Nil) {
		return nil, common.NewError(code.UnauthorizedInvalidToken)
	}
	if err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorRDB, err)
	}

	// 解析Session
	var session authnz.Session
	_ = json.Unmarshal(sessionBytes, &session)

	// 延长Token的过期时间
	if err := s.rdb.Expire(context.Background(), key, smsModel.TokenExp).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorRDB, err)
	}

	// 延长AntiToken过期时间
	antiKey := s.antiTokenRedisKey(session.UserID)
	if err := s.rdb.Expire(context.Background(), antiKey, smsModel.TokenExp).Err(); err != nil {
		s.logger.WithField("err", err).Error("rdb exception")
		return nil, common.WrapError(common.ErrCodeInternalErrorRDB, err)
	}

	return &smsModel.GetSessionRsp{
		Session: &session,
	}, nil
}

// smVerCodeRedisKeyForLogin 登录短信验证码 Redis Key
func (s *AuthzService) smVerCodeRedisKeyForLogin(phone string, terminal constant.Terminal) string {
	return fmt.Sprintf("authnz:sm-ver-code:%s:%d", phone, terminal)
}

// tokenRedisKey Token Redis Key
func (s *AuthzService) tokenRedisKey(token string) string {
	return fmt.Sprintf("authnz:token:%s", token)
}

// antiTokenRedisKey 反向Token Redis Key
func (s *AuthzService) antiTokenRedisKey(userID uint64, terminal constant.Terminal) string {
	return fmt.Sprintf("authnz:token:anti:%d:%d", userID, terminal)
}

// sendLoginEvent 发送登录事件
func (s *AuthzService) sendLoginEvent(loginEvent *mq.LoginEvent) {
	body, _ := json.Marshal(loginEvent)
	message := primitive.NewMessage(s.config.RocketMQ.Topic, body).WithTag(string(mq.TagLoginEvent))
	s.sendEventMessage(message)
}

// sendLogoutEvent 发送退出登录事件
func (s *AuthzService) sendLogoutEvent(logoutEvent *mq.LogoutEvent) {
	body, _ := json.Marshal(logoutEvent)
	message := primitive.NewMessage(s.config.RocketMQ.Topic, body).WithTag(string(mq.TagLogoutEvent))
	s.sendEventMessage(message)
}

// sendEventMessage 发送事件消息
func (s *AuthzService) sendEventMessage(message *primitive.Message) {
	resCB := func(ctx context.Context, result *primitive.SendResult, err error) {
		s.logger.WithField("res", result).Info("send im success")
	}
	if err := s.loginEventProducer.SendAsync(context.Background(), resCB, message); err != nil {
		s.logger.WithField("err", err).Error("consumer im exception")
	}
}
