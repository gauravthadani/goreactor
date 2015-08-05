package main

import (
	//"bytes"
	"encoding/json"
	//"github.com/golang/protobuf/proto"
	//"github.com/goreactor/service/messages"
	"github.com/goreactor/service/common"
	"github.com/goreactor/service/queryengine/structs"
	"log"
	"net/http"
)

func logRequestData(r *http.Request) {
	log.Println("--------------------------------------------------")
	log.Println("Request headers :", r.Header)
	log.Println("Request body :", r.Body)
	log.Println("Request parameters", r.Form)
	log.Println("--------------------------------------------------")
}

func GetData(w http.ResponseWriter, r *http.Request, data_file_path string) {
	r.ParseForm()

	logRequestData(r)

	var v structs.Data

	err := common.ReadJson(data_file_path, &v)

	if err != nil {
		log.Println(">>> Something went wrong : ", err)
	}

	for _, item := range v.Items {
		log.Println(item)

	}

	direction, ok := r.Form["direction"]
	column_name, _ := r.Form["col_name"]
	if ok {
		log.Println(">>> Sort direction", direction[0])
		log.Println(">>> Sort column", column_name[0])
		log.Println("UnMarshalled json data: ",v)
	} else {
		log.Println(r.Form)
	}

	v.Paginate.Direction = direction[0]
	v.Paginate.ColName = column_name[0]

	structs.OrderBy(v.Paginate.ColName, v.Paginate.Direction == "asc").Sort(v.Items)

	newBody, err := json.Marshal(v)
	if err != nil {
		log.Println("Error while marshalling ", err)
	}

	w.Write(newBody)
}
