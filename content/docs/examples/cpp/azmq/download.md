---
# THIS FILE IS 100% GENERATED. If you edit this file, you will lose  your
# changes at the next build cycle. DO NOT MAKE ANY CHANGES YOU WISH TO KEEP.
name: download
language: cpp
library: azmq
---

## Building and installation

Building requires a recent version of CMake (2.8.12 or later for Visual Studio, 2.8 or later for the rest), and a C++ compiler
which supports C++11. Currently this has been tested with -
* Xcode 5.1 on OS X 10.8
* Xcode 6 on OS X 10.9
* Xcode 6.4 on OS X 10.10
* Xcode 7.1 on OS X 10.11
* GCC 4.8 + Boost 1.48 on CentOS 6
* GCC 4.8 + Boost 1.53 on CentOS 7
* GCC 4.8 on Arch Linux and Ubuntu
* GCC 4.8 on Ubuntu
* GCC 5.3 + Boost 1.60 on Ubuntu
* Microsoft Visual Studio 2013 on Windows Server 2008 R2

Library dependencies are -
* Boost 1.48 or later
* ZeroMQ 4.0.x

Tests and example code require -
* Boost 1.54 or later

To build on Linux / OS X -
```
$ mkdir build && cd build
$ cmake ..
$ make
$ make test
$ make install
```

To build on Windows -
```
> mkdir build
> cd build
> cmake ..
> cmake --build . --config Release
> ctest . -C Release
```
You can also open Visual Studio solution from `build` directory after invoking CMake.

To change the default install location use `-DCMAKE_INSTALL_PREFIX` when invoking CMake.

To change where the build looks for Boost and ZeroMQ use `-DBOOST_ROOT=<my custom Boost install>` and `-DZMQ_ROOT=<my custom ZeroMQ install>` when invoking CMake. Or set `BOOST_ROOT` and `ZMQ_ROOT` environment variables.

