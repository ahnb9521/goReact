package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/PuerkitoBio/goquery"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	encoding "github.com/suapapa/go_hangul/encoding/cp949"
)

type item struct {
	Title      string `json:"title"`
	Link       string `json:"link"`
	Image      string `json:"image"`
	Subtitle   string `json:"subtitle"`
	PubDate    string `json:"pubDate"`
	Director   string `json:"director"`
	Actor      string `json:"actor"`
	UserRating string `json:"userRating"`
	Desc       string
}

type movieData struct {
	LastBuildDate string `json:"lastBuildDate"`
	Items         []item `json:"items"`
	Total         int    `json:"total"`
	Start         int    `json:"start"`
	Display       int    `json:"display"`
}

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://localhost:5000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.GET("/search", movieSearch)
	e.GET("/rank", getRank)
	e.Logger.Fatal(e.Start(":1323"))
}

func movieSearch(c echo.Context) error {

	v := url.Values{}
	v.Set("query", c.QueryParam("query"))

	u := &url.URL{
		Scheme:   "https",
		Host:     "openapi.naver.com",
		Path:     "v1/search/movie.json",
		RawQuery: v.Encode(),
	}

	req, err := http.NewRequest("GET", u.String(), nil) //background context를 이용해 request를 만든다.

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Naver-Client-Id", "Tbe5UQm8vgGeeQwbfj_L")
	req.Header.Set("X-Naver-Client-Secret", "5lb5XYyNV1")

	client := &http.Client{}
	resp, err := client.Do(req) //클라이언트가 req에 담긴 정보로 요청하고 응답을 resp에 담는다.
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()
	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	var m movieData
	err = json.Unmarshal(data, &m)

	items := m.Items
	var movieCode []string

	for _, item := range items {
		movieCode = append(movieCode, strings.Replace(item.Link, "https://movie.naver.com/movie/bi/mi/basic.nhn?code=", "", 1))
	}

	getDetail(movieCode, items)

	if err != nil {
		log.Fatalln(err)
	}

	mapA, _ := json.Marshal(items)
	return c.String(http.StatusOK, string(mapA)) //error
}

func getDetail(movieCode []string, items []item) {

	for i, code := range movieCode {
		url := "https://movie.naver.com/movie/bi/mi/basic.nhn?code=" + code
		resp, err := http.Get(url)

		if err != nil {
			log.Fatalln(err)
		}

		defer resp.Body.Close()

		doc, _ := goquery.NewDocumentFromReader(resp.Body)

		desc := doc.Find(".con_tx").Text()

		if len(desc) > 500 {
			desc = string(desc[0:500]) + "..."
		}

		items[i].Desc = desc
	}

}

func getRank(c echo.Context) error {

	url := "https://movie.naver.com/movie/sdb/rank/rmovie.nhn?sel=cnt&date=20200617"
	resp, err := http.Get(url)

	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()

	bodyReader, err := encoding.NewReader(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	doc, _ := goquery.NewDocumentFromReader(bodyReader)

	var rank []string

	doc.Find("div.tit3").Each(func(i int, s *goquery.Selection) {
		val, _ := s.Find("a").Attr("title")
		test := []byte(val)
		fmt.Println("rankTit >>> ", string(test))

		rank = append(rank, string(strings.TrimSpace(val)))
	})

	mapB, _ := json.Marshal(rank)

	return c.String(http.StatusOK, string(mapB))

}
