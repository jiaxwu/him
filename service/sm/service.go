package sm

import (
	"github.com/jiaxwu/him/common"
	"github.com/jiaxwu/him/common/jsons"
	"github.com/jiaxwu/him/config"
	"github.com/jiaxwu/him/config/log"
	tcCommon "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/errors"
	sms "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/sms/v20210111"
)

type Service struct {
	config    *config.Config
	smsClient *sms.Client
}

func NewService(config *config.Config, smsClient *sms.Client) *Service {
	smService := &Service{
		config:    config,
		smsClient: smsClient,
	}
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
		log.WithError(err).WithField("req", jsons.MarshalToString(req)).Error("tencent cloud sdk error")
		return nil, err
	}
	if err != nil {
		log.WithError(err).WithField("req", jsons.MarshalToString(req)).Error("unknown exception catch")
		return nil, err
	}

	// 超过限频限制
	if *rsp.Response.SendStatusSet[0].Code == string(TencentCloudStatusCodeLimitExceededPhoneNumberThirtySecondLimit) ||
		*rsp.Response.SendStatusSet[0].Code == string(TencentCloudStatusCodeLimitExceededPhoneNumberOneHourLimit) {
		return nil, ErrCodeThrottlingSm
	}

	// 结果处理
	if *rsp.Response.SendStatusSet[0].Code != string(TencentCloudStatusCodeOK) {
		log.WithFields(log.Fields{
			"req": jsons.MarshalToString(req),
			"rsp": jsons.MarshalToString(rsp),
		}).Error("received a code that is not 'Ok'")
		return nil, common.ErrCodeInternalError
	}
	return &SendSmRsp{}, nil
}
