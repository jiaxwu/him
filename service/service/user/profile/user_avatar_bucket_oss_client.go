package profile

import (
	"github.com/tencentyun/cos-go-sdk-v5"
	"him/conf"
	"net/http"
	"net/url"
)

// NewUserAvatarBucketOSSClient 创建用户头像bucket客户端
func NewUserAvatarBucketOSSClient(config *conf.Config) *cos.Client {
	bucketURL, _ := url.Parse(UserAvatarBucketURL)
	baseURL := &cos.BaseURL{BucketURL: bucketURL}
	return cos.NewClient(baseURL, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  config.COS.SecretID,
			SecretKey: config.COS.SecretKey,
		},
	})
}
