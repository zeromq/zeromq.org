---
name: messages_functions
language: C
library: libzmq
---

* Initialise a message:
  [zmq_msg_init()](https://libzmq.readthedocs.io/en/latest/zmq_msg_init.html),
  [zmq_msg_init_size()](https://libzmq.readthedocs.io/en/latest/zmq_msg_init_size.html),
  [zmq_msg_init_data()](https://libzmq.readthedocs.io/en/latest/zmq_msg_init_data.html).
* Sending and receiving a message:
  [zmq_msg_send()](https://libzmq.readthedocs.io/en/latest/zmq_msg_send.html),
  [zmq_msg_recv()](https://libzmq.readthedocs.io/en/latest/zmq_msg_recv.html).
* Release a message:
  [zmq_msg_close()](https://libzmq.readthedocs.io/en/latest/zmq_msg_close.html).
* Access message content:
  [zmq_msg_data()](https://libzmq.readthedocs.io/en/latest/zmq_msg_data.html),
  [zmq_msg_size()](https://libzmq.readthedocs.io/en/latest/zmq_msg_size.html),
  [zmq_msg_more()](https://libzmq.readthedocs.io/en/latest/zmq_msg_more.html).
* Work with message properties:
  [zmq_msg_get()](https://libzmq.readthedocs.io/en/latest/zmq_msg_get.html),
  [zmq_msg_set()](https://libzmq.readthedocs.io/en/latest/zmq_msg_set.html).
* Message manipulation:
  [zmq_msg_copy()](https://libzmq.readthedocs.io/en/latest/zmq_msg_copy.html),
  [zmq_msg_move()](https://libzmq.readthedocs.io/en/latest/zmq_msg_move.html).
