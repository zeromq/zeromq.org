---
name: messages_strings_send_recv_multi
language: C
library: libzmq
---

The following function sends an array of string to a socket. The *MSG_MORE* flag
tells ZeroMQ to postpone sending until all frame are ready.

```c
static void
s_send_strings (void *socket, const char[] *strings, int no_of_strings) {
    for (index = 0; index < no_of_strings; index++) {
        int FLAG = (index + 1) == no_of_strings ? 0 : MSG_MORE;
        zmq_send (socket, strdup(strings[index]), strlen(strings[index]), FLAG);
    }
}
```

TBD


```c
TBD
```
