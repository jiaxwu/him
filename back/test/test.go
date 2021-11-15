package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
	engine := gin.Default()
	engine.POST("test", func(c *gin.Context) {
		form, err := c.MultipartForm()
		fmt.Println(form.Value)
		fmt.Println(form.File["test"][0])
		fmt.Println(err)
	})
	engine.Run()
}
