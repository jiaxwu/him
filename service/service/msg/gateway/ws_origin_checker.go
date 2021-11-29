package gateway

import "net/http"

// 来源检查器
func newWSOriginChecker() func(r *http.Request) bool {
	return func(r *http.Request) bool {
		return true
	}
}
