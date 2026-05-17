---
title: Python
weight: 3
toc: true
---

## PyOMQ - drop-in pyzmq replacement, 2-3x faster

Drop-in pyzmq replacement backed by omq.rs (pure Rust ZeroMQ). Same API, sync and asyncio, 2-3x throughput over TCP. No libzmq dependency.

| Github | https://github.com/paddor/omq.rs/tree/main/bindings/pyomq |
|--------|-----------------------------------------------------------|
| PyPI   | https://pypi.org/project/pyomq/                           |

### Download

```bash
pip install pyomq
```

### Example

```python
import pyomq

ctx = pyomq.Context()

push = ctx.socket(pyomq.PUSH)
push.bind("tcp://127.0.0.1:5555")

pull = ctx.socket(pyomq.PULL)
pull.connect("tcp://127.0.0.1:5555")

push.send(b"Hello World!")
print(pull.recv())
```

asyncio:

```python
import asyncio
import pyomq.asyncio

async def main():
    ctx = pyomq.asyncio.Context()

    push = ctx.socket(pyomq.PUSH)
    push.bind("tcp://127.0.0.1:5555")

    pull = ctx.socket(pyomq.PULL)
    pull.connect("tcp://127.0.0.1:5555")

    await push.send(b"Hello World!")
    print(await pull.recv())

asyncio.run(main())
```

## Pyzmq

| Github | https://github.com/zeromq/pyzmq         |
|--------|-----------------------------------------|
| Docs   | https://pyzmq.readthedocs.io/en/latest/ |
| Guide  | http://zguide.zeromq.org/py:all         |
| pypi   | https://pypi.org/project/pyzmq/         |


### Download

```bash
pip install pyzmq
```

### Example

Server:
```python
#
#   Hello World server in Python
#   Binds REP socket to tcp://*:5555
#   Expects b"Hello" from client, replies with b"World"
#

import time
import zmq

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5555")

while True:
    #  Wait for next request from client
    message = socket.recv()
    print("Received request: %s" % message)

    #  Do some 'work'
    time.sleep(1)

    #  Send reply back to client
    socket.send(b"World")
```

Client:
```python
#
#   Hello World client in Python
#   Connects REQ socket to tcp://localhost:5555
#   Sends "Hello" to server, expects "World" back
#

import zmq

context = zmq.Context()

#  Socket to talk to server
print("Connecting to hello world server…")
socket = context.socket(zmq.REQ)
socket.connect("tcp://localhost:5555")

#  Do 10 requests, waiting each time for a response
for request in range(10):
    print("Sending request %s …" % request)
    socket.send(b"Hello")

    #  Get the reply.
    message = socket.recv()
    print("Received reply %s [ %s ]" % (request, message))
```
