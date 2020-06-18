package firestore

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
)

var projectID string = "goreact-539ac"

func firebaseInsert() {

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

	//insert
	_, _, err = client.Collection("test").Add(ctx, map[string]interface{}{
		"first": "Ada",
		"last":  "Lovelace",
		"born":  1815,
	})
	if err != nil {
		log.Fatalln("Failed adding alovelace:", err)
	}
}
