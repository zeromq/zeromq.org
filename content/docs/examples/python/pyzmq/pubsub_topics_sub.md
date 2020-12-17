---
name: pubsub_topics_sub
language: python
library: pyzmq
---

Subscribers specify which topics they are interested in by setting the ZMQ_SUBSCRIBE option on the subscriber socket:

```Python
import signal
import zmq


signal.signal(signal.SIGINT, signal.SIG_DFL)

context = zmq.Context()

socket = context.socket(zmq.SUB)
socket.connect('tcp://localhost:5555')
socket.setsockopt(zmq.SUBSCRIBE, b'status')

while True:
    message = socket.recv()
    print(f'Received: {message}')
```
