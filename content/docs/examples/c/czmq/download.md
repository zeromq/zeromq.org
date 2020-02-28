---
# THIS FILE IS 100% GENERATED. If you edit this file, you will lose  your
# changes at the next build cycle. DO NOT MAKE ANY CHANGES YOU WISH TO KEEP.
name: download
language: c
library: czmq
---

### Install from a package manager

#### Linux

Deb packages are available for [Debian](https://packages.debian.org/search?searchon=sourcenames&keywords=czmq) and [Ubuntu](https://packages.ubuntu.com/search?searchon=sourcenames&keywords=czmq).

For other distros please refer to [pkgs.org](https://pkgs.org/download/czmq).

You can also get prebuild binaries for latest git `master` for most distros on openSUSE's Build Service:

**Git `master` only stable APIs:** http://software.opensuse.org/download.html?project=network%3Amessaging%3Azeromq%3Agit-stable&package=czmq

**Git `master` including draft APIs:** http://software.opensuse.org/download.html?project=network%3Amessaging%3Azeromq%3Agit-draft&package=czmq

#### MacOS

On macOS install czmq with Homebrew see [here](https://formulae.brew.sh/formula/czmq).

#### Windows

**Using vcpkg**

If you are already using [vcpkg](https://github.com/Microsoft/vcpkg/), you can download and install `czmq` with one single command:
```
vcpkg.exe install czmq
```
this will build `czmq` as a 32-bit shared library.
```
vcpkg.exe install czmq:x64-windows-static
```
this will build `czmq` as a 64-bit static library.

You may also build `czmq` with one or more optional libraries:
```
vcpkg.exe install czmq[curl,httpd,lz4]:x64-windows
```
this will build `czmq` with `libcurl`, `libmicrohttpd`, `lz4`, as a 64-bit shared library.

To use the draft APIs, you may build `czmq` with `draft` feature:
```
vcpkg install czmq[draft]
```

If you are an adventurer, and want to always use the lastest version of `czmq`, pass an extra `--head` option:
```
vcpkg.exe install czmq --head
```

These commands will also print out instructions on how to use the library from your MSBuild or CMake-based projects.

