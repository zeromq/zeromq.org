---
name: raddsh_radio_example
language: cpp
library: cppzmq
---

```cpp
#include <chrono>
#include <cstdlib>
#include <iostream>
#include <string>
#include <thread>
#include <zmq.hpp>

int main() {
  // Initialize the zmq context with a single IO thread
  zmq::context_t context{1};

  // Construct a Radio socket and connect to interface.
  zmq::socket_t radio{context, zmq::socket_type::radio};
  radio.bind("tcp://*:5555");

  // Send messages forever, alternating between 3 groups.
  for (uint32_t i = 1; true; i = (i % 3 == 0) ? 1 : i + 1) {
    std::string group = "group" + std::to_string(i);
    std::string payload = "This is for " + group;
    zmq::message_t msg{payload};
    msg.set_group(group.c_str());
    radio.send(msg, zmq::send_flags::none);
    std::cout << "Sent a message to " << group << "\n";
    std::this_thread::sleep_for(std::chrono::seconds(1));
  }

  return EXIT_SUCCESS;
}
```
