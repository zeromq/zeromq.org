---
# THIS FILE IS 100% GENERATED. If you edit this file, you will lose  your
# changes at the next build cycle. DO NOT MAKE ANY CHANGES YOU WISH TO KEEP.
name: download
language: go
library: goczmq
---

## Install
### Dependencies
* [libsodium](https://github.com/jedisct1/libsodium)
* [libzmq](https://github.com/zeromq/libzmq)
* [czmq](https://github.com/zeromq/czmq)

### For CZMQ master
```
go get github.com/zeromq/goczmq
```
#### A Note on Build Tags
The CZMQ library includes experimental classes that are not built by default, but can be built
by passing `--enable-drafts` to configure. Support for these draft classes are being added
to goczmq. To build these features against a CZMQ that has been compiled with `--enable-drafts`,
use `go build -tags draft`.

### For CMZQ = 4.2
```
go get gopkg.in/zeromq/goczmq.v4
```
**Note**: [CZMQ 4.2](https://github.com/zeromq/czmq/releases) is has not been released yet.

### For CZMQ Before 4.0
```
go get gopkg.in/zeromq/goczmq.v1
```
