---
name: messages_strings_send_recv
language: java
library: jeromq
---

The following functions sends a string to a socket as a single-frame message
where the string's length equals frame's length.

```java
socket.send("HELLO");
```

To read a string from a socket simply call the `recv` function.

```java
String hello = socket.recvStr()
```

If you need more control over the frame itself you use the ZFrame class. The
following snippet shows you how to create a frame from a string and send a
frame.

```java
ZFrame stringFrame = new ZFrame("HELLO");
stringFrame.send(socket, 0);
```

The read a frame from a socket and return a ZFrame object call the static
recvFrame function on the ZFrame class. If the content is a string you can
retrive it by the getString method supplying the charset used to serialize it.
By default ZMQ.CHARSET is used for all operations that serialze and deserialize
strings.

```java
ZFrame stringFrame = ZFrame.recvFrame(socket);
String hello = stringFrame.getString(ZMQ.CHARSET);
```
