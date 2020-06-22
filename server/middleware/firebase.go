package firebase

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	firebase "firebase.google.com/go"
	"github.com/labstack/echo"
)

var projectID string = "goreact-539ac"

//Insert 파이어베이스 데이터 등록
func Insert(c echo.Context) error {

	//Google Cloud Platform에서 초기화
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: projectID}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()
	fmt.Println("[Params] content : ", c.FormValue("content"))

	//현재시간
	currentTime := time.Now()

	//insert
	_, _, err = client.Collection("review").Add(ctx, map[string]interface{}{
		"movieKey": c.FormValue("movieKey"),
		"id":       "test111",
		"content":  c.FormValue("content"),
		"rgsDt":    currentTime.Format("2006-01-02 15:04"),
		"mdfDt":    "",
	})
	if err != nil {
		log.Fatalln("Failed adding alovelace:", err)
	}
	return c.String(http.StatusOK, "리뷰가 저장되었습니다.") //error
}
