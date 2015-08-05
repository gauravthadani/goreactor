package main

import (	
	"log"
	"net/http"
	"github.com/goreactor/service/common"
	"io/ioutil"
)


type AppConfig struct {
	Port             string `json:"port"`
	PublicFolderPath string `json:"public_folder_path"`	
}

func main() {

	var conf AppConfig
	err := common.ReadJson("./config.json", &conf)

	if err != nil {
		log.Fatal(">>>> Main app failed to start : ", err)
		return
	}

	if conf.Port == "" {
		conf.Port = "3001"
	}
	
	http.Handle("/", http.FileServer(http.Dir(conf.PublicFolderPath)))
	http.HandleFunc("/GetData", GetData)
	log.Println("Server started: http://localhost:" + conf.Port)
	log.Fatal(http.ListenAndServe(":"+conf.Port, nil))
}

func GetData(w http.ResponseWriter, r *http.Request) {	
	log.Println("Calling queryengine with ", r.URL.RawQuery)
	resp, err := http.Get("http://queryengine/GetData?"+r.URL.RawQuery)
	if err != nil {
		HandleHttpError(err, w)
		return
	}
	
	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		HandleHttpError(err, w)
		return
	}

	_, err = w.Write(data)
	if err != nil {
		HandleHttpError(err, w)
	}

	return
}

func HandleHttpError(err error, w http.ResponseWriter) {
	message := "Error :" + err.Error()
	log.Fatal(message)
	http.Error(w, message, 500)
}
