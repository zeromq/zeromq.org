---
name: messages_strings_send_recv
language: csharp
library: NetMQ
---

The following function sends a string to a socket.

```csharp
socket.SendFrame("Hello");
```

To read a string from a socket simply call the `ReceiveFrameString` function.

```csharp
string str = socket.ReceiveFrameString();
```
