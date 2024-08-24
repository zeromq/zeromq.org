---
title: NodeJS
weight: 4
---

| Github | https://github.com/zeromq/zeromq.js/ |
|--------|--------------------------------------|
| npm    | https://www.npmjs.com/package/zeromq |

## Installation

To install ZeroMQ for Node, download and install the package from npm. 

```
$ npm install zeromq
```

[ZeroMQ.js API reference](http://zeromq.github.io/zeromq.js/modules.html)

## Examples using zeromq

### Push/Pull

This example demonstrates how a producer pushes information onto a
socket and how a worker pulls information from the socket.

**producer.js**

Creates a producer to push information onto a socket.

```js
const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Push()

  await sock.bind("tcp://127.0.0.1:3000")
  console.log("Producer bound to port 3000")

  while (true) {
    await sock.send("some work")
    await new Promise(resolve => {
      setTimeout(resolve, 500)
    })
  }
}

run()
```

**worker.js**

Creates a worker to pull information from the socket.

```js
const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Pull()

  sock.connect("tcp://127.0.0.1:3000")
  console.log("Worker connected to port 3000")

  for await (const [msg] of sock) {
    console.log("work: %s", msg.toString())
  }
}

run()
```

### Pub/Sub

This example demonstrates using zeromq in a classic Pub/Sub, Publisher/Subscriber, application.

**Publisher: publisher.js**

Create the publisher which sends messages.

```js
const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Publisher()

  await sock.bind("tcp://127.0.0.1:3000")
  console.log("Publisher bound to port 3000")

  while (true) {
    console.log("sending a multipart message envelope")
    await sock.send(["kitty cats", "meow!"])
    await new Promise(resolve => {
      setTimeout(resolve, 500)
    })
  }
}

run()
```

**Subscriber: subscriber.js**

Create a subscriber to connect to a publisher's port to receive messages.

```js
const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Subscriber()

  sock.connect("tcp://127.0.0.1:3000")
  sock.subscribe("kitty cats")
  console.log("Subscriber connected to port 3000")

  for await (const [topic, msg] of sock) {
    console.log(
      "received a message related to:",
      topic,
      "containing message:",
      msg,
    )
  }
}

run()
```


### Req/Rep


This example illustrates a request from a client and a reply from a server.

**Client: client.js**

```js
const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Request()

  sock.connect("tcp://127.0.0.1:3000")
  console.log("Producer bound to port 3000")

  await sock.send("4")
  const [result] = await sock.receive()

  console.log(result)
}

run()
```

**Server: server.js**

```js
const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Reply()

  await sock.bind("tcp://127.0.0.1:3000")

  for await (const [msg] of sock) {
    await sock.send(2 * parseInt(msg, 10))
  }
}

run()
```

## TypeScript

This library provides typings for TypeScript version 3.0.x and later.

```ts
import {Request} from "zeromq"
// or as namespace
import * as zmq from "zeromq"

const reqSock = new Request()
//...
const repSock = new zmq.Reply()
```

More examples
More advanced examples can be found in the [examples](https://github.com/zeromq/zeromq.js/blob/master/examples) directory of this repository.

Or you can browse the [API reference documentation](http://zeromq.github.io/zeromq.js/) to see all socket types, methods & options as well as more detailed information about how to apply them.

