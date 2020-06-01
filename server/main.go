package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.GET("/test", test)
	e.GET("/search1", movieSearch)
	e.Logger.Fatal(e.Start(":1323"))
}

func test(c echo.Context) error {
	fmt.Println("Server Starting...")
	return c.File("home.html")
}

func movieSearch(c echo.Context) error {

	v := url.Values{}
	v.Set("query", c.QueryParam("query"))
	fmt.Println("파라미터 : " + c.QueryParam("query"))

	u := &url.URL{
		Scheme:   "https",
		Host:     "openapi.naver.com",
		Path:     "v1/search/movie.json",
		RawQuery: v.Encode(),
	}

	req, err := http.NewRequest("GET", u.String(), nil)

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Naver-Client-Id", "Tbe5UQm8vgGeeQwbfj_L")
	req.Header.Set("X-Naver-Client-Secret", "5lb5XYyNV1")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()
	data, err := ioutil.ReadAll(resp.Body)
	fmt.Println("u >>>>> " + u.String()) // 넘길 주소
	fmt.Println("============================")
	fmt.Println("resp >>>>>> ", resp)
	return c.String(http.StatusOK, string(data))
}
