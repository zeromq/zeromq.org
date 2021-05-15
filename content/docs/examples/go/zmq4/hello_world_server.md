---
name: hello_world_server
language: Go
library: zmq4
---

```Go
package main

import (
        "log"
        "time"

        zmq "github.com/pebbe/zmq4"
)

func main() {
        zctx, _ := zmq.NewContext()

        s, _ := zctx.NewSocket(zmq.REP)
        s.Bind("tcp://*:5555")

        for {
                // Wait for next request from client
                msg, _ := s.Recv(0)
                log.Printf("Received %s\n", msg)

                // Do some 'work'
                time.Sleep(time.Second * 1)

                // Send reply back to client
                s.Send("World", 0)
        }
}

```
