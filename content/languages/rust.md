---
title: Rust
weight: 4
---

| Github   | https://github.com/erickt/rust-zmq                      |
|----------|---------------------------------------------------------|
| Crate    | https://docs.rs/crate/zmq                               |
| Examples | [https://github.com/erickt/rust-zmq/tree/master/examples](https://github.com/zeromq/zmq.rs/tree/master/examples) |

## Installation

Add the following Cargo.toml file:

```toml
[dependencies]
zeromq = { version = "0.3.5", features = ["tcp-transport"] }
```

