---
name: hello_world_server
language: nodejs
library: zeromqjs
---

```javascript
//  Hello World server
//  Binds REP socket to tcp://*:5555
//  Expects "Hello" from client, replies with "World"

const zmq = require('zeromq');

async function runServer() {
  const sock = new zmq.Reply();

  await sock.bind('tcp://*:5555');

  for await (const [msg] of sock) {
    console.log('Received ' + ': [' + msg.toString() + ']');
    await sock.send('World');
    // Do some 'work'
  }
}

runServer();
```
