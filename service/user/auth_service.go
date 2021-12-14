package user

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/go-redis/redis/v8"
	"github.com/jiaxwu/him/common"
	"github.com/jiaxwu/him/conf/log"
	"github.com/jiaxwu/him/service/sm"
	"github.com/jiaxwu/him/service/user/model"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"regexp"
	"strconv"
	"strings"
	"time"
)

// Login 登录
func (s *Service) Login(req *LoginReq) (rsp *LoginRsp, err error) {
	// 检查终端是否正确
	if !TerminalSet[req.Terminal] {
		return nil, common.ErrCodeInvalidParameter
	}

	// 短信验证码登录
	if req.SmVerCodeLogin != nil {
		return s.loginBySmVerCode(req.Terminal, req.SmVerCodeLogin)
	} else
	// 密码登录
	if req.PasswordLogin != nil {
		return s.loginByPassword(req.Terminal, req.PasswordLogin)
	}

	return nil, common.ErrCodeInvalidParameter
}

// 短信验证码登录
func (s *Service) loginBySmVerCode(terminal Terminal, req *SmVerCodeLogin) (*LoginRsp, error) {
	// 验证手机号码和验证码格式
	if err := s.checkPhone(req.Phone); err != nil {
		return nil, err
	}
	if err := s.checkSmVerCode(req.SmVerCode); err != nil {
		return nil, err
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
		return err
	}
	if smVerByRedis != smVerCode {
		return ErrCodeInvalidParameterSmVerCodeError
	}

	// 验证成功要把验证码删了
	if err := s.rdb.Del(context.Background(), smVerCodeKey).Err(); err != nil {
		log.WithError(err).Error("delete smVerCode error")
	}
	return nil
}

// loginByPhone 通过手机登录
func (s *Service) loginByPhone(terminal Terminal, phone string) (*LoginRsp, error) {
	// 验证手机号码格式
	if err := s.checkPhone(phone); err != nil {
		return nil, err
	}

	// 获取用户编号
	user := new(model.User)
	err := s.db.Where("phone = ?", user.Phone).Take(&user).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	// 如果用户还没有使用手机注册，则进行注册
	if errors.Is(err, gorm.ErrRecordNotFound) {
		if user, err = s.register(phone); err != nil {
			return nil, err
		}
	}

	return s.login(terminal, user)
}

// 密码登录
func (s *Service) loginByPassword(terminal Terminal, req *PasswordLogin) (*LoginRsp, error) {
	// 账号密码不能为空
	if len(req.Account) == 0 || len(req.Password) == 0 {
		return nil, common.ErrCodeInvalidParameter
	}

	// 获取对应的用户
	var user model.User
	err := s.db.Where("username = ? or phone = ? or email = ?",
		req.Account, req.Account, req.Account).Take(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrCodeInvalidParameterAccountNotExist
	}
	if err != nil {
		return nil, err
	}

	// 判断密码是否正确
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, ErrCodeInvalidParameterPasswordError
	}

	return s.login(terminal, &user)
}

// login 登录
func (s *Service) login(terminal Terminal, user *model.User) (*LoginRsp, error) {
	// 检查该用户在该终端是否已经登录了
	antiKey := s.antiTokenRedisKey(user.ID, terminal)
	oldToken, err := s.rdb.Get(context.Background(), antiKey).Result()
	if err != nil && !errors.Is(err, redis.Nil) {
		return nil, err
	}
	// 如果已经存在，把原来的token过期了
	if err == nil {
		// 删除token和反向token
		tokenKey := s.tokenRedisKey(oldToken)
		if err := s.rdb.Del(context.Background(), tokenKey, antiKey).Err(); err != nil {
			return nil, err
		}
	}

	// 生成Token并添加到Redis
	token := gofakeit.UUID()
	tokenKey := s.tokenRedisKey(token)
	session := &Session{
		UserID:   user.ID,
		UserType: UserType(user.Type),
		Terminal: terminal,
	}
	sessionBytes, _ := json.Marshal(session)
	// 先插入反向Token
	if err := s.rdb.Set(context.Background(), antiKey, token, TokenExp).Err(); err != nil {
		return nil, err
	}
	// 再插入正向token
	if err := s.rdb.Set(context.Background(), tokenKey, sessionBytes, TokenExp).Err(); err != nil {
		return nil, err
	}

	getUserRsp, err := s.GetUserInfos(&GetUserInfosReq{UserID: user.ID})
	if err != nil {
		return nil, err
	}
	return &LoginRsp{
		Token:    token,
		UserInfo: getUserRsp.UserInfos[0],
	}, nil
}

// SendSmVerCode 发送短信验证码
func (s *Service) SendSmVerCode(req *SendSmVerCodeReq) (*SendSmVerCodeRsp, error) {
	// 验证行为
	if SmVerCodeActionToTemplateIDMap[req.Action] == "" {
		return nil, common.ErrCodeInvalidParameter
	}
	if err := s.checkPhone(req.Phone); err != nil {
		return nil, err
	}

	// 把验证码加到缓存
	smVerCode := gofakeit.DigitN(SmVerCodeLen)
	key := s.smVerCodeRedisKey(req.Phone, req.Action)
	expireTime := SmVerCodeExpMinute * time.Minute
	if err := s.rdb.Set(context.Background(), key, smVerCode, expireTime).Err(); err != nil {
		return nil, err
	}

	// 发送验证码
	smVerCodeTemplateID := SmVerCodeActionToTemplateIDMap[req.Action]
	params := []string{smVerCode, strconv.Itoa(SmVerCodeExpMinute)}[:SmVerCodeTemplateParamsCount[smVerCodeTemplateID]]
	if _, err := s.smService.SendSm(&sm.SendSmReq{
		Phone:      req.Phone,
		TemplateID: smVerCodeTemplateID,
		Params:     params,
	}); err != nil {
		return nil, err
	}

	return &SendSmVerCodeRsp{}, nil
}

// 注册账号
// todo phone要加锁
func (s *Service) register(phone string) (*model.User, error) {
	user := model.User{
		Type:         string(UserTypeUser),
		Username:     s.genUsername(),
		NickName:     s.genNickName(),
		Phone:        phone,
		RegisteredAt: uint64(time.Now().Unix()),
	}
	// 创建用户
	if err := s.db.Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// ChangePassword 修改密码
func (s *Service) ChangePassword(req *ChangePasswordReq) (*ChangePasswordRsp, error) {
	// 检查手机号码
	if err := s.checkPhone(req.Phone); err != nil {
		return nil, err
	}
	// 检查密码强度
	if err := s.checkPasswordLevel(req.Password); err != nil {
		return nil, err
	}
	// 检查验证码
	if err := s.validSmVerCode(req.SmVerCode, req.Phone, SmVerCodeActionChangePassword); err != nil {
		return nil, err
	}

	// 根据手机号获取用户编号
	var user model.User
	err := s.db.Where("phone = ?", req.Phone).Take(&user).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	// 如果手机号码还没注册
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrCodeInvalidParameterPhoneNotRegister
	}

	// 设置新密码
	passwordBytes, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		log.WithError(err).Error("bcrypt GenerateFromPassword exception")
		return nil, err
	}

	// 否则更新密码
	if err := s.db.Model(model.User{}).Where("id = ?", user.ID).
		Update("password", string(passwordBytes)).Error; err != nil {
		return nil, err
	}
	return &ChangePasswordRsp{}, nil
}

// Logout 退出登录
func (s *Service) Logout(req *LogoutReq) (*LogoutRsp, error) {
	// 退出登录
	tokenKey := s.tokenRedisKey(req.Token)
	antiKey := s.antiTokenRedisKey(req.UserID, req.Terminal)
	sha1, err := s.rdb.ScriptLoad(context.Background(), LogoutRedisScript).Result()
	if err != nil {
		return nil, err
	}
	if err := s.rdb.EvalSha(context.Background(), sha1, []string{tokenKey, antiKey}).Err(); err != nil {
		return nil, err
	}

	return &LogoutRsp{}, nil
}

// Authorize 权限验证
func (s *Service) Authorize(req *AuthorizeReq) (*AuthorizeRsp, error) {
	// 获取Session
	getSessionRsp, err := s.GetSession(&GetSessionReq{Token: req.Token})
	if err != nil {
		return nil, err
	}

	// 判断是否有需要的角色
	if len(req.UserTypes) != 0 {
		hasRole := false
		for _, userType := range req.UserTypes {
			if getSessionRsp.Session.UserType == userType {
				hasRole = true
				break
			}
		}
		if !hasRole {
			return nil, common.ErrCodeForbidden
		}
	}

	return &AuthorizeRsp{
		Session: getSessionRsp.Session,
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
		return nil, err
	}

	// 解析Session
	var session Session
	_ = json.Unmarshal(sessionBytes, &session)

	// 延长Token的过期时间
	if err := s.rdb.Expire(context.Background(), key, TokenExp).Err(); err != nil {
		return nil, err
	}

	// 延长AntiToken过期时间
	antiKey := s.antiTokenRedisKey(session.UserID, session.Terminal)
	if err := s.rdb.Expire(context.Background(), antiKey, TokenExp).Err(); err != nil {
		return nil, err
	}

	return &GetSessionRsp{
		Session: &session,
	}, nil
}

// 登录短信验证码 Redis Key
func (s *Service) smVerCodeRedisKey(phone string, action SmVerCodeAction) string {
	return fmt.Sprintf("auth:sm-ver-code:%s:%s", phone, action)
}

// Token Redis Key
func (s *Service) tokenRedisKey(token string) string {
	return fmt.Sprintf("auth:token:%s", token)
}

// 反向Token Redis Key
func (s *Service) antiTokenRedisKey(userID uint64, terminal Terminal) string {
	return fmt.Sprintf("auth:token:anti:%d:%s", userID, terminal)
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

// 检查手机号码
func (s *Service) checkPhone(phone string) error {
	return s.validate.Var(phone, "required,phone")
}

// 检查验证码
func (s *Service) checkSmVerCode(smVerCode string) error {
	return s.validate.Var(smVerCode, "required,len=6,numeric")
}

// 产生用户名
func (s *Service) genUsername() string {
	return fmt.Sprintf("him_%s", strings.ToLower(gofakeit.LetterN(20)))
}

// 产生昵称
func (s *Service) genNickName() string {
	return fmt.Sprintf("him_%d", time.Now().Unix())
}
