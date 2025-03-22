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

## zimq

Github: https://github.com/uyha/zimq

### Install

1. Run the following command to add this project as a dependency

   ```sh
   zig fetch --save git+https://github.com/uyha/zimq.git
   ```

1. In your `build.zig`, add the following

   ```zig
   const zimq = b.dependency("zimq", .{
       .target = target,
       .optimize = optimize,
   });
   // Replace `exe` with your actual library or executable
   exe.root_module.addImport("zimq", zimq.module("zimq"));
   ```

### Example

```zig
const std = @import("std");
const zimq = @import("zimq");

pub fn main() !void {
    const context: *zimq.Context = try .init();
    defer context.deinit();

    const pull: *zimq.Socket = try .init(context, .pull);
    defer pull.deinit();

    const push: *zimq.Socket = try .init(context, .push);
    defer push.deinit();

    try pull.bind("inproc://#1");
    try push.connect("inproc://#1");

    const message = "hello";
    try push.sendConst(message, message.len, .{});

    var buffer: zimq.Message = .empty();
    _ = try pull.recvMsg(&buffer, .{});

    std.debug.print("{s}\n", .{buffer.slice().?});
}
```
