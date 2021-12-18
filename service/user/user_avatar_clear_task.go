package user

import (
	"context"
	"github.com/bits-and-blooms/bloom/v3"
	"github.com/jiaxwu/him/common/jsons"
	"github.com/jiaxwu/him/config/log"
	"github.com/jiaxwu/him/service/user/model"
	"github.com/robfig/cron/v3"
	"github.com/tencentyun/cos-go-sdk-v5"
	"gorm.io/gorm"
	"time"
)

// UserAvatarClearTask 用于定时清除无效头像
type UserAvatarClearTask struct {
	userAvatarBucketOSSClient *cos.Client
	db                        *gorm.DB
}

func NewUserAvatarClearTask(userAvatarBucketOSSClient *cos.Client, db *gorm.DB) *UserAvatarClearTask {
	userAvatarClearTask := UserAvatarClearTask{
		userAvatarBucketOSSClient: userAvatarBucketOSSClient,
		db:                        db,
	}
	userAvatarClearTask.start()
	return &userAvatarClearTask
}

// 开始清理
func (t *UserAvatarClearTask) start() {
	c := cron.New()
	_, _ = c.AddFunc(UserAvatarClearTaskCron, t.clear)
	go c.Start()
}

// 清除任务
func (t *UserAvatarClearTask) clear() {
	filter, err := t.getBloom()
	if err != nil {
		log.WithError(err).Error("get bloom exception")
		return
	}
	var marker string
	for {
		result, _, err := t.userAvatarBucketOSSClient.Bucket.Get(context.Background(), &cos.BucketGetOptions{
			EncodingType: "url",
			Marker:       marker,
			MaxKeys:      1000,
		})
		if err != nil {
			log.WithError(err).Error("get objects from cos exception")
			return
		}
		if len(result.Contents) == 0 {
			break
		}
		t.clearUnLinkAvatar(result.Contents, filter)
		marker = result.NextMarker
		if marker == "" {
			break
		}
	}
}

// 获取布隆过滤器
func (t *UserAvatarClearTask) getBloom() (*bloom.BloomFilter, error) {
	filter := bloom.NewWithEstimates(UserAvatarClearTaskBloomLength, UserAvatarClearTaskBloomFP)
	var avatars []string
	if err := t.db.Model(&model.User{}).Select("avatar").Find(&avatars).Error; err != nil {
		return nil, err
	}
	avatarHostLength := len(UserAvatarBucketURL)
	for _, avatar := range avatars {
		filter.AddString(avatar[avatarHostLength:])
	}
	return filter, nil
}

// 清除未被链接的头像
func (t *UserAvatarClearTask) clearUnLinkAvatar(avatars []cos.Object, filter *bloom.BloomFilter) {
	// 头像修改时间在这个时间之前就被视为过期
	expireTime := time.Now().Add(-UserAvatarClearTaskAvatarExpireTime).Unix()
	var needDeletedAvatars []cos.Object
	for _, avatar := range avatars {
		// 图片还在使用直接跳过
		if filter.TestString(avatar.Key) {
			continue
		}
		// 否则判断是否过期
		createTime, _ := time.Parse("2006-01-02T15:04:05.000Z", avatar.LastModified)
		// 过期则删除
		if createTime.Unix() < expireTime {
			needDeletedAvatars = append(needDeletedAvatars, cos.Object{Key: avatar.Key})
		}
	}

	// 如果没有需要删除的头像则跳过
	if len(needDeletedAvatars) == 0 {
		return
	}

	// 删除未被链接的头像
	failureDeleteAvatars, _, err := t.userAvatarBucketOSSClient.Object.DeleteMulti(
		context.Background(),
		&cos.ObjectDeleteMultiOptions{
			Quiet:   true,
			Objects: needDeletedAvatars,
		},
	)
	if err != nil {
		log.WithError(err).Error("delete unlink avatars exception")
		return
	}
	if len(failureDeleteAvatars.Errors) != 0 {
		log.WithField("errors", jsons.MarshalToString(failureDeleteAvatars.Errors)).
			Error("some avatars can not be delete")
	}
}
