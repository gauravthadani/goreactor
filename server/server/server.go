package main

import (
	"log"
	"net/http"
	"os"
	"io/ioutil"
	"encoding/json"
	"sort"
	
)

type Item struct {
	Name string
	Num int
	Years string
	Birthday string
	Picture string
	Pos string
	Height string
	Weight int
}

type Data struct {
	Columns interface{} `json:"columns"`
	Items []Item `json:"items"`
	Paginate Paginate `json:"paginate"`
}

type Paginate struct {
	ColName string `json:"col_name"`
	Direction string `json:"direction"`
	Offset int `json:"offset"`
	Page int `json:"page"`
	Pages int `json:"pages"`
	RowCount int `json:"row_count"`
	Total int `json:"total"`
}

type ComparisonFunc func(i, j *Item) bool

type Items []Item

var (
	ComparisonMap = map[string]ComparisonFunc {
		"Name" : ComparisonFunc(func(i,j *Item) bool {
			return i.Name < j.Name
		}),

		"Picture" : ComparisonFunc(func(i,j *Item) bool {
			return i.Picture < j.Picture
		}),
		
		"Years" : ComparisonFunc(func(i,j *Item) bool {
			return i.Years < j.Years
		}),

		"Birthday" : ComparisonFunc(func(i,j *Item) bool {
			return i.Birthday < j.Birthday
		}),

		"Num" : ComparisonFunc(func(i,j *Item) bool {
			return i.Num < j.Num
		}),

		"Height" : ComparisonFunc(func(i,j *Item) bool {
			return i.Height < j.Height
		}),

		"Weight" : ComparisonFunc(func(i,j *Item) bool {
			return i.Weight < j.Weight
		}),

		"Pos" : ComparisonFunc(func(i,j *Item) bool {
			return i.Pos < j.Pos
		}),
	}
)

type CompareBy struct {
	Items Items
	IsLessThan ComparisonFunc
	IsAscending bool
}

func OrderBy(fn ComparisonFunc, isAscending bool) *CompareBy {
	var c CompareBy	
	c.IsLessThan = fn
	c.IsAscending = isAscending
	return &c  
}

func (c *CompareBy) Sort(items Items) {
	c.Items = items
	sort.Sort(c)
}

func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fn(w, r ,"GetData")
	}
}

func (a *CompareBy) Len() int  { return len([]Item(a.Items)) }

func (a *CompareBy) Swap(i, j int) { 
	b:= []Item(a.Items)
	b[i], b[j] = b[j], b[i]
}

func (a *CompareBy) Less(i, j int) bool { 
	b:= []Item(a.Items)
	return a.IsAscending != a.IsLessThan(&b[i], &b[j])
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
	
	

	body, err := ioutil.ReadFile("data.json")
    
    if err != nil {
    	log.Println(">>> Oops, Error in GetData", err)    
    }
    
    var v Data

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
    
    OrderBy(ComparisonMap[column_name[0]], direction[0] == "asc").Sort(v.Items)
    
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
	
	log.Println(http.Dir("../../..//public"))

	http.Handle("/", http.FileServer(http.Dir("../..//public")))
	http.HandleFunc("/GetData", makeHandler(GetData))
	log.Println("Server started: http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
