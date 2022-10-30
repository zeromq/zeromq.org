---
name: pubsub_topics_sub
language: cpp
library: cppzmq
---

Subscribers specify which topics they are interested in ...

```cpp
//  Subscribe to the 'status'
#include <string>
#include <iostream>
#include <vector>

#include <zmq.hpp>
#include <zmq_addon.hpp>

int main()
{
    // initialize the zmq context with a single IO thread
    zmq::context_t context{1};

    // construct a SUB (subscriber) socket and connect to interface
    zmq::socket_t subscriber{context, zmq::socket_type::sub};
    subscriber.connect("tcp://localhost:5555");
    
    // set topics you want to sub
    subscriber.set(zmq::sockopt::subscribe, "status");

    while(true){
        // Receive all parts of the message
        std::vector<zmq::message_t> recv_msgs;
        zmq::recv_result_t result =
            zmq::recv_multipart(subscriber, std::back_inserter(recv_msgs));
        assert(result && "recv failed");
        assert(*result == 2);

        std::cout << "Subscriber: [" << recv_msgs[0].to_string() << "] "
                  << recv_msgs[1].to_string() << std::endl;
    }

    return 0;
}
```
