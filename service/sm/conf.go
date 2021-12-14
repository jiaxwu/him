package sm

import (
	"github.com/jiaxwu/him/conf"
	tcCommon "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/profile"
	sms "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/sms/v20210111"
)

// NewTencentSMSClient 创建腾讯云短信服务客户端
func NewTencentSMSClient(config *conf.Config) *sms.Client {
	credential := tcCommon.NewCredential(
		config.SMS.SecretID,
		config.SMS.SecretKey,
	)
	cpf := profile.NewClientProfile()
	cpf.HttpProfile.Endpoint = SendSmsTencentCloudURL
	client, _ := sms.NewClient(credential, config.SMS.Region, cpf)
	return client
}