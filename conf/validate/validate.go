package validate

import (
	"github.com/go-playground/validator/v10"
)

func NewValidate() *validator.Validate {
	validate := validator.New()
	_ = validate.RegisterValidation("phone", Phone)
	_ = validate.RegisterValidation("email", Email)
	return validate
}
