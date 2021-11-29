package gateway

import (
	"encoding/json"
	"github.com/sirupsen/logrus"
	httpHeaderKey "him/common/constant/http/header/key"
	httpHeaderValue "him/common/constant/http/header/value"
	"him/service/common"
	"net/http"
)

// 连接升级错误处理器
func newWSUpgradeErrorHandler(logger *logrus.Logger) func(w http.ResponseWriter, r *http.Request, status int,
	reason error) {
	return func(w http.ResponseWriter, r *http.Request, status int, err error) {
		logger.WithField("err", err).Warn("can not upgrade connection")
		rsp := common.FailureRsp(WebsocketUpgradeException)
		rspBytes, _ := json.Marshal(rsp)
		w.WriteHeader(http.StatusOK)
		w.Header().Set(httpHeaderKey.ContentType, httpHeaderValue.ApplicationTypeCharsetUTF8)
		if _, err := w.Write(rspBytes); err != nil {
			logger.WithField("err", err).Warn("write to response exception")
		}
	}
}
