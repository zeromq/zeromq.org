---
name: messages_strings_send_recv_multi
language: csharp
library: NetMQ
---


Sending multiple string frames is possible using the `SendMoreFrame` function. This
function will postpone the actually sending of the message until the last frame
is ready.

```csharp
socket.SendMoreFrame("HELLO")
    .SendMoreFrame("beautiful")
    .SendMore("WORLD!");
```

To receive a series of strings call `ReceiveMultipartStrings` function. Which return a list of strings.

```csharp
List<string> strings = socket.ReceiveMultipartStrings();
```

