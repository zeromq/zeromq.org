---
name: hello_world_client
language: cpp
library: cppzmq
---

```cpp
#include <string>
#include <iostream>

#include <zmq.hpp>

int main()
{
    // initialize the zmq context with a single IO thread
    zmq::context_t context{1};

    // construct a REQ (request) socket and connect to interface
    zmq::socket_t socket{context, ZMQ_REQ};
    socket.connect("tcp://localhost:5555");

    for (auto request_num = 0; request_num < 10; ++request_num) 
    {
        // initialize a request message
        zmq::message_t request{5};
        memcpy(request.data(), "Hello", 5);
        
        // send the request message
        std::cout << "Sending Hello " << request_num << "..." << std::endl;
        socket.send(request, zmq::send_flags::none);
        
        // wait for reply from server
        zmq::message_t reply{};
        socket.recv(reply, zmq::recv_flags::none);
        
        std::cout << "Received World " << request_num << std::endl;
    }

    return 0;
}
```