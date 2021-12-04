package jsons

import "encoding/json"

// Marshal 转json字符串
func Marshal(v interface{}) string {
	bytes, _ := json.Marshal(v)
	return string(bytes)
}