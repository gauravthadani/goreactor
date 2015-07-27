package main
import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
    "github.com/user/price/structs"
)

var path = ""


func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fn(w, r, "GetData")
	}
}

func logRequestData(r *http.Request, title string) {
	log.Println("--------------------------------------------------")
	log.Println("Request headers :", r.Header)
	log.Println("Request body :", r.Body)
	log.Println("Request title :", title)
	log.Println("Request parameters", r.Form)
	log.Println("--------------------------------------------------")
}

func GetData(w http.ResponseWriter, r *http.Request, title string) {
	r.ParseForm()

	logRequestData(r, title)

	body, err := ioutil.ReadFile(path+"\\data.json")

	if err != nil {
		log.Println(">>> Oops, Error in GetData", err)
	}

	var v structs.Data

	err = json.Unmarshal([]byte(body), &v)
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
}



func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}
	path = os.Getenv("GOPATH")+"\\src\\github.com\\user\\price"
	http.Handle("/", http.FileServer(http.Dir(path+"\\public")))
	http.HandleFunc("/GetData", makeHandler(GetData))
	log.Println("Server started: http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
