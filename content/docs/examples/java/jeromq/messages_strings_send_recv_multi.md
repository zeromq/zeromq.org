---
name: messages_strings_send_recv_multi
language: java
library: jeromq
---

Sending multiple string frames in one message is possible using the `sendMore`
method. This method will postpone the actually sending of the message until the
last frame is sent.

```java
socket.sendMore (socket, "HELLO");
socket.sendMore (socket, "beautiful");
socket.send (socket, "WORLD!");
```

Instead of using the socket's send API you can construct a multi-frame message
using the ZMsg class.

```java
ZMsg *strings = new ZMsg();
strings.add("HELLO");
strings.add("beautiful");
strings.add("WORLD");
strings.send(socket);
```

To receive a series of string frames call the `recvStr` function multiple times.

```java
String hello     = socket.recvStr();
String beautiful = socket.recvStr();
String world 	 = socket.recvStr();
```

In order to retrive the whole message in one call use the static recvMsg method
of the ZMsg class.

```java
ZMsg strings = ZMsg.recvMsg(socket);
String hello     = strings.popString();
String beautiful = strings.popString();
String world     = strings.popString();
```
