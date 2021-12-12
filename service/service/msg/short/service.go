package short

import (
	"context"
	"errors"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
	"github.com/tencentyun/cos-go-sdk-v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"gorm.io/gorm"
	"github.com/jiaxwu/him/service/common"
	"github.com/jiaxwu/him/service/service/msg"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"mime"
	"mime/multipart"
)

// Service 消息服务
type Service struct {
	db                        *gorm.DB
	rdb                       *redis.Client
	logger                    *logrus.Logger
	mongoOfflineMsgCollection *mongo.Collection
	msgBucketOSSClient        *cos.Client
}

func NewService(mongoOfflineMsgCollection *mongo.Collection, msgBucketOSSClient *cos.Client, db *gorm.DB,
	rdb *redis.Client, logger *logrus.Logger) *Service {
	return &Service{
		db:                        db,
		rdb:                       rdb,
		logger:                    logger,
		mongoOfflineMsgCollection: mongoOfflineMsgCollection,
		msgBucketOSSClient:        msgBucketOSSClient,
	}
}

// Upload 上传
func (s *Service) Upload(req *UploadReq) (rsp *UploadRsp, err error) {
	rsp = &UploadRsp{}
	var (
		contentType string
		content     *multipart.FileHeader
		objectName  = gofakeit.UUID()
	)

	// 图片
	if req.Image != nil {
		rsp.Image, contentType, err = s.checkImageInfo(req.Image)
		if err != nil {
			return nil, err
		}
		content = req.Image
		rsp.Image.URL = MsgBucketURL + objectName
	} else {
		return nil, common.ErrCodeInvalidParameter
	}

	// 上传
	contentFile, err := content.Open()
	if err != nil {
		s.logger.WithError(err).Error("can not open file")
		return nil, err
	}
	if _, err = s.msgBucketOSSClient.Object.Put(context.Background(), objectName, contentFile, &cos.ObjectPutOptions{
		ObjectPutHeaderOptions: &cos.ObjectPutHeaderOptions{
			ContentType: contentType,
		},
	}); err != nil {
		s.logger.WithError(err).Error("put object to cos exception")
		return nil, err
	}
	return rsp, nil
}

// 检查图片信息
func (s *Service) checkImageInfo(imageFile *multipart.FileHeader) (msgImage *msg.Image, contentType string, err error) {
	// 判断图片长度
	if imageFile.Size > MaxImageSize {
		return nil, "", ErrCodeInvalidParameterImageSize
	}

	file, err := imageFile.Open()
	if err != nil {
		return nil, "", err
	}
	config, imageFormat, err := image.Decode(file)
	if err != nil {
		return nil, "", err
	}
	return &msg.Image{
		URL:    "",
		Width:  config.Bounds().Dx(),
		Height: config.Bounds().Dy(),
		Format: imageFormat,
		Size:   imageFile.Size,
	}, mime.TypeByExtension("." + imageFormat), nil
}

// GetSeq 获取序列
func (s *Service) GetSeq(req *GetSeqReq) (*GetSeqRsp, error) {
	seqKey := msg.SeqKey(req.UserID)
	lastSeq, err := s.rdb.Get(context.Background(), seqKey).Uint64()
	if err != nil && !errors.Is(err, redis.Nil) {
		return nil, err
	}
	return &GetSeqRsp{LastSeq: lastSeq}, nil
}

// GetMsgs 获取消息
func (s *Service) GetMsgs(req *GetMsgsReq) (*GetMsgsRsp, error) {
	if len(req.SeqRanges) == 0 {
		return &GetMsgsRsp{Msgs: []*msg.Msg{}}, nil
	}

	// 参数转换
	seqRanges := make(bson.A, len(req.SeqRanges))
	for i, seqRange := range req.SeqRanges {
		seqRanges[i] = bson.D{{"Seq", bson.D{
			{"$gte", seqRange.StartSeq},
			{"$lte", seqRange.EndSeq},
		}}}
	}
	filter := bson.D{
		{"UserID", req.UserID},
		{"$or", seqRanges},
	}

	// 查询
	find, err := s.mongoOfflineMsgCollection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	msgs := make([]*msg.Msg, 0)
	if err := find.All(context.Background(), &msgs); err != nil {
		return nil, err
	}
	return &GetMsgsRsp{Msgs: msgs}, nil
}
