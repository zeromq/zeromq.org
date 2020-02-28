---
# THIS FILE IS 100% GENERATED. If you edit this file, you will lose  your
# changes at the next build cycle. DO NOT MAKE ANY CHANGES YOU WISH TO KEEP.
name: download
language: rust
library: rust-zmq
---

# Installation

rust-zmq is available from [crates.io](https://crates.io). Users
should add this to their `Cargo.toml` file:

```toml
[dependencies]
zmq = "0.9"
```

As rust-zmq is a wrapper around `libzmq`, you need a build of `libzmq`
version 4.1 or newer, before attempting to build the `zmq`
crate. There are several options available:

## Dynamic linking using `pkg-config`

This is probably the preferred method when you are running a recent
Unix-like OS that has support for `pkg-config`. For example, on recent
Debian-based distributions, you can use the following command to get
the prerequiste headers and library installed:

```sh
apt install libzmq3-dev
```

If your OS of choice does not provide packages of a new-enough libzmq,
you can install it from source; see
<https://github.com/zeromq/libzmq/releases>, although in this case,
you may prefer a `vendored` build, which automates that, see below.

The build normally uses `pkg-config` to find out about libzmq's
location. If that is not available, the environment variable
`LIBZMQ_PREFIX` (or alternatively, `LIBZMQ_LIB_DIR` and
`LIBZMQ_INCLUDE_DIR`) can be defined to avoid the invocation of
`pkg-config`.

## Windows build

When building on Windows, using the MSCV toolchain, consider the
following when trying to link dynamically against `libzmq`:

- When building `libzmq` from sources, the library must be renamed
to `zmq.lib` from the auto named `libzmq-v***-mt-gd-*_*_*.lib`,
`libzmq.lib`, `libzmq-mt-*_*_*.lib`, etc.
- The folder containing the `*.dll` (dynamic link library)
referred to by `zmq.lib` must be accessible via the path for
the session that invokes the Rust compiler.
- The name of the `*.dll` in question depends on the build system
used for `libzmq` and can usually be seen when opening `zmq.lib`
in a text editor.

## Vendored build

Starting with the upcoming release `0.9.1` (or when building from
current `master`), you can enable the `vendored` feature flag to have
`libzmq` be built for you and statically linked into your binary
crate. In your `Cargo.toml`, you can give users the option to do so
using a dedicated feature flag:

```toml
[features]
vendored-zmq = ['zmq/vendored']
```

## Cross-compilation

When you have a cross-compiled version of `libzmq` installed, you
should be able to cross-compile rust-zmq, assuming a platform
supporting `pkg-config`. For example, assuming you have `libzmq`
compiled for the `i686-pc-windows-gnu` target installed in
`~/.local-w32`, the following should work:

```sh
PKG_CONFIG_PATH=$HOME/.local-w32/lib/pkgconfig \
PKG_CONFIG_ALLOW_CROSS=1 \
cargo build --target=i686-pc-windows-gnu --verbose
```

Cross compilation without `pkg-config` should work as well, but you
need set `LIBZMQ_PREFIX` as described above.

