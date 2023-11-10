---
# THIS FILE IS 100% GENERATED. If you edit this file, you will lose  your
# changes at the next build cycle. DO NOT MAKE ANY CHANGES YOU WISH TO KEEP.
name: download
language: go
library: zmq4
---

## Requirements

zmq4 is just a wrapper for the ZeroMQ library. It doesn't include the
library itself. So you need to have ZeroMQ installed, including its
development files. On Linux and Darwin you can check this with (`$` is
the command prompt):

```
$ pkg-config --modversion libzmq
4.3.1
```

The Go compiler must be able to compile C code. You can check this
with:
```
$ go env CGO_ENABLED
1
```

You can't do cross-compilation. That would disable C.

### Windows

Build with `CGO_CFLAGS` and `CGO_LDFLAGS` environment variables, for example:

```
$env:CGO_CFLAGS='-ID:/dev/vcpkg/installed/x64-windows/include'
$env:CGO_LDFLAGS='-LD:/dev/vcpkg/installed/x64-windows/lib -l:libzmq-mt-4_3_4.lib'
```
> Deploy result program with `libzmq-mt-4_3_4.dll`

## Install

go get github.com/pebbe/zmq4

