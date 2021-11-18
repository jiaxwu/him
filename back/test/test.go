package main

import (
	"fmt"
)

func main() {
	//db, err := gorm.Open(mysql.Open("root:root@tcp(127.0.0.1:3306)/lolmclient?parseTime=True"))
	//if err != nil {
	//	log.Fatal("打开数据库失败", err)
	//}
	//
	//var avatars []string
	//if err := db.Table("user_profile").Select("avatar").Find(&avatars).Error; err != nil {
	//	log.Fatal(err)
	//}
	//fmt.Printf("%+v\n", avatars)
	//avatarHostLength := len(constant.UserAvatarBucketURL)
	//for _, avatar := range avatars {
	//	fmt.Println(avatar[avatarHostLength:])
	//}
	//parse, err := time.Parse("2006-01-02T15:04:05.000Z", "2020-12-10T03:37:30.000Z")
	//fmt.Println(err)
	//fmt.Println(parse.Unix())
	//fmt.Println(time.Now().Add(-constant.UserAvatarClearTaskAvatarExpireTime).Unix())
	fmt.Println(Get32Byte("吴嘉贤吴嘉贤吴嘉贤吴吴嘉贤吴嘉贤嘉贤"))
}

func Get32Byte(data string) []byte {
	bytes32 := make([]byte, 32)
	dataBytes := []byte(data)
	for i := 0; i < 32 && i < len(dataBytes); i++ {
		bytes32[i] = dataBytes[i]
	}
	return bytes32
}