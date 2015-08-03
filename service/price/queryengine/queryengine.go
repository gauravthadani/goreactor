package queryengine

import (
	"bytes"
	"encoding/json"
	"github.com/golang/protobuf/proto"
	"github.com/goreactor/service/messages"
	"github.com/goreactor/service/price/structs"
	"io/ioutil"
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

func ReadJson(path string, i interface{}) error {
	body, err := ioutil.ReadFile(path)

	if err != nil {
		log.Println(">>> ReadJson: Error: ", err)
		return err
	}

	err = json.Unmarshal([]byte(body), i)

	return err
}

func GetData(w http.ResponseWriter, r *http.Request, data_file_path string) {
	r.ParseForm()

	logRequestData(r)

	var v structs.Data

	err := ReadJson(data_file_path, &v)

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
	}
	v.Paginate.Direction = direction[0]
	v.Paginate.ColName = column_name[0]

	structs.OrderBy(column_name[0], direction[0] == "asc").Sort(v.Items)

	newBody, err := json.Marshal(v)
	if err != nil {
		log.Println("Error while marshalling ", err)
	}

	w.Write(newBody)
	requestId := "MyRequestId"
	requestName := "MyRequestName"

	data, err := proto.Marshal(&messages.GetPriceRequest{Id: &requestId, Name: &requestName})

	if err != nil {
		log.Println(">>>>> main: Thoo, stuppid.", err)
	}
	log.Println(">>>>> main: Before sending to secondservice")
	var sendingData = bytes.NewReader(data)
	log.Println(sendingData)
	resp, err := http.Post("http://localhost:3002/GetDataProtoBuf", "application/octet-stream", sendingData)
	log.Println(">>>> main : Reponse : ", resp)
	log.Println(">>>> main : Error : ", err)
	log.Println(">>>>> main: After sending to secondservice")
}
