package conf

import (
	"github.com/tencentyun/cos-go-sdk-v5"
	"him/conf"
	"him/service/service/user/profile/constant"
	"net/http"
	"net/url"
)

// NewUserAvatarBucketOSSClient 创建用户头像bucket客户端
func NewUserAvatarBucketOSSClient(config *conf.Config) *cos.Client {
	bucketURL, _ := url.Parse(constant.UserAvatarBucketURL)
	baseURL := &cos.BaseURL{BucketURL: bucketURL}
	return cos.NewClient(baseURL, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  config.COS.SecretID,
			SecretKey: config.COS.SecretKey,
		},
	})
}
