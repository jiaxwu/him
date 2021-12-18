package user

import (
	"github.com/jiaxwu/him/config"
	"github.com/tencentyun/cos-go-sdk-v5"
	"net/http"
	"net/url"
)

// NewAvatarBucketOSSClient 创建用户头像bucket客户端
func NewAvatarBucketOSSClient(config *config.Config) *cos.Client {
	bucketURL, _ := url.Parse(UserAvatarBucketURL)
	baseURL := &cos.BaseURL{BucketURL: bucketURL}
	return cos.NewClient(baseURL, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  config.COS.SecretID,
			SecretKey: config.COS.SecretKey,
		},
	})
}
