---
title: Erlang
weight: 6
toc: true
---

## erlzmq - lukaszsamson fork

<table>
<tr><td>Github</td><td>http://github.com/lukaszsamson/erlzmq</td></tr>
</table>

Fork of erlzmq2 using dirty NIFs for blocking IO calls and dedicated threads for safely handling sockets.
Compatible with zmq 4.x
Supports macos and *nix
Supports CurveZMQ

## Chumak

<table>
<tr><td>Github</td><td>https://github.com/zeromq/chumak</td></tr>
</table>

Pure Erlang implementation of ZeroMQ Message Transport Protocol.

## ezmq

<table>
<tr><td>Github</td><td>https://github.com/zeromq/ezmq</td></tr>
</table>

ezmq implements the ØMQ protocol in 100% pure Erlang.

## erlang-czmq

<table>
<tr><td>Github</td><td>https://github.com/gar1t/erlang-czmq</td></tr>
</table>


erlang-czmq is an Erlang port wrote on top of czmq. The API mirrors that of CZMQ with all functions being available through the czmqmodule.

## erlzmq2

<table>
<tr><td>Github</td><td>http://github.com/zeromq/erlzmq2</td></tr>
<tr><td>Docs</td><td>http://zeromq.github.com/erlzmq2</td></tr>
</table>

erlzmq2 is NIF based binding.
Not maintained
Warning: unstable (leaks file descriptors, memory, threads, has race conditions, can deadlock beam and crashes due to accessing zmq sockets from multiple beam threads)

## erlzmq2 - esl fork

<table>
<tr><td>Github</td><td>http://github.com/esl/erlzmq</td></tr>
</table>

Fork of erlzmq2 published on hex.pm.
Compatible with zmq 4.x
Supports macos and *nix
Warning: unstable (leaks file descriptors, memory, threads, has race conditions, can deadlock beam and crashes due to accessing zmq sockets from multiple beam threads)

## erlzmq

<table>
<tr><td>Github</td><td>http://github.com/zeromq/erlzmq</td></tr>
</table>

erlzmq is port based binding. Compatible with zmq 2.x
Not maintained
