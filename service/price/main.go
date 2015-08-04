package main

import (
	"github.com/goreactor/service/price/queryengine"
	"log"
	"net/http"
)

func makeHandler(fn func(http.ResponseWriter, *http.Request, string), data_file_path string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fn(w, r, data_file_path)
	}
}

type AppConfig struct {
	Port             string `json:"port"`
	PublicFolderPath string `json:"public_folder_path"`
	DataFilePath     string `json:"data_file_path"`
}

func main() {

	var conf AppConfig
	err := queryengine.ReadJson("./config.json", &conf)

	if err != nil {
		log.Fatal(">>>> Main app failed to start : ", err)
		return
	}

	if conf.Port == "" {
		conf.Port = "3001"
	}
	
	http.Handle("/", http.FileServer(http.Dir(conf.PublicFolderPath)))
	http.HandleFunc("/GetData", makeHandler(queryengine.GetData, conf.DataFilePath))
	log.Println("Server started: http://localhost:" + conf.Port)
	log.Fatal(http.ListenAndServe(":"+conf.Port, nil))
}
