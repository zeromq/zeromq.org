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

If you like working with message objects rather than building up the message by
sending multiple frames. You can use the `zmsg` class.

```c
zmsg_t *strings = zmsg_new ();
zmsg_addstr ("HELLO");
zmsg_addstr ("beautiful");
zmsg_addstr ("WORLD");
zmsg_send (&strings, socket);
```

To receive a series of string frames use the `zstr_recvx` function. Each string
is allocated and filled with string data!

```c
char *hello, beautiful, world;
zstr_recvx (socket, &hello, &beautiful, &world, NULL);
```

Or in case you're working with `zmsg`:

```c
zmsg_t *strings = zmsg_recv (socket);
char *hello = zmsg_popstr (strings);
char *beautiful = zmsg_popstr (strings);
char *world = zmsg_popstr (strings);
```
