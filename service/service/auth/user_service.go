package auth

import (
	"errors"
	"gorm.io/gorm"
)

// GetUser 获取用户
func (s *Service) GetUser(req *GetUserReq) (*GetUserRsp, error) {
	var user User
	err := s.db.Take(&user, req.UserID).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		s.logger.WithError(err).Error("db exception")
		return nil, err
	}
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrCodeNotFoundUser
	}
	return &GetUserRsp{
		UserID:       user.ID,
		Type:         user.Type,
		RegisteredAt: user.RegisteredAt,
	}, nil
}
