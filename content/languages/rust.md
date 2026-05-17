---
title: Rust
weight: 3
toc: true
---

## OMQ - pure Rust, wire-compatible with libzmq

Pure Rust ZeroMQ implementation. Two async backends (compio with io_uring, tokio), all socket types, compression transports (lz4+tcp://, zstd+tcp://), and CURVE/PLAIN/BLAKE3ZMQ mechanisms. Faster than libzmq at all message sizes.

| Github   | https://github.com/paddor/omq.rs                        |
|----------|---------------------------------------------------------|
| Crate    | https://crates.io/crates/omq                            |

Also provides:
- [`omq-zeromq`](https://crates.io/crates/omq-zeromq): drop-in replacement for the `zeromq` crate
- [`omq-zmq`](https://crates.io/crates/omq-zmq): libzmq-compatible C interface (`libomq_zmq.so`)
- [`pyomq`](https://pypi.org/project/pyomq/): drop-in pyzmq replacement (2-3x faster)

### Installation

#### Via cargo add:
```bash
cargo add omq
```

#### Via Cargo.toml file:
```toml
[dependencies]
omq = "0.5"
```

## Zmq - bindings for the libzmq

| Github   | https://github.com/erickt/rust-zmq                      |
|----------|---------------------------------------------------------|
| Crate    | https://docs.rs/crate/zmq                               |
| Examples | https://github.com/erickt/rust-zmq/tree/master/examples |

### Installation

#### Via cargo add:
```bash
cargo add zmq
```

#### Via Cargo.toml file:
```toml
[dependencies]
zmq = "0.10.5"
```

## Zeromq - rust native WIP
**WARN**: not ready for production atm, check [README](https://github.com/zeromq/zmq.rs?tab=readme-ov-file#zmqrs---a-native-rust-implementation-of-zeromq)

| Github   | https://github.com/zeromq/zmq.rs                        |
|----------|---------------------------------------------------------|
| Crate    | https://crates.io/crates/zeromq                         |
| Examples | https://github.com/zeromq/zmq.rs/tree/master/examples   |

### Installation

#### Via cargo add:
```bash
cargo add zeromq
```

#### Via Cargo.toml file:
```toml
[dependencies]
zeromq = "0.3.5"
```
