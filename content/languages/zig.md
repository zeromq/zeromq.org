---
title: Zig
weight: 6
toc: true
---

The following options do exist for using Zig with ZeroMQ:

## zzmq

Github: https://github.com/nine-lives-later/zzmq

### Install

Follow the instruction to install [install libzmq]({{< relref "/docs/download" >}}) and [CZMQ]({{< relref "/languages/c" >}})

Add the library, by following then instructions in the [README](https://github.com/nine-lives-later/zzmq/blob/main/README.md).

### Example

Running the server:

```zig
const zzmq = @import("zzmq");

var socket = try zzmq.ZSocket.init(allocator, zzmq.ZSocketType.Pair);
defer socket.deinit();

const port = try socket.bind("tcp://127.0.0.1:!");

// send a message
var frame = try zzmq.ZFrame.init(data);
defer frame.deinit();

try socket.send(&frame, .{});
```

Running the client:

```zig
const zzmq = @import("zzmq");

var socket = try zzmq.ZSocket.init(allocator, zzmq.ZSocketType.Pair);
defer socket.deinit();

const endpoint = try std.fmt.allocPrint(allocator, "tcp://127.0.0.1:{}", .{port});
defer allocator.free(endpoint);

try socket.connect(endpoint);

// receive a message
var frame = try socket.receive();
defer frame.deinit();

const data = try frame.data();
```
