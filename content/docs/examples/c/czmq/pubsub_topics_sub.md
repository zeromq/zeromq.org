---
name: pubsub_topics_sub
language: C
library: czmq
---

Subscribers specify which topics they are interested in by calling the
`zsock_set_subscribe` method with the subscriber socket:

```c
//  Subscribe to the 'status'
zsock_set_subscribe(sub, "status");
```
