package file

import (
	"github.com/gin-gonic/gin"
	"io"
)

const (
	// MaxUserAvatarSize 用户头像最大长度 5MB
	MaxUserAvatarSize = 5242880
	// UserAvatarObjectNamePrefix 用户头像对象名前缀
	UserAvatarObjectNamePrefix = "/user/profile/avatar/"
)

// UserAvatarContentTypeToFileTypeMap 用户头像的 ContentType 到 FileType 的转换
var UserAvatarContentTypeToFileTypeMap = map[string]string{
	"image/png":  "png",
	"image/jpg":  "jpg",
	"image/jpeg": "jpeg",
}

// 从MultipartForm获取一个文件
func (w *Wrapper) getFile(c *gin.Context) (*File, error) {
	files, err := w.getFiles(c, 1)
	if err != nil {
		return nil, err
	}
	if len(files) == 0 {
		return nil, nil
	}
	return files[0], nil
}

// 从MultipartForm获取文件
func (w *Wrapper) getFiles(c *gin.Context, size int) ([]*File, error) {
	multipartForm, err := c.MultipartForm()
	if err != nil {
		return nil, err
	}
	multipartFiles := multipartForm.File
	if len(multipartFiles) < 1 {
		return nil, nil
	}

	var files []*File
	for _, fileHeaders := range multipartFiles {
		for _, fileHeader := range fileHeaders {
			file, err := fileHeader.Open()
			if err != nil {
				return nil, err
			}

			fileBytes, err := io.ReadAll(file)
			if err != nil {
				return nil, err
			}
			files = append(files, &File{
				Content:     fileBytes,
				Name:        fileHeader.Filename,
				ContentType: fileHeader.Header.Get("Content-Type"),
			})
			if len(files) >= size {
				break
			}
		}
		break
	}

	return files, nil
}
