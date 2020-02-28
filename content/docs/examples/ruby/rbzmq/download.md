---
name: download
language: ruby
library: rbzmq
---

## Installation

[Install libzmq](https://github.com/zeromq/libzmq).

```bash
gem install zmq
```

If the gem installation complains that it cannot find libzmq or headers, simply pass the location of your libzmq installation to the gem install command:

```bash
gem install zmq -- --with-zmq-dir=/opt/local
```

On Windows add a parameter for the libs. For example:

```bash
gem install zmq -- --with-zmq-dir=c:/src/zeromq-4.3.2 --with-zmq-lib=c:/src/zeromq-4.3.2/src/.libs
```

