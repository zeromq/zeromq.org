---
name: hello_world_client
language: nodejs
library: zeromqjs
---

```javascript
//  Hello World client
const zmq = require('zeromq');

async function runClient() {
  console.log('Connecting to hello world server…');

  //  Socket to talk to server
  const sock = new zmq.Request();
  sock.connect('tcp://localhost:5555');

  for (let i = 0; i < 10; i++) {
    console.log('Sending Hello ', i);
    await sock.send('Hello');
    const [result] = await sock.receive();
    console.log('Received ', result.toString(), i);
  }
}

runClient();
```
