---
title: Java
weight: 3
toc: true
---

Three options are available for Java developers, JeroMQ a pure Java
implementation, JZMQ a Java binding for libzmq, JCZMQ a Java binding for czmq

## JeroMQ

<table>
<tr><td>Github</td><td>https://github.com/zeromq/jeromq</td></tr>
<tr><td>Docs</td><td>https://github.com/zeromq/jeromq/blob/master/README.md</td></tr>
</table>

### Example

Here is how you might implement a server that prints the messages it receives
and responds to them with "Hello, world!":

```java
import org.zeromq.ZMQ;
import org.zeromq.ZContext;

public class hwserver
{
    public static void main(String[] args) throws Exception
    {
        try (ZContext context = new ZContext()) {
            // Socket to talk to clients
            ZMQ.Socket socket = context.createSocket(ZMQ.REP);
            socket.bind("tcp://*:5555");

            while (!Thread.currentThread().isInterrupted()) {
                // Block until a message is received
                byte[] reply = socket.recv(0);

                // Print the message
                System.out.println(
                    "Received: [" + new String(reply, ZMQ.CHARSET) + "]"
                );

                // Send a response
                String response = "Hello, world!";
                socket.send(response.getBytes(ZMQ.CHARSET), 0);
            }
        }
    }
}
```

## JZMQ

<table>
<tr><td>Github</td><td>https://github.com/zeromq/jzmq</td></tr>
<tr><td>Docs</td><td>https://github.com/zeromq/jzmq/blob/master/README.md</td></tr>
</table>

## JCZMQ

<table>
<tr><td>Github</td><td>https://github.com/zeromq/czmq/tree/master/bindings/jni</td></tr>
<tr><td>Docs</td><td>https://github.com/zeromq/czmq/blob/master/bindings/jni/README.md</td></tr>
</table>

### Example

```java
TBD...
```
