package main

import (
	"log"
	"net/http"
	"os"
    "github.com/user/price/queryengine"
)



func makeHandler(fn func(http.ResponseWriter, *http.Request, string), data_file_path string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fn(w, r, data_file_path)
	}
}

type AppConfig struct{
	Port string `json:"port"`
	PublicFolderPath string `json:"public_folder_path"`
	DataFilePath string `json:"data_file_path"`
}

func main() {
	config_path := os.Getenv("PRICE_CONFIG_FILE_PATH")
	var conf AppConfig

	err := queryengine.ReadJson(config_path, &conf)
	
	if err != nil {
		log.Fatal(">>>> Main app failed to start : " , err)
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
