package main

import (
	
	"log"
	"net/http"
	"github.com/goreactor/service/common"
)


type AppConfig struct {
	Port             string `json:"port"`
	DataFilePath     string `json:"data_file_path"`
}

func main() {

	var conf AppConfig
	err := common.ReadJson("./config.json", &conf)

	if err != nil {
		log.Fatal(">>>> QueryEngine app failed to start : ", err)
		return
	}

	if conf.Port == "" {
		conf.Port = "3002"
	}
	http.HandleFunc("/GetData", common.MakeHandler(GetData,conf.DataFilePath))
	log.Println("DataFilePath", conf.DataFilePath)
	log.Fatal(http.ListenAndServe(":"+conf.Port, nil))
}




