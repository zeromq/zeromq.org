---
name: messages_strings_send_recv_multi
language: C
library: libzmq
---

The following function sends an array of string to a socket. The *ZMQ_SNDMORE*
flag tells ZeroMQ to postpone sending until all frames are ready.

```c
static void
s_send_strings (void *socket, const char[] *strings, int no_of_strings) {
    for (index = 0; index < no_of_strings; index++) {
        int FLAG = (index + 1) == no_of_strings ? 0 : ZMQ_SNDMORE;
        zmq_send (socket, strdup(strings[index]), strlen(strings[index]), FLAG);
    }
}
```

To retrieve a string frames from a multi-part messages we must use the
*ZMQ_RCVMORE* `zmq_getsockopt()` option after calling `zmq_recv()` to determine
if there are further parts to receive.

```c
char *strings[25];
int rcvmore;
size_t option_len = sizeof (int);
int index = 0;
do {
    strings[index++] = s_recv_string (socket);
    zmq_getsockopt (socket, ZMQ_RCVMORE, &rcvmore, &option_len);
} while (rcvmore);
```
