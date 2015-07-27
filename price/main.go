package main
import (
	"log"
	"net/http"
	"os"
    "github.com/user/price/queryengine"
)



func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fn(w, r, "GetData")
	}
}





func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}
	path := os.Getenv("GOPATH")+"\\src\\github.com\\user\\price"
	http.Handle("/", http.FileServer(http.Dir(path+"\\public")))
	http.HandleFunc("/GetData", makeHandler(queryengine.GetData))
	log.Println("Server started: http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
