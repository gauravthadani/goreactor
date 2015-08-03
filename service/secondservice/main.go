package main

import (
	"fmt"
	"github.com/golang/protobuf/proto"
	"github.com/goreactor/service/messages"
	"io/ioutil"
	"log"
	"net/http"
)

func GetData(w http.ResponseWriter, r *http.Request) {

	log.Println(">>> second service: Reading data")

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println(">>>>> secondservice Thoo. Stuppid", err)
		return
	}
	//log.Println("Read ", len(data), " bytes of data from body")

	requestData := &messages.GetPriceRequest{}
	err = proto.Unmarshal(data, requestData)

	if err != nil {
		log.Println(">>>>> secondservice Thoo. Stuppid", err)
		return
	}

	fmt.Println(requestData.GetId())
	fmt.Println(requestData.GetName())
	w.WriteHeader(200)
}

func main() {
	http.HandleFunc("/GetDataProtoBuf", GetData)
	log.Fatal(http.ListenAndServe(":3002", nil))
}
