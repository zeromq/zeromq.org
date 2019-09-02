---
name: messages_strings_send_recv
language: C
library: czmq
---

The following functions sends a C string to a socket as a single-frame message
where the string's length equals frame's length.

```c
zstr_send (socket, "HELLO");
```

Another option is to send a formatted string, similar to printf.

```c
zstr_sendf (socket, "%s-%d", "HELLO", 1);
```

To read a string from a socket simply call the `zstr_recv` function.

```c
char *string = zstr_recv (socket);
```
