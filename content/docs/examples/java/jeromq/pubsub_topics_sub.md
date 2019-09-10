---
name: pubsub_topics_sub
language: java
library: jeromq
---

Subscribers specify which topics they are interested in via the subscribe method
of Socket class:

```java
//  Subscribe to the 'status'
sub.subscribe("status");
```
