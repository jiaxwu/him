package main

import (
	"fmt"
	"regexp"
)

func main() {
	username := "41412413"
	isPureDigitRegexp := fmt.Sprintf(`\d{%d}`, len(username))
	matchString, err := regexp.MatchString(isPureDigitRegexp, username)
	fmt.Println(err)
	fmt.Println(matchString)
}
