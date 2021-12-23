package mysql

import (
	"github.com/go-sql-driver/mysql"
)

const (
	DuplicateEntryNumber = 1062
)

// ErrorIs 判断是否是对应错误
func ErrorIs(err error, number uint16) bool {
	mysqlError, ok := err.(*mysql.MySQLError)
	if !ok {
		return false
	}
	return mysqlError.Number == number
}
