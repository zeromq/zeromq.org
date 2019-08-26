---
name: pubsub_topics_sub
language: C
library: czmq
---

```c
//  Subscribe to the 'status'
zsock_set_subscribe(sub, "status");
```
