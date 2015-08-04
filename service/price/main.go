package main

import (
	
	"log"
	"net/http"
	"github.com/goreactor/service/common"
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
	http.NewRequest("POST", "http://queryengine/GetData", nil)
	}
