package common

import (
	"encoding/json"
	"io/ioutil"
	"log"
)


func ReadJson(path string, i interface{}) error {
	body, err := ioutil.ReadFile(path)

	if err != nil {
		log.Println(">>> ReadJson: Error: ", err)
		return err
	}

	err = json.Unmarshal([]byte(body), i)

	return err
}