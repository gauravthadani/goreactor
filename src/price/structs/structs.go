package structs

import (
	"sort"
)


type Item struct {
	Name     string
	Num      int
	Years    string
	Birthday string
	Picture  string
	Pos      string
	Height   string
	Weight   int
}

type Data struct {
	Columns  interface{} `json:"columns"`
	Items    []Item      `json:"items"`
	Paginate Paginate    `json:"paginate"`
}

type Paginate struct {
	ColName   string `json:"col_name"`
	Direction string `json:"direction"`
	Offset    int    `json:"offset"`
	Page      int    `json:"page"`
	Pages     int    `json:"pages"`
	RowCount  int    `json:"row_count"`
	Total     int    `json:"total"`
}

type CompareBy struct {
	Items       Items
	IsLessThan  ComparisonFunc
	IsAscending bool
}


type ComparisonFunc func(i, j *Item) bool

type Items []Item

func (c *CompareBy) Sort(items Items) {
	c.Items = items
	sort.Sort(c)
}

func (a *CompareBy) Len() int { return len([]Item(a.Items)) }

func (a *CompareBy) Swap(i, j int) {
	b := []Item(a.Items)
	b[i], b[j] = b[j], b[i]
}

func (a *CompareBy) Less(i, j int) bool {
	b := []Item(a.Items)
	return a.IsAscending != a.IsLessThan(&b[i], &b[j])
}