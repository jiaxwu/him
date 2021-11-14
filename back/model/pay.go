package model

// Wallet 钱包
type Wallet struct {
	ID        uint64
	UserID    uint64 `gorm:"not null; unique"` // 用户编号
	Money     uint64 `gorm:"not null"`         // 钱，单位分
	CreatedAt uint64 `gorm:"not null; index"`
	UpdatedAt uint64 `gorm:"not null; index"`
}

// TradeStatus 订单状态
type TradeStatus string

const (
	TradeStatusWaitPay  TradeStatus = "WAIT_PAY" // 交易创建，等待买家付款
	TradeStatusClosed   TradeStatus = "CLOSED"   // 未付款交易超时关闭
	TradeStatusRefund   TradeStatus = "REFUND"   // 支付完成后全额退款
	TradeStatusSuccess  TradeStatus = "SUCCESS"  // 交易支付成功
	TradeStatusFinished TradeStatus = "FINISHED" // 交易结束，不可退款
)

// PaymentMethod 支付方式
type PaymentMethod string

const (
	PaymentMethodWeChat PaymentMethod = "WECHAT" // 微信支付
	PaymentMethodAlipay PaymentMethod = "ALIPAY" // 支付宝支付
)

// PaymentType 支付类型
type PaymentType string

const (
	PaymentTypeFaceToFacePayment PaymentType = "FACE_TO_FACE_PAYMENT" // 当面付
)

// CurrencyType 货币类型
type CurrencyType string

const (
	CurrencyTypeCNY CurrencyType = "CNY" // 人民币
)

// PayerType 支付者类型
type PayerType string

const (
	PayerTypePrivate   PayerType = "PRIVATE"   // 个人
	PayerTypeCorporate PayerType = "CORPORATE" // 企业
)

// Trade 订单
type Trade struct {
	ID             uint64
	UserID         uint64        `gorm:"not null; index"`                    // 用户编号
	PaymentMethod  PaymentMethod `gorm:"not null; size:10; index"`           // 支付方式
	TradeNumber    string        `gorm:"not null; type:varchar(32); unique"` // 订单编号
	Title          string        `gorm:"not null; size:127"`                 // 订单标题
	TotalAmount    uint64        `gorm:"not null"`                           // 总金额，单位分
	TotalCurrency  CurrencyType  `gorm:"not null; size:16; index"`           // 总金额货币类型
	ExpirationTime uint64        `gorm:"not null"`                           // 过期时间
	Status         TradeStatus   `gorm:"not null; index"`                    // 订单状态

	DiscountAmount   uint64       `gorm:"not null"`                 // 优惠金额，单位分
	DiscountCurrency CurrencyType `gorm:"not null; size:16; index"` // 优惠金额货币类型
	PayerPayAmount   uint64       `gorm:"not null"`                 // 支付者支付金额，单位分
	PayerPayCurrency CurrencyType `gorm:"not null; size:16; index"` // 支付者支付金额货币类型
	QRCode           string       `gorm:"not null; size:1024"`      // 二维码

	TPAppID            string       `gorm:"not null; index"`                    // 第三方生成的应用ID
	TPPaymentType      PaymentType  `gorm:"not null; type:varchar(30); index"`  // 第三方支付平台的支付类型
	TPTradeNumber      string       `gorm:"not null; type:varchar(64); unique"` // 第三方订单编号
	TPPayerID          string       `gorm:"not null; type:varchar(64); index"`  // 第三方平台上用户的编号
	TPPayerType        PayerType    `gorm:"not null; size:18; index"`           // 第三方平台上支付者类型
	TPDiscountAmount   uint64       `gorm:"not null"`                           // 第三方平台优惠金额，单位分
	TPDiscountCurrency CurrencyType `gorm:"not null; size:16; index"`           // 第三方平台优惠金额货币类型
	TPExtra            string       `gorm:"not null; size:1024"`                // 第三方平台额外信息

	CreatedAt uint64 `gorm:"not null; index"`
	UpdatedAt uint64 `gorm:"not null; index"`
}
