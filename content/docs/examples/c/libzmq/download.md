---
name: download
language: C
library: libzmq
---

## OSX

You need Brew installed and configured https://brew.sh/

```bash
brew install zmq
```

czmq and zyre are also available.

## Linux

### Fedora

```bash
dnf install zeromq-devel
```

### Ubuntu/Debian/Mint

```bash
apt-get install libzmq3-dev
```

### Arch

```bash
pacman -S zeromq
```

### SUSE

```bash
zypper install zeromq-devel
```

### Packages for Debian, Ubuntu, Fedora, CentOS, RHEL, SUSE

The ZeroMQ maintainers provide pre-built binary packages for libzmq, czmq, zyre, malamute, zproject and zproto, automatically built from both the latest stable releases OR the latest commit in the Git repositories via the Open Build Service for i386, amd64, armv7, arm64, ppc64, s390x (note: depends on the distribution).

* [latest git, no DRAFT APIs](https://build.opensuse.org/project/show/network:messaging:zeromq:git-stable)
* [latest git, with DRAFT APIs](https://build.opensuse.org/project/show/network:messaging:zeromq:git-draft)
* [latest stable release, no DRAFT APIs](https://build.opensuse.org/project/show/network:messaging:zeromq:release-stable)
* [latest stable release, with DRAFT APIs](https://build.opensuse.org/project/show/network:messaging:zeromq:release-draft)

Add the repository of your choice by clicking on the distribution and version, and then follow "Go to download repository". That is the URL of the repository. Remember to add the GPG key.

For example, to add Debian 9 and install the development packages for libzmq from the latest stable release without draft APIs:

```bash
echo "deb http://download.opensuse.org/repositories/network:/messaging:/zeromq:/release-stable/Debian_9.0/ ./" >> /etc/apt/sources.list
wget https://download.opensuse.org/repositories/network:/messaging:/zeromq:/release-stable/Debian_9.0/Release.key -O- | sudo apt-key add
apt-get install libzmq3-dev
```
