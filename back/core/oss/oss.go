package oss

import (
	"bytes"
	"context"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/sirupsen/logrus"
	"him/conf"
)

type OSS struct {
	oss    *minio.Client
	config *conf.Config
}

func NewOSS(logger *logrus.Logger, config *conf.Config) *OSS {
	var oss OSS
	minioClient, err := minio.New(config.OSS.Endpoint, &minio.Options{
		Creds: credentials.NewStaticV4(config.OSS.AccessKeyID, config.OSS.SecretAccessKey, ""),
	})
	if err != nil {
		logger.Fatal("初始化OSS失败", err)
	}
	oss.oss = minioClient
	oss.config = config
	return &oss
}

// PutObjectOptions put操作的一些可选参数
type PutObjectOptions struct {
	// 内容类型，比如text/plan，image/gif，image/png等，详情看https://www.runoob.com/http/http-content-type.html
	ContentType string
}

// PutObject 上传对象
func (o *OSS) PutObject(objectName string, object []byte, options PutObjectOptions) error {
	if _, err := o.oss.PutObject(context.Background(), o.config.OSS.BucketName, objectName,
		bytes.NewReader(object), int64(len(object)),
		minio.PutObjectOptions{ContentType: options.ContentType}); err != nil {
		return err
	}
	return nil
}

// DelObject 删除对象
func (o *OSS) DelObject(objectName string) error {
	if err := o.oss.RemoveObject(context.Background(), o.config.OSS.BucketName, objectName,
		minio.RemoveObjectOptions{}); err != nil {
		return err
	}
	return nil
}
