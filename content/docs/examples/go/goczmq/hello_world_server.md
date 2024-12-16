---
name: hello_world_server
language: Go
library: goczmq
---

```Go
package main

import (
	"log"
	"time"

	"github.com/zeromq/goczmq"
)

func main() {
	// Create a router socket and bind it to port 5555.
	router, err := goczmq.NewRouter("tcp://*:5555")
	if err != nil {
		log.Fatal(err)
	}
	defer router.Destroy()

	log.Println("router created and bound")

	for {
		// Receive the message. Here we call RecvMessage, which
		// will return the message as a slice of frames ([][]byte).
		// Since this is a router socket that support async
		// request / reply, the first frame of the message will
		// be the routing frame.
		request, err := router.RecvMessage()
		if err != nil {
			log.Fatal(err)
		}

		log.Printf("router received '%s' from '%v'", request[1], request[0])

		// Do some 'work'
		time.Sleep(time.Second * 1)

		// Send a reply. First we send the routing frame, which
		// lets the dealer know which client to send the message.
		// The FlagMore flag tells the router there will be more
		// frames in this message.
		err = router.SendFrame(request[0], goczmq.FlagMore)
		if err != nil {
			log.Fatal(err)
		}

		log.Printf("router sent 'World'")

		// Next send the reply. The FlagNone flag tells the router
		// that this is the last frame of the message.
		err = router.SendFrame([]byte("World"), goczmq.FlagNone)
		if err != nil {
			log.Fatal(err)
		}
	}
}

```
