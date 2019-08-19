---
name: messages_strings_send_recv
language: C
library: libzmq
---

The following function sends a string to a socket where the string's length
equals frame's length.

```c
static void
s_send_string (void *socket, const char *string) {
	zmq_send (socket, strdup(string), strlen(string), 0);
}
```

To read a string from a socket we have to provide a buffer and its length. The
*zmq_recv* method write as much data into the buffer as possible. If there's
more data it will get discarded. We use the returned frame's size to set
appropriate null-terminator and return a duplicate of the retrieved string.

```c
//  Receive string from socket and convert into C string
//  Chops string at 255 chars, if it's longer
static char *
s_recv_string (void *socket) {
    char buffer [256];
    int size = zmq_recv (socket, buffer, 255, 0);
    if (size == -1)
        return NULL;
    if (size > 255)
        size = 255;
    buffer [size] = \0;
    /* use strndup(buffer, sizeof(buffer)-1) in *nix */
    return strdup (buffer);
}
```
