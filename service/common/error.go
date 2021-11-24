package common

import (
	"errors"
)

// Unwrap 获取内部异常
type Unwrap interface {
	Unwrap() error
}

// Error 错误
type Error interface {
	error
	Unwrap
	ErrCode
}

// errorImpl 错误
type errorImpl struct {
	error
	ErrCode
}

// Unwrap 实现 Unwrap 接口
func (e *errorImpl) Unwrap() error {
	return e.error
}

// WrapError 包装 error
func WrapError(errCode ErrCode, err error) Error {
	return &errorImpl{
		error:   err,
		ErrCode: errCode,
	}
}

// NewError 新建一个 Error
func NewError(errCode ErrCode) Error {
	return &errorImpl{
		error:   errors.New(errCode.Msg()),
		ErrCode: errCode,
	}
}
