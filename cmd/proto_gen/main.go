package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strings"
)

var protoFilePaths []string

func main() {
	processDir("api")
	gen("--go_out=paths=source_relative:.")
	gen("--go-grpc_out=paths=source_relative:.")
}

func gen(baseCmd string) {
	args := []string{baseCmd}
	args = append(args, protoFilePaths...)
	protocCommand := exec.Command("protoc", args...)
	protocCommand.Stdout = os.Stdout
	protocCommand.Stderr = os.Stderr
	if err := protocCommand.Run(); err != nil {
		log.Fatal("生成proto失败", err)
	}
}

func processDir(dir string) {
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		panic(err)
	}
	for _, file := range files {
		fileName := fmt.Sprintf("%s/%s", dir, file.Name())
		if file.IsDir() {
			processDir(fileName)
		} else if strings.HasSuffix(fileName, ".proto") {
			protoFilePaths = append(protoFilePaths, fileName)
		}
	}
}
