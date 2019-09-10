---
name: pubsub_topics_sub
language: csharp
library: NetMQ
---

Subscribers specify which topics they are interested in via the Subscribe method
of SubscriberSocket:

```c
//  Subscribe to the 'status'
sub.Subscribe("status");
```
