package jsons

import "encoding/json"

// MarshalToString 转json字符串
func MarshalToString(v any) string {
	bytes, _ := json.Marshal(v)
	return string(bytes)
}

// MarshalToBytes 转json字节slice
func MarshalToBytes(v any) []byte {
	bytes, _ := json.Marshal(v)
	return bytes
}

// UnmarshalString string转某种类型
func UnmarshalString[T any](s string) T {
	var t T
	_ = json.Unmarshal([]byte(s), &t)
	return t
}
