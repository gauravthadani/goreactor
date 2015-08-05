package common

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
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

func MakeHandler(fn func(http.ResponseWriter, *http.Request, string), d string) http.HandlerFunc {
       return func(w http.ResponseWriter, r *http.Request) {
               fn(w, r, d)
       }
}