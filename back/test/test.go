package main

import (
	"bytes"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"net/http"
)

func main() {
	//imagePath := "./test/课表"
	//file, _ := os.Open(imagePath)
	//c, s, err := image.DecodeConfig(file)
	//if err != nil {
	//	fmt.Println("err1 = ", err)
	//	return
	//}
	//fmt.Printf("%+v\n", c)
	//fmt.Println(s)

	engine := gin.Default()
	engine.Use(cors.Default())
	engine.POST("test", func(c *gin.Context) {
		file, err := c.FormFile("test")
		if err != nil {
			fmt.Println(err)
			return
		}
		open, err := file.Open()
		if err != nil {
			fmt.Println(err)
			return
		}
		defer open.Close()
		file1, err := io.ReadAll(open)
		if err != nil {
			fmt.Println(err)
			return
		}
		buffer := bytes.NewBuffer(file1)
		config, fileType, err := image.DecodeConfig(buffer)
		if err != nil {
			fmt.Println("err1 = ", err)
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"Size": len(file1),
			"Width": config.Width,
			"Height": config.Height,
			"Type": fileType,
		})
	})
	engine.Run()
}

