package model

// AnnouncementType 公告类型
type AnnouncementType uint8

const (
	AnnouncementTypeNormal AnnouncementType = 1 // 一般公告
)

// AnnouncementStatus 公告状态
type AnnouncementStatus uint8

const (
	AnnouncementStatusNotAnnounced AnnouncementStatus = 1 // 未公告
	AnnouncementStatusAnnouncing   AnnouncementStatus = 2 // 公告中
	AnnouncementStatusEnd          AnnouncementStatus = 3 // 已结束
)

// Announcement 公告
type Announcement struct {
	ID           uint64
	Type         AnnouncementType   `gorm:"not null"`            // 公告类型
	Title        string             `gorm:"not null; size:50"`   // 公告标题
	Content      []byte             `gorm:"not null; type:blob"` // 公告内容
	AnnounceTime uint64             `gorm:"not null; index"`     // 公告时间
	EndTime      uint64             `gorm:"not null; index"`     // 结束时间
	AnnouncedAt  uint64             `gorm:"not null; index"`     // 公告于
	EndedAt      uint64             `gorm:"not null; index"`     // 结束于
	Status       AnnouncementStatus `gorm:"not null; index"`     // 公告状态
	CreatedAt    uint64             `gorm:"not null; index"`
	UpdatedAt    uint64             `gorm:"not null; index"`
}
