---
title: Ruby
weight: 3
---

<table>
<tr><td>Github</td><td>https://github.com/zeromq/rbzmq</td></tr>
<tr><td>gem</td><td>https://rubygems.org/gems/zmq</td></tr>
<tr><td>Docs</td><td>http://zeromq.github.io/rbzmq/</td></tr>
<table>

## Installation

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

## Example

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
