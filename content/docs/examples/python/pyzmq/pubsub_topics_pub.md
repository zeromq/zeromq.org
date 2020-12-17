---
name: pubsub_topics_pub
language: python
library: pyzmq
---

```Python
import signal
import time
import zmq


signal.signal(signal.SIGINT, signal.SIG_DFL)

context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind('tcp://*:5555')

for i in range(5):
    socket.send(b'status 5')
    socket.send(b'All is well')
    time.sleep(1)
```
