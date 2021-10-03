package http

import (
	"fmt"
	"github.com/XiaoHuaShiFu/him/back/service"
	"github.com/gin-gonic/gin"
)

type Router struct {
	userService *service.UserService
}

func NewRouter(userService *service.UserService) *Router {
	return &Router{userService: userService}
}

func (r *Router) Login(c *gin.Context) {
	username := c.Query("username")
	terminal := c.Query("terminal")
	token, err := r.userService.Login(username, "", terminal)
	fmt.Println(err)
	c.JSON(200, gin.H{
		"token": token,
	})
}
