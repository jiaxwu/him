package common

import (
	"errors"
)

// Error 错误
type Error struct {
	error
	ErrCode
}

// Unwrap 实现 Unwrap 接口
func (e *Error) Unwrap() error {
	return e.error
}

// WrapError 包装 error
func WrapError(errCode ErrCode, err error) *Error {
	return &Error{
		error:   err,
		ErrCode: errCode,
	}
}

// NewError 新建一个 Error
func NewError(errCode ErrCode) *Error {
	return &Error{
		error:   errors.New(errCode.Msg),
		ErrCode: errCode,
	}
}
