---
# THIS FILE IS 100% GENERATED. If you edit this file, you will lose  your
# changes at the next build cycle. DO NOT MAKE ANY CHANGES YOU WISH TO KEEP.
name: download
language: python
library: pyzmq
---

## Downloading

Unless you specifically want to develop PyZMQ, we recommend downloading
the PyZMQ source code or wheels from
[PyPI](https://pypi.io/project/pyzmq),
or install with conda.

You can also get the latest source code from our GitHub repository, but
building from the repository will require that you install recent Cython.

## Building and installation

For more detail on building pyzmq, see [our Wiki](https://github.com/zeromq/pyzmq/wiki/Building-and-Installing-PyZMQ).

We build wheels for OS X, Windows, and Linux, so you can get a binary on those platforms with:

pip install pyzmq

but compiling from source with `pip install pyzmq` should work in most environments.
Especially on OS X, make sure you are using the latest pip (≥ 8), or it may not find the right wheels.

If the wheel doesn't work for some reason, or you want to force pyzmq to be compiled
(this is often preferable if you already have libzmq installed and configured the way you want it),
you can force installation with:

pip install --no-binary=:all: pyzmq

When compiling pyzmq (e.g. installing with pip on Linux),
it is generally recommended that zeromq be installed separately,
via homebrew, apt, yum, etc:

# Debian-based
sudo apt-get install libzmq3-dev

# RHEL-based
sudo yum install libzmq3-devel

If this is not available, pyzmq will *try* to build libzmq as a Python Extension,
though this is not guaranteed to work.

Building pyzmq from the git repo (including release tags on GitHub) requires Cython.

