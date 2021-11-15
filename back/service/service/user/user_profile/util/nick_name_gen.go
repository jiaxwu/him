package util

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"os"
	"time"
)

// GenNickName 生成一个昵称
func GenNickName() string {
	rand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("%s的%s", adjectives[rand.Intn(len(adjectives))], nouns[rand.Intn(len(nouns))])
}

var adjectives = MustReadJSONFileToStringSlice(adjectivesFileName)
var nouns = MustReadJSONFileToStringSlice(nounsFileName)

const adjectivesFileName = "service/service/user/user_profile/util/adjectives.json"
const nounsFileName = "service/service/user/user_profile/util/nouns.json"

// MustReadJSONFileToStringSlice 从JSON文件中读取字符串数组
func MustReadJSONFileToStringSlice(filename string) []string {
	file, err := os.ReadFile(filename)
	if err != nil {
		panic(fmt.Errorf("Read file error %v\n", err))
	}
	var array []string
	if err := json.Unmarshal(file, &array); err != nil {
		panic(fmt.Errorf("Unmarshal file error %v\n", err))
	}
	return array
}
