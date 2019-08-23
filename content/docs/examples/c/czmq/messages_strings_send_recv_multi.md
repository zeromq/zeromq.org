---
name: messages_strings_send_recv_multi
language: C
library: czmq
---

Sending multiple string frames is possible using the `zstr_sendm` function. This
function will postpone the actually sending of the message until the last frame
is ready.

```c
zstr_sendm (socket, "HELLO");
zstr_sendm (socket, "beautiful");
zstr_send (socket, "WORLD!");
```

Or do the same even simpler with the `zstr_sendx` function. Last parameter must
be NULL!

```c
zstr_sendx (socket, "HELLO", "beautiful", "WORLD!", NULL);
```

To receive a series of string frame use the `zstr_recvx` function. Each string
is allocated and filled with string data!

```c
char *hello, beautiful, world;
zstr_recvx (socket, &hello, &beautiful, &world, NULL);
```
