package sm

import (
	"github.com/go-playground/validator/v10"
	"github.com/jiaxwu/him/common/jsons"
	"github.com/jiaxwu/him/conf"
	"github.com/jiaxwu/him/service/common"
	"github.com/sirupsen/logrus"
	tcCommon "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/errors"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/profile"
	sms "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/sms/v20210111"
)

type Service struct {
	config    *conf.Config
	logger    *logrus.Logger
	validate  *validator.Validate
	smsClient *sms.Client
}

func NewService(config *conf.Config, logger *logrus.Logger, validate *validator.Validate) *Service {
	smService := &Service{
		config:   config,
		logger:   logger,
		validate: validate,
	}
	credential := tcCommon.NewCredential(
		config.SMS.SecretID,
		config.SMS.SecretKey,
	)
	cpf := profile.NewClientProfile()
	cpf.HttpProfile.Endpoint = SendSmsTencentCloudURL
	client, _ := sms.NewClient(credential, smService.config.SMS.Region, cpf)
	smService.smsClient = client
	return smService
}

// SendSm 发送短信
func (s *Service) SendSm(req *SendSmReq) (*SendSmRsp, error) {
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
		s.logger.WithError(err).WithField("req", jsons.MarshalToString(req)).Error("tencent cloud sdk error")
		return nil, err
	}
	if err != nil {
		s.logger.WithError(err).WithField("req", jsons.MarshalToString(req)).Error("unknown exception catch")
		return nil, err
	}

	// 超过限频限制
	if *rsp.Response.SendStatusSet[0].Code ==
		string(TencentCloudStatusCodeLimitExceededPhoneNumberThirtySecondLimit) {
		return nil, ErrCodeThrottlingSm
	}

	// 结果处理
	if *rsp.Response.SendStatusSet[0].Code != string(TencentCloudStatusCodeOK) {
		s.logger.WithFields(logrus.Fields{
			"req": jsons.MarshalToString(req),
			"rsp": jsons.MarshalToString(rsp),
		}).Error("received a code that is not 'Ok'")
		return nil, common.ErrCodeInternalError
	}
	return &SendSmRsp{}, nil
}
