package sm

type SendSmReq struct {
	Phone      string   // 手机
	TemplateID string   // 模板ID
	Params     []string // 参数
}

type SendSmRsp struct{}
