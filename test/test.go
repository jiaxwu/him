package main

import (
	"fmt"
	"github.com/shopspring/decimal"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
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

	//engine := gin.Default()
	//engine.Use(cors.Default())
	//engine.POST("test", func(c *gin.Context) {
	//	file, err := c.FormFile("test")
	//	if err != nil {
	//		fmt.Println(err)
	//		return
	//	}
	//	open, err := file.Open()
	//	if err != nil {
	//		fmt.Println(err)
	//		return
	//	}
	//	defer open.Close()
	//	file1, err := io.ReadAll(open)
	//	if err != nil {
	//		fmt.Println(err)
	//		return
	//	}
	//	buffer := bytes.NewBuffer(file1)
	//	config, fileType, err := image.DecodeConfig(buffer)
	//	if err != nil {
	//		fmt.Println("err1 = ", err)
	//		return
	//	}
	//	c.JSON(http.StatusOK, gin.H{
	//		"Size": len(file1),
	//		"Width": config.Width,
	//		"Height": config.Height,
	//		"Type": fileType,
	//	})
	//})
	//engine.Run()


	//engine := gin.Default()
	//engine.Use(cors.Default())
	//engine.POST("test", func(c *gin.Context) {
	//	var image content.Image
	//	c.ShouldBind(&image)
	//	fmt.Println(image)
	//	return
	//})
	//engine.Run()

	//cli, err := clientv3.New(clientv3.Config{
	//	Endpoints:   []string{"49.233.30.197:2379"},
	//	DialTimeout: 5 * time.Second,
	//})
	//if err != nil {
	//	// handle error!
	//}
	//defer cli.Close()
	//queue := recipe.NewPriorityQueue(cli, "test")
	//queue.Enqueue("lalaliskey", 16)
	//queue.Enqueue("323232", 1)
	//dequeue, err := queue.Dequeue()
	//fmt.Println(err)
	//fmt.Println(dequeue)

	n1, _ := decimal.NewFromString("10")
	n2, _ := decimal.NewFromString("100")
	n3 := n1.Mul(n2)
	fmt.Println(n3.IntPart())
}

//
type xxxReq struct {
	Type string
	Content string
}

type aTypeContent struct{

}

type bTypeContent struct{
	xxxx map[string]interface{}
}