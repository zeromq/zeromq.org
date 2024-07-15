---
title: Get started
description: Get started with zeromq
toc: false
weight: 1
---

ZeroMQ (also spelled ØMQ, 0MQ or ZMQ) is a high-performance asynchronous messaging library, aimed at use in distributed or concurrent applications. It provides a message queue, but unlike message-oriented middleware, a ZeroMQ system can run without a dedicated message broker.

ZeroMQ supports common messaging patterns (pub/sub, request/reply, client/server and others) over a variety of transports (TCP, in-process, inter-process, multicast, WebSocket and more), making inter-process messaging as simple as inter-thread messaging. This keeps your code clear, modular and extremely easy to scale.

ZeroMQ is developed by a large community of contributors. There are third-party bindings for many popular programming languages and native ports for C# and Java.

## The Zero in ZeroMQ

The philosophy of ZeroMQ starts with the zero. The zero is for zero broker
(ZeroMQ is brokerless), zero latency, zero cost (it's free), and zero
administration.

More generally, "zero" refers to the culture of minimalism that permeates the
project. We add power by removing complexity rather than by exposing new
functionality.

## The Guide

[The guide](http://zguide.zeromq.org/page:all) explains how to use ØMQ, covers basic, intermediate and advanced use with 60+ diagrams and 750 examples in 28 languages.

Also available as a [book](https://www.amazon.com/ZeroMQ-Messaging-Applications-Pieter-Hintjens-ebook/dp/B00BT0IELC/ref=sr_1_1?keywords=zeromq&qid=1560178380&s=gateway&sr=8-1) O'Reilly.

## Libzmq - the low level library

[Libzmq (https://github.com/zeromq/libzmq)](https://github.com/zeromq/libzmq) is the low-level library behind most of the different language bindings.
Libzmq expose [C-API](https://libzmq.readthedocs.io/) and implemented in C++.
You will rarely use libzmq directly, however if you want to contribute to the project or learn the internals of zeromq, that is the place to start.

## Pick your language
english
>}}

## Pick your library

{{< libraries >}}

## First example

So let's start with some code, the "Hello world" example (of course).

{{< example hello_world_server >}}

The server creates a socket of type response (you will read more about
[request-response]({{< relref "#request-reply-pattern" >}}) later), binds it to
port 5555 and then waits for messages. You can also see that we have zero
configuration, we are just sending strings.

{{< example hello_world_client >}}

The client creates a socket of type request, connects and starts sending
messages.

Both the `send` and `receive` methods are blocking (by default). For the receive
it is simple: if there are no messages the method will block. For sending it is
more complicated and depends on the socket type. For request sockets, if the
high watermark is reached or no peer is connected the method will block.
