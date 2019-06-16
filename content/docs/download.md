---
title: Download
description: Download and install zeromq
weight: 2
---

# Download

Most language bindings require the low-level libzmq library. Follow the instructions to download and install libzmq.
For specific language instructions go to the lanaguage page.

## NetMQ and JeroMQ

NetMQ and JeroMQ are C# and Java pure port of libzmq and therefore don't require libzmq.

Go to [C#]({{< relref "languages/csharp" >}}) and [Java]({{< relref "languages/java" >}}) language pages for more information.

## Windows

### Release 4.3.1

Download and extract one of the followings:

* [Visual Studio 9 2008](https://dl.bintray.com/zeromq/generic/libzmq-v90-4_3_1.zip)
* [Visual Studio 10 2010](https://dl.bintray.com/zeromq/generic/libzmq-v100-4_3_1.zip)
* [Visual Studio 12 2013](https://dl.bintray.com/zeromq/generic/libzmq-v120-4_3_1.zip)
* [Visual Studio 14 2015](https://dl.bintray.com/zeromq/generic/libzmq-v140-4_3_1.zip)
* [Visual Studio 15 2017](https://dl.bintray.com/zeromq/generic/libzmq-v141-4_3_1.zip)
* [Visual Studio 12 2013 x64](https://dl.bintray.com/zeromq/generic/libzmq-v120-x64-4_3_1.zip)
* [Visual Studio 14 2015 x64](https://dl.bintray.com/zeromq/generic/libzmq-v140-x64-4_3_1.zip)
* [Visual Studio 15 2017 x64](https://dl.bintray.com/zeromq/generic/libzmq-v141-x64-4_3_1.zip)

### Release 4.0.4

Download and install of of the followings

* [x64 build for Vista, 7, 8, Windows Server 2008 R2 and newer.](http://miru.hk/archive/ZeroMQ-4.0.4~miru1.0-x64.exe)
* [x86 build for Windows XP SP3 and newer.](http://miru.hk/archive/ZeroMQ-4.0.4~miru1.0-x86.exe)

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

The ZeroMQ maintainers provide pre-built binary packages for libzmq, czmq, zyre, malamute, zproject and zproto, automatically built from both the latest stable releases OR the latest commit in the Git repositories via the Open Build Service, for i386, amd64, armv7, arm64, ppc64, s390x (note: depends on the distribution).

* [latest git, no DRAFT APIs](https://build.opensuse.org/project/show/network:messaging:zeromq:git-stable)
* [latest git, with DRAFT APIs](https://build.opensuse.org/project/show/network:messaging:zeromq:git-draft)
* [latest stable release, no DRAFT APIs](https://build.opensuse.org/project/show/network:messaging:zeromq:release-stable)
* [latest stable release, with DRAFT APIs](https://build.opensuse.org/project/show/network:messaging:zeromq:release-draft)

Add the repository of your choice by clicking on the appropriate distribution and version, and then follow "Go to download repository". That is the URL of the repository. Remember to add the GPG key.

For example, to add Debian 9 and install the development packages for libzmq from the latest stable release without draft APIs:

```bash
echo "deb http://download.opensuse.org/repositories/network:/messaging:/zeromq:/release-stable/Debian_9.0/ ./" >> /etc/apt/sources.list
wget https://download.opensuse.org/repositories/network:/messaging:/zeromq:/release-stable/Debian_9.0/Release.key -O- | sudo apt-key add
apt-get install libzmq3-dev
```