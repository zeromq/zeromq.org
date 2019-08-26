---
name: pubsub_topics_pub
language: C
library: czmq
---

```c
//  Send a message on the 'status' topic
zstr_sendx (pub, "status", "All is well", NULL);
```
