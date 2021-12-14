package gateway

import (
	"encoding/json"
	"github.com/jiaxwu/him/common"
	httpHeaderKey "github.com/jiaxwu/him/common/constant/http/header/key"
	httpHeaderValue "github.com/jiaxwu/him/common/constant/http/header/value"
	"github.com/jiaxwu/him/conf/log"
	"net/http"
)

// 连接升级错误处理器
func newWSUpgradeErrorHandler() func(w http.ResponseWriter, r *http.Request, status int,
	reason error) {
	return func(w http.ResponseWriter, r *http.Request, status int, err error) {
		log.WithError(err).Warn("can not upgrade connection")
		rsp := common.FailureRsp(ErrCodeWebsocketUpgradeException)
		rspBytes, _ := json.Marshal(rsp)
		w.WriteHeader(http.StatusOK)
		w.Header().Set(httpHeaderKey.ContentType, httpHeaderValue.ApplicationTypeCharsetUTF8)
		if _, err := w.Write(rspBytes); err != nil {
			log.WithError(err).Warn("write to response exception")
		}
	}
}
