package short

import (
	"github.com/jiaxwu/him/config"
	"github.com/tencentyun/cos-go-sdk-v5"
	"net/http"
	"net/url"
)

// NewMsgBucketOSSClient 创建消息bucket客户端
func NewMsgBucketOSSClient(config *config.Config) *cos.Client {
	bucketURL, _ := url.Parse(MsgBucketURL)
	baseURL := &cos.BaseURL{BucketURL: bucketURL}
	return cos.NewClient(baseURL, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  config.COS.SecretID,
			SecretKey: config.COS.SecretKey,
		},
	})
}
