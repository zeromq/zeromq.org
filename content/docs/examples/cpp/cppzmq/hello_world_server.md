---
name: hello_world_server
language: cpp
library: cppzmq
---

```cpp
#include <string>
#include <chrono>
#include <thread>
#include <iostream>

#include <zmq.hpp>

int main() 
{
    using namespace std::chrono_literals;

    // initialize the zmq context with a single IO thread
    zmq::context_t context{1};

    // construct a REP (reply) socket and bind to interface
    zmq::socket_t socket{context, ZMQ_REP};
    socket.bind("tcp://*:5555");

    for (;;) 
    {
        zmq::message_t request;

        // receive a request from client
        socket.recv(request, zmq::recv_flags::none);
        std::cout << "Received Hello" << std::endl;

        // simulate work
        std::this_thread::sleep_for(1s);

        // construct a reply message
        zmq::message_t reply{5};
        memcpy(reply.data(), "World", 5);

        // send the reply to the client
        socket.send(reply, zmq::send_flags::none);
    }

    return 0;
}
```