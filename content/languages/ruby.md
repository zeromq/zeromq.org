---
title: Ruby
weight: 3
---

# Ruby

<table>
<tr><td>Github</td><td>https://github.com/zeromq/rbzmq</td></tr>
<tr><td>gem</td><td>https://rubygems.org/gems/zmq</td></tr>
<table>

## Installation

```bash
gem install zmq
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