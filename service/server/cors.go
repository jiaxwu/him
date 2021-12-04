package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	httpHeaderKey "him/common/constant/http/header/key"
	"net/http"
)

// Cors 跨域配置
func Cors() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{http.MethodPost, http.MethodGet, http.MethodOptions},
		AllowHeaders:     []string{httpHeaderKey.Token, httpHeaderKey.ContentType},
		ExposeHeaders:    []string{httpHeaderKey.ContentType, httpHeaderKey.ContentLength},
		AllowCredentials: true,
	})
}
