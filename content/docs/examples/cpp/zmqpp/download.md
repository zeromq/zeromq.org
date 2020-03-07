---
# THIS FILE IS 100% GENERATED. If you edit this file, you will lose  your
# changes at the next build cycle. DO NOT MAKE ANY CHANGES YOU WISH TO KEEP.
name: download
language: cpp
library: zmqpp
---

## Requirements

ZeroMQ 2.2.x or later. We recommend to use ZeroMQ >= 3.
C++11 compliant compiler. (g++ >= 4.7)

The command line client and the tests also require libboost.


## Installation

Installation can be done by the standard make && make install. If the boost
unittest framework is installed, check and installcheck can be run for sanity
checking. To use ZMQ4 security feature install libsodium and libzmq --with-libsodium
as shown below before ZMQPP.

# Build, check, and install libsodium
git clone git://github.com/jedisct1/libsodium.git
cd libsodium
./autogen.sh
./configure && make check
sudo make install
sudo ldconfig
cd ../
# Build, check, and install the latest version of ZeroMQ
git clone git://github.com/zeromq/libzmq.git
cd libzmq
./autogen.sh
./configure --with-libsodium && make
sudo make install
sudo ldconfig
cd ../
# Now install ZMQPP
git clone git://github.com/zeromq/zmqpp.git
cd zmqpp
make
make check
sudo make install
make installcheck

The most commonly useful overrides are setting CXX, to change the compiler
used, and PREFIX to change install location. The CXX prefix should be used on
all targets as the compiler version is used in the build path. PREFIX is only
relevant for the install target.

