---
title: C++
weight: 2
toc: true
---

## cppzmq

<table>
<tr><td>Github</td><td><a href="https://github.com/zeromq/cppzmq">https://github.com/zeromq/cppzmq</a></td></tr>
</table>

Header-only C++ binding for libzmq.

### Example

```C++
#include <string>
#include <zmq.hpp>
int main()
{
   zmq::context_t ctx;
   zmq::socket_t sock(ctx, zmq::socket_type::push);
   sock.bind("inproc://test");
   const std::string_view m = "Hello, world";
   sock.send(zmq::buffer(m), zmq::send_flags::dontwait);
}
```

## zmqpp

<table>
   <tr><td>Github</td><td><a href="https://github.com/zeromq/zmqpp">https://github.com/zeromq/zmqpp</a></td></tr>
</table>

This C++ binding for 0mq/zmq is a 'high-level' library that hides most of the c-style interface core 0mq provides. It consists of a number of header and source files all residing in the zmq directory, these files are provided under the MPLv2 license (see LICENSE for details).

## azmq

<table>
   <tr><td>Github</td><td><a href="https://github.com/zeromq/azmq">https://github.com/zeromq/azmq</a></td></tr>
</table>

The azmq library provides Boost Asio style bindings for ZeroMQ

### Example

```C++
#include <azmq/socket.hpp>
#include <boost/asio.hpp>
#include <array>

namespace asio = boost::asio;

int main(int argc, char** argv) {
    asio::io_service ios;
    azmq::sub_socket subscriber(ios);
    subscriber.connect("tcp://192.168.55.112:5556");
    subscriber.connect("tcp://192.168.55.201:7721");
    subscriber.set_option(azmq::socket::subscribe("NASDAQ"));

    azmq::pub_socket publisher(ios);
    publisher.bind("ipc://nasdaq-feed");

    std::array<char, 256> buf;
    for (;;) {
        auto size = subscriber.receive(asio::buffer(buf));
        publisher.send(asio::buffer(buf));
    }
    return 0;
}
```

## czmqpp

<table>
   <tr><td>Github</td><td><a href="https://github.com/zeromq/czmqpp">https://github.com/zeromq/czmqpp</a></td></tr>
</table>

C++ wrapper for czmq. Aims to be minimal, simple and consistent.
