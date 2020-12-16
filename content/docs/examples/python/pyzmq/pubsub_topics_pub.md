---
name: pubsub_topics_pub
language: python
library: pyzmq
---

```Python
import signal
import time
import random
import zmq


signal.signal(signal.SIGINT, signal.SIG_DFL)

context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind('tcp://*:5555')

for i in range(10):
    topic = random.randrange(1000, 1005)
    message = bytes(f'{topic}: Broadcasting message {i}', 'utf-8')
    print(message)
    socket.send(message)
    time.sleep(1)
```
