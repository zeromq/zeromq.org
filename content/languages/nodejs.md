---
title: NodeJS
weight: 4
---

<table>
  <tr><td>Github</td><td><a href="https://github.com/zeromq/zeromq.js/">https://github.com/zeromq/zeromq.js/</a></td></tr>
  <tr><td>npm</td><td><a href="https://www.npmjs.com/package/zeromq">https://www.npmjs.com/package/zeromq</a></td></tr>
</table>

## Installation

To install ZeroMQ for Node, download and install the package from npm. Here we use the version 5.x branch since version 6.x is still in beta.

```
$ npm install zeromq@5
```

## Examples using zeromq

### Push/Pull

This example demonstrates how a producer pushes information onto a
socket and how a worker pulls information from the socket.

**producer.js**

```js
// producer.js
var zmq = require("zeromq"),
  sock = zmq.socket("push");

sock.bindSync("tcp://127.0.0.1:3000");
console.log("Producer bound to port 3000");

setInterval(function() {
  console.log("sending work");
  sock.send("some work");
}, 500);
```

**worker.js**

```js
// worker.js
var zmq = require("zeromq"),
  sock = zmq.socket("pull");

sock.connect("tcp://127.0.0.1:3000");
console.log("Worker connected to port 3000");

sock.on("message", function(msg) {
  console.log("work: %s", msg.toString());
});
```

### Pub/Sub

This example demonstrates using `zeromq` in a classic Pub/Sub,
Publisher/Subscriber, application.

**Publisher: pubber.js**

```js
// pubber.js
var zmq = require("zeromq"),
  sock = zmq.socket("pub");

sock.bindSync("tcp://127.0.0.1:3000");
console.log("Publisher bound to port 3000");

setInterval(function() {
  console.log("sending a multipart message envelope");
  sock.send(["kitty cats", "meow!"]);
}, 500);
```

**Subscriber: subber.js**

```js
// subber.js
var zmq = require("zeromq"),
  sock = zmq.socket("sub");

sock.connect("tcp://127.0.0.1:3000");
sock.subscribe("kitty cats");
console.log("Subscriber connected to port 3000");

sock.on("message", function(topic, message) {
  console.log(
    "received a message related to:",
    topic,
    "containing message:",
    message
  );
});
```
