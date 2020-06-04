package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
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

	e.GET("/test", test)
	e.GET("/search", movieSearch)
	e.Logger.Fatal(e.Start(":1323"))
}

func test(c echo.Context) error {
	fmt.Println("Server Starting...")
	return c.File("home.html")
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
	fmt.Println(m)
	if err != nil {
		log.Fatalln(err)
	}

	return c.String(http.StatusOK, string(data))
}
