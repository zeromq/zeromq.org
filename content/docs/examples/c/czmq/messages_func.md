---
name: messages_functions
language: C
library: czmq
---

* Initialise a message:
  [zmsg_new()](http://czmq.zeromq.org/czmq4-0:zmsg),
* Sending and receiving a message:
  [zmsg_send()](http://czmq.zeromq.org/czmq4-0:zmsg),
  [zmsg_recv()](http://czmq.zeromq.org/czmq4-0:zmsg).
* Release a message:
  [zmsg_destroy()](http://czmq.zeromq.org/czmq4-0:zmsg).
* Access message content: TBD ...
* Work with message properties: TBD ...
* Message manipulation: [zmsg_dup()](http://czmq.zeromq.org/czmq4-0:zmsg).
