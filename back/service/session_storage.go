package service

import (
	"context"
	"fmt"
	"github.com/XiaoHuaShiFu/him/back/db"
	"github.com/XiaoHuaShiFu/him/back/him"
	"github.com/XiaoHuaShiFu/him/back/wire/pkt"
	"github.com/go-redis/redis/v8"
	"google.golang.org/protobuf/proto"
	"time"
)

const (
	LocationExpired = time.Hour * 48
)

type RedisStorage struct {
	rdb *redis.Client
}

func NewRedisStorage() him.SessionStorage {
	return &RedisStorage{
		rdb: db.NewRDB(),
	}
}

// Add 添加一个session
func (s *RedisStorage) Add(session *pkt.Session) error {
	// location为了快速的找到用户的channelID
	locKey := KeyLocation(session.UserId, session.Terminal)
	location, _ := proto.Marshal(&pkt.Location{
		ChannelId: session.ChannelId,
	})
	err := s.rdb.Set(context.Background(), locKey, location, LocationExpired).Err()
	if err != nil {
		return err
	}

	// session表示一个service层会话
	snKey := KeySession(session.ChannelId)
	buf, _ := proto.Marshal(session)
	err = s.rdb.Set(context.Background(), snKey, buf, LocationExpired).Err()
	if err != nil {
		return err
	}
	return nil
}

//Delete 删除一个session
func (s *RedisStorage) Delete(channelId string) error {
	session, err := s.Get(channelId)
	if err != nil {
		return err
	}

	locKey := KeyLocation(session.GetUserId(), session.GetTerminal())
	if err := s.rdb.Del(context.Background(), locKey).Err(); err != nil {
		return err
	}

	snKey := KeySession(channelId)
	if err = s.rdb.Del(context.Background(), snKey).Err(); err != nil {
		return err
	}
	return nil
}

// Get 通过channelId获取session
func (s *RedisStorage) Get(channelId string) (*pkt.Session, error) {
	snKey := KeySession(channelId)
	bts, err := s.rdb.Get(context.Background(), snKey).Bytes()
	if err != nil {
		if err == redis.Nil {
			return nil, him.ErrSessionNil
		}
		return nil, err
	}
	var session pkt.Session
	_ = proto.Unmarshal(bts, &session)
	return &session, nil
}

// GetLocations 获取locations，用于群发信息
func (s *RedisStorage) GetLocations(userIds ...int64) ([]*pkt.Location, error) {
	keys := KeyLocations(userIds...)
	list, err := s.rdb.MGet(context.Background(), keys...).Result()
	if err != nil {
		return nil, err
	}
	var result = make([]*pkt.Location, 0)
	for _, l := range list {
		if l == nil {
			continue
		}
		var location pkt.Location
		_ = proto.Unmarshal(l.([]byte), &location)
		result = append(result, &location)
	}
	if len(result) == 0 {
		return nil, him.ErrSessionNil
	}
	return result, nil
}

func (s *RedisStorage) GetLocation(userID int64, terminal string) (*pkt.Location, error) {
	key := KeyLocation(userID, terminal)
	bytes, err := s.rdb.Get(context.Background(), key).Bytes()
	if err != nil {
		if err == redis.Nil {
			return nil, him.ErrSessionNil
		}
		return nil, err
	}
	var location pkt.Location
	_ = proto.Unmarshal(bytes, &location)
	return &location, nil
}

func KeySession(channel string) string {
	return fmt.Sprintf("login:sn:%s", channel)
}

func KeyLocation(userID int64, terminal string) string {
	return fmt.Sprintf("login:loc:%d:%s", userID, terminal)
}

func KeyLocations(userIDS ...int64) []string {
	arr := make([]string, len(userIDS))
	for i, userID := range userIDS {
		arr[i] = KeyLocation(userID, "")
	}
	return arr
}
