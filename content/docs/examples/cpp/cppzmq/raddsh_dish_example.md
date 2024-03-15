---
name: raddsh_dish_example
language: cpp
library: cppzmq
---

```cpp
#include <cstdlib>
#include <iostream>
#include <zmq.hpp>

int main() {
  // Initialize the zmq context with a single IO thread
  zmq::context_t context{1};

  // Construct a Dish socket and connect to interface
  zmq::socket_t dish{context, zmq::socket_type::dish};
  dish.connect("tcp://localhost:5555");

  // Join message groups
  dish.join("group1");
  dish.join("group2");

  // Receive messages forever
  while (true) {
    std::cout << "Waiting to receive...\n";
    zmq::message_t msg;
    dish.recv(msg, zmq::recv_flags::none);
    std::cout << "Received a message: " << msg.to_string() << "\n";
  }

  return EXIT_SUCCESS;
}
```
