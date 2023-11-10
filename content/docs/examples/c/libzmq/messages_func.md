---
name: messages_functions
language: C
library: libzmq
---

* Initialise a message:
  [zmq_msg_init()](https://libzmq.readthedocs.io//master:zmq-msg-init),
  [zmq_msg_init_size()](https://libzmq.readthedocs.io//master:zmq-msg-init-size),
  [zmq_msg_init_data()](https://libzmq.readthedocs.io//master:zmq-msg-init-data).
* Sending and receiving a message:
  [zmq_msg_send()](https://libzmq.readthedocs.io//master:zmq-msg-send),
  [zmq_msg_recv()](https://libzmq.readthedocs.io//master:zmq-msg-recv).
* Release a message:
  [zmq_msg_close()](https://libzmq.readthedocs.io//master:zmq-msg-close).
* Access message content:
  [zmq_msg_data()](https://libzmq.readthedocs.io//master:zmq-msg-data),
  [zmq_msg_size()](https://libzmq.readthedocs.io//master:zmq-msg-size),
  [zmq_msg_more()](https://libzmq.readthedocs.io//master:zmq-msg-more).
* Work with message properties:
  [zmq_msg_get()](https://libzmq.readthedocs.io//master:zmq-msg-get),
  [zmq_msg_set()](https://libzmq.readthedocs.io//master:zmq-msg-set).
* Message manipulation:
  [zmq_msg_copy()](https://libzmq.readthedocs.io//master:zmq-msg-copy),
  [zmq_msg_move()](https://libzmq.readthedocs.io//master:zmq-msg-move).
