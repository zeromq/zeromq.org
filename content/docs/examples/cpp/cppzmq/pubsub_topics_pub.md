---
name: pubsub_topics_pub
language: cpp
library: cppzmq
---

```cpp
//  Send a message on the 'status' topic
#include <string>
#include <iostream>

#include <zmq.hpp>

int main()
{
    // initialize the zmq context with a single IO thread
    zmq::context_t context{1};

    // construct a PUB (publisher) socket and connect to interface
    zmq::socket_t publisher{context, zmq::socket_type::pub};
    publisher.bind("tcp://*:5555");

    while(true){
        //  Write three messages, each with an envelope and content
        publisher.send(zmq::str_buffer("status"), zmq::send_flags::none);
        publisher.send(zmq::str_buffer("Message in status"));
    }

    return 0;
}
```
