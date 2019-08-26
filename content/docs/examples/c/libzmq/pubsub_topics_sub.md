---
name: pubsub_topics_sub
language: C
library: libzmq
---

```c
//  Subscribe to the 'status' topic
zmq_setsockopt (sub, ZMQ_SUBSCRIBE, "status", strlen ("status"));
```
