---
title: Ruby
weight: 3
toc: true
---

## OMQ - pure Ruby, wire-compatible with libzmq

Pure Ruby ZeroMQ implementation. No C extensions, no libzmq dependency. Faster than any binding in both throughput and latency. All standard and draft socket types, TCP/IPC/inproc transports, CURVE/PLAIN/BLAKE3ZMQ mechanisms, lz4+tcp:// and zstd+tcp:// compression transports.

| Github | https://github.com/zeromq/omq.rb              |
|--------|----------------------------------------------|
| gem    | https://rubygems.org/gems/omq                |
| CLI    | https://rubygems.org/gems/omq-cli            |

### Installation

```bash
gem install omq
```

### Example

```ruby
require "omq"

push = OMQ.push
push.connect("tcp://127.0.0.1:9000")
push.send("Hello World!")

pull = OMQ.pull
pull.bind("tcp://127.0.0.1:9000")
puts pull.recv
```

## rbzmq - bindings for the libzmq

| Github | https://github.com/zeromq/rbzmq |
|--------|---------------------------------|
| gem    | https://rubygems.org/gems/zmq   |
| Docs   | http://zeromq.github.io/rbzmq/  |


### Installation

[Install libzmq]({{< relref "/docs/download" >}}).

```bash
gem install zmq
```

If the gem installation complains that it cannot find libzmq or headers, simply pass the location of your libzmq installation to the gem install command:

```bash
gem install zmq -- --with-zmq-dir=/opt/local
```

On Windows add a parameter for the libs. For example:

```bash
gem install zmq -- --with-zmq-dir=c:/src/zeromq-4.3.2 --with-zmq-lib=c:/src/zeromq-4.3.2/src/.libs
```

### Example

```ruby
require "zmq"

context = ZMQ::Context.new(1)

puts "Opening connection for READ"
inbound = context.socket(ZMQ::UPSTREAM)
inbound.bind("tcp://127.0.0.1:9000")

outbound = context.socket(ZMQ::DOWNSTREAM)
outbound.connect("tcp://127.0.0.1:9000")
p outbound.send("Hello World!")
p outbound.send("QUIT")

loop do
  data = inbound.recv
  p data
  break if data == "QUIT"
end
```
