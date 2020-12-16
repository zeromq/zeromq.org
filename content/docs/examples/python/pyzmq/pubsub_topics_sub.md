---
name: pubsub_topics_sub.py
language: python
library: pyzmq
---

```Python
import signal
import zmq


signal.signal(signal.SIGINT, signal.SIG_DFL)

context = zmq.Context()

socket = context.socket(zmq.SUB)
socket.connect('tcp://localhost:5555')
socket.setsockopt(zmq.SUBSCRIBE, b'1004')

while True:
    message = socket.recv()
    print(f'Received: {message}')
```
