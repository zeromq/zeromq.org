---
title: Get started
description: Get started with zeromq
weight: 1
---

# Get Started

ZeroMQ (also spelled ØMQ, 0MQ or ZMQ) is a high-performance asynchronous messaging library, aimed at use in distributed or concurrent applications. It provides a message queue, but unlike message-oriented middleware, a ZeroMQ system can run without a dedicated message broker.

ZeroMQ supports common messaging patterns (pub/sub, request/reply, client/server and others) over a variety of transports (TCP, in-process, inter-process, multicast, WebSocket and more), making inter-process messaging as simple as inter-thread messaging. This keeps your code clear, modular and extremely easy to scale.

ZeroMQ is developed by a large community of contributors. There are third-party bindings for many popular programming languages and native ports for C# and Java.

## The Guide

[The guide](http://zguide.zeromq.org/page:all) explains how to use ØMQ, covers basic, intermediate and advanced use with 60+ diagrams and 750 examples in 28 languages.

Also available as a [book](https://www.amazon.com/ZeroMQ-Messaging-Applications-Pieter-Hintjens-ebook/dp/B00BT0IELC/ref=sr_1_1?keywords=zeromq&qid=1560178380&s=gateway&sr=8-1) O'Reilly.

## Libzmq - the low level library

[Libzmq (https://github.com/zeromq/libzmq)](https://github.com/zeromq/libzmq) is the low-level library behind most of the different language bindings.
Libzmq expose [C-API](http://api.zeromq.org) and implemented in C++.
You will rarely use libzmq directly, however if you want to contribute to the project or learn the internals of zeromq, that is the place to start.

## Pick your language

{{< languages >}}
