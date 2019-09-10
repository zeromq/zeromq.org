---
name: pubsub_topics_sub
language: C
library: libzmq
---

Subscribers specify which topics they are interested in by setting the
ZMQ_SUBSCRIBE option on the subscriber socket:

```c
//  Subscribe to the 'status' topic
zmq_setsockopt (sub, ZMQ_SUBSCRIBE, "status", strlen ("status"));
```
