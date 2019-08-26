---
name: pubsub_topics_pub
language: C
library: libzmq
---

```c
//  Send a message on the 'status' topic
zmq_send (pub, "status", 5, ZMQ_SNDMORE);
zmq_send (pub, "All is well", 11, 0);
```
