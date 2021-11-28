package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
	tcCommon "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/errors"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/profile"
	sms "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/sms/v20210111"
	"github.com/xiaohuashifu/him/conf"
	"github.com/xiaohuashifu/him/service/common"
	"github.com/xiaohuashifu/him/service/sm/code"
	"github.com/xiaohuashifu/him/service/sm/model"
	"strconv"
)

type SmService struct {
	config    *conf.Config
	logger    *logrus.Logger
	validate  *validator.Validate
	smsClient *sms.Client
}

func NewSmService(config *conf.Config, logger *logrus.Logger, validate *validator.Validate) *SmService {
	smsService := &SmService{
		config:   config,
		logger:   logger,
		validate: validate,
	}
	credential := tcCommon.NewCredential(
		config.SMS.SecretID,
		config.SMS.SecretKey,
	)
	cpf := profile.NewClientProfile()
	cpf.HttpProfile.Endpoint = model.SendSMSTencentCloudURL
	client, _ := sms.NewClient(credential, smsService.config.SMS.Region, cpf)
	smsService.smsClient = client
	return smsService
}

// SendAuthCodeForLogin 发送登录验证码
// todo 限频
func (s *SmService) SendAuthCodeForLogin(req *model.SendAuthCodeForLoginReq) (
	*model.SendAuthCodeForLoginRsp, common.Error) {
	if err := s.validate.Struct(req); err != nil {
		return nil, common.WrapError(common.CodeInvalidParameter, err)
	}

	if _, err := s.SendSMS(&model.SendSMSReq{
		Phone:      req.Phone,
		TemplateID: model.SendLoginSMSAuthCodeTencentCloudTemplateID,
		Params:     []string{req.AuthCode, strconv.Itoa(int(req.ExpMinute))},
	}); err != nil {
		return nil, err
	}

	return &model.SendAuthCodeForLoginRsp{}, nil
}

// SendSMS 发送短信
func (s *SmService) SendSMS(req *model.SendSMSReq) (*model.SendSMSRsp, common.Error) {
	// 构造请求
	request := sms.NewSendSmsRequest()
	request.PhoneNumberSet = tcCommon.StringPtrs([]string{req.Phone})
	request.SmsSdkAppId = tcCommon.StringPtr(s.config.SMS.SMSSDKAppID)
	request.SignName = tcCommon.StringPtr(s.config.SMS.SignName)
	request.TemplateId = tcCommon.StringPtr(req.TemplateID)
	request.TemplateParamSet = tcCommon.StringPtrs(req.Params)

	// 发送请求
	rsp, err := s.smsClient.SendSms(request)
	if _, ok := err.(*errors.TencentCloudSDKError); ok {
		s.logger.WithFields(logrus.Fields{
			"req": req,
			"err": err,
		}).Error("tencent cloud sdk error")
		return nil, common.WrapError(common.ErrCodeInternalErrorSDK, err)
	}
	if err != nil {
		s.logger.WithFields(logrus.Fields{
			"req": req,
			"err": err,
		}).Error("unknown exception catch")
		return nil, common.WrapError(common.CodeInternalError, err)
	}

	// 超过限频限制
	if *rsp.Response.SendStatusSet[0].Code ==
		string(model.TencentCloudStatusCodeLimitExceededPhoneNumberThirtySecondLimit) {
		return nil, common.WrapError(code.ThrottlingSMSCode, err)
	}

	// 结果处理
	if *rsp.Response.SendStatusSet[0].Code != string(model.TencentCloudStatusCodeOK) {
		s.logger.WithFields(logrus.Fields{
			"req": req,
			"rsp": rsp,
		}).Error("received a code that is not 'Ok'")
		return nil, common.WrapError(code.InternalErrorThirdPartyTencentCloud, err)
	}
	return &model.SendSMSRsp{}, nil
}
