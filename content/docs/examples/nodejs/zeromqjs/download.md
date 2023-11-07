---
# THIS FILE IS 100% GENERATED. If you edit this file, you will lose  your
# changes at the next build cycle. DO NOT MAKE ANY CHANGES YOU WISH TO KEEP.
name: download
language: nodejs
library: zeromqjs
---

## Installation

Install **ZeroMQ.js** with prebuilt binaries:

```sh
npm install zeromq@6.0.0-beta.17
```

Requirements for using prebuilt binaries:

* Node.js 10.2+ or Electron 3+ (requires a [N-API](https://nodejs.org/api/n-api.html) version 3+)


### Prebuilt binaries

The following platforms have a **prebuilt binary** available:

* Linux on x86-64 with libstdc++.so.6.0.21+ (glibc++ 3.4.21+), for example:
* Debian 9+ (Stretch or later)
* Ubuntu 16.04+ (Xenial or later)
* CentOS 8+
* Linux on x86-64 with musl, for example:
* Alpine 3.3+
* MacOS 10.9+ on x86-64
* Windows on x86/x86-64

If a prebuilt binary is not available for your platform, installing will attempt to start a build from source.

### Building from source

If a prebuilt binary is unavailable or if you want to pass certain options during build, you can build this package from source.

Make sure you have the following installed before attempting to build from source:

* Node.js 10+ or Electron 3+
* A working C++17 compiler toolchain with make
* Python 3 with Node 12.13+ (or legacy Python 2.7)
* CMake 2.8+
* curl

To install from source:

```sh
npm install zeromq@6.0.0-beta.17 --build-from-source
```

If you want to link against a shared ZeroMQ library, you can build skip downloading `libzmq` and link with the
installed library instead as follows:

```sh
npm install zeromq@6.0.0-beta.17 --zmq-shared
```

If you wish to use any DRAFT sockets then it is also necessary to compile the library from source:

```sh
npm install zeromq@6.0.0-beta.17 --zmq-draft
```

