---
name: messages_functions
language: C
library: libzmq
---

* Initialise a message:
  [zmq_msg_init()](http://api.zeromq.org/master:zmq-msg-init),
  [zmq_msg_init_size()](http://api.zeromq.org/master:zmq-msg-init-size),
  [zmq_msg_init_data()](http://api.zeromq.org/master:zmq-msg-init-data).
* Sending and receiving a message:
  [zmq_msg_send()](http://api.zeromq.org/master:zmq-msg-send),
  [zmq_msg_recv()](http://api.zeromq.org/master:zmq-msg-recv).
* Release a message:
  [zmq_msg_close()](http://api.zeromq.org/master:zmq-msg-close).
* Access message content:
  [zmq_msg_data()](http://api.zeromq.org/master:zmq-msg-data),
  [zmq_msg_size()](http://api.zeromq.org/master:zmq-msg-size),
  [zmq_msg_more()](http://api.zeromq.org/master:zmq-msg-more).
* Work with message properties:
  [zmq_msg_get()](http://api.zeromq.org/master:zmq-msg-get),
  [zmq_msg_set()](http://api.zeromq.org/master:zmq-msg-set).
* Message manipulation:
  [zmq_msg_copy()](http://api.zeromq.org/master:zmq-msg-copy),
  [zmq_msg_move()](http://api.zeromq.org/master:zmq-msg-move).
