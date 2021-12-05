package main

import (
	"fmt"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"log"
	"os"
)

func main() {
	file, err := os.Open("test/eb088f77c30b185be413952198ed07d.jpg")
	if err != nil {
		log.Fatal(err)
	}
	config, s2, err := image.Decode(file)
	fmt.Println(err)
	fmt.Println(config.Bounds().Dx())
	fmt.Println(config.Bounds().Dy())
	fmt.Println(s2)
}
