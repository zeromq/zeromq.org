---
title: Socket API
weight: 4
toc: true
draft: true
---

Sockets are the de facto standard API for network programming. That's why ZeroMQ
presents a familiar socket-based API. One things that make ZeroMQ especially
tasty to developers is that it uses different socket types to implement any
arbitrary messaging pattern. Furthermore ZeroMQ sockets provide a clean
abstraction over the underlying network protocol which hides the complexity of
those protocols and makes switching between them very easy.


## Key differences to conventional sockets

Generally speaking, conventional sockets present a synchronous interface to
either connection-oriented reliable byte streams (SOCK_STREAM), or
connection-less unreliable datagrams (SOCK_DGRAM). In comparison, ZeroMQ sockets
present an abstraction of an asynchronous message queue, with the exact queueing
semantics depending on the socket type in use. Where conventional sockets
transfer streams of bytes or discrete datagrams, ZeroMQ sockets transfer
discrete messages.

ZeroMQ sockets being asynchronous means that the timings of the physical
connection setup and tear down, reconnect and effective delivery are transparent
to the user and organized by ZeroMQ itself. Further, messages may be queued in
the event that a peer is unavailable to receive them.

Conventional sockets allow only strict one-to-one (two peers), many-to-one (many
clients, one server), or in some cases one-to-many (multicast) relationships.
With the exception of PAIR sockets, ZeroMQ sockets may be connected to multiple
endpoints, while simultaneously accepting incoming connections from multiple
endpoints bound to the socket, thus allowing many-to-many relationships.

## Socket lifetime

ZeroMQ sockets have a life in four parts, just like BSD sockets:

* Creating and destroying sockets, which go together to form a karmic circle of
  socket life

* Configuring sockets by setting options on them and checking them if necessary

* Plugging sockets into the network topology by creating ZeroMQ connections to
  and from them.

* Using the sockets to carry data by writing and receiving messages on them.

## First example

So let's start with some code, the "Hello world" example (of course).

{{< example hello_world_server >}}

The server creates a socket of type response (you can read more on the
request-response chapter), binds it to port 5555 and then waits for messages.
You can also see that we have zero configuration, we are just sending strings.

{{< example hello_world_client >}}

The client create a socket of type request, connect and start sending messages.

Both the `send` and `receive` methods are blocking (by default). For the receive
it is simple: if there are no messages the method will block. For sending it is
more complicated and depends on the socket type. For request sockets, if the
high watermark is reached or no peer is connected the method will block.

## Bind vs Connect

With ZeroMQ sockets it doesn't matter how binds and how connects. In the above
you may have noticed that the server used Bind while the client used Connect.
Why is this, and what is the difference?

ZeroMQ creates queues per underlying connection. If your socket is connected to
three peer sockets, then there are three messages queues behind the scenes.

With Bind, you allow peers to connect to you, thus you don't know how many peers
there will be in the future and you cannot create the queues in advance.
Instead, queues are created as individual peers connect to the bound socket.

With Connect, ZeroMQ knows that there's going to be at least a single peer and
thus it can create a single queue immediately. This applies to all socket types
except ROUTER, where queues are only created after the peer we connect to has
acknowledge our connection.

Consequently, when sending a message to bound socket with no peers, or a ROUTER
with no live connections, there's no queue to store the message to.

### When should I use bind and when connect?

As a general rule use bind from the most stable points in your architecture, and
use connect from dynamic components with volatile endpoints. For request/reply,
the service provider might be point where you bind and the client uses connect.
Just like plain old TCP.

If you can't figure out which parts are more stable (i.e. peer-to-peer),
consider a stable device in the middle, which all sides can connect to.

You can read more about this at the [ZeroMQ
FAQ](http://wiki.zeromq.org/area:faq) under the "Why do I see different behavior
when I bind a socket versus connect a socket?" section.

## High-Water-Mark

The high water mark is a hard limit on the maximum number of outstanding
messages ZeroMQ is queuing in memory for any single peer that the specified
socket is communicating with.

If this limit has been reached the socket enters an exceptional state and
depending on the socket type, ZeroMQ will take appropriate action such as
blocking or dropping sent messages. Refer to the individual socket descriptions
below for details on the exact action taken for each socket type.

## Messaging Patterns

Underneath the brown paper wrapping of ZeroMQ's socket API lies the world of
messaging patterns. ZeroMQ patterns are implemented by pairs of sockets with
matching types.

The built-in core ZeroMQ patterns are:

* **Request-reply**, which connects a set of clients to a set of services. This
  is a remote procedure call and task distribution pattern.

* **Pub-sub**, which connects a set of publishers to a set of subscribers. This
  is a data distribution pattern.

* **Pipeline**, which connects nodes in a fan-out/fan-in pattern that can have
  multiple steps and loops. This is a parallel task distribution and collection
  pattern.

* **Exclusive pair**, which connects two sockets exclusively. This is a pattern
  for connecting two threads in a process, not to be confused with "normal"
  pairs of sockets.

There are more ZeroMQ patterns that are still in draft state:

* **Client-server**, which allows a single ZeroMQ *server* talk to one or more
  ZeroMQ *clients*. The client always starts the conversation, after which
  either peer can send messages asynchronously, to the other.

* **Radio-dish**, which used for one-to-many distribution of data from a single
  publisher to multiple subscribers in a fan out fashion.

### Request-reply pattern

The request-reply pattern is intended for service-oriented architectures of
various kinds. It comes in two basic flavors: synchronous (`REQ` and `REP`
socket types), and asynchronous socket types (`DEALER` and `ROUTER` socket
types), which may be mixed in various ways.

The request-reply pattern is formally defined by RFC
[28/REQREP](http://rfc.zeromq.org/spec:28).

#### REQ socket

A `REQ` socket is used by a client to send requests to and receive replies from
a service. This socket type allows only an alternating sequence of *sends* and
subsequent *receive* calls. A `REQ` socket maybe connected to any number of
`REP` or `ROUTER` sockets. Each request sent is round-robined among all
connected services, and each reply received is matched with the last issued
request. It is designed for simple request-reply models where reliability
against failing peers is not an issue.

If no services are available, then any send operation on the socket will block
until at least one service becomes available. The `REQ` socket will not discard
any messages.

**Summary of characteristics:**

|                           |                                 |
|---------------------------|---------------------------------|
| Compatible peer sockets   | `REP`, `ROUTER`                 |
| Direction                 | Bidirectional                   |
| Send/receive pattern      | Send, Receive, Send, Receive, … |
| Outgoing routing strategy | Round-robin                     |
| Incoming routing strategy | Last peer                       |
| Action in mute state      | Block                           |

#### REP socket

A `REP` socket is used by a service to receive requests from and send replies
to a client. This socket type allows only an alternating sequence of *receive*
and subsequent *send* calls. Each request received is fair-queued from among
all clients, and each reply sent is routed to the client that issued the last
request. If the original requester does not exist any more the reply is
silently discarded.

**Summary of characteristics:**

|                           |                                |
|---------------------------|--------------------------------|
| Compatible peer sockets   | `REQ`, `DEALER`                |
| Direction                 | Bidirectional                  |
| Send/receive pattern      | Receive, Send, Receive, Send … |
| Outgoing routing strategy | Fair-robin                     |
| Incoming routing strategy | Last peer                      |

#### DEALER socket

The `DEALER` socket type talks to a set of anonymous peers, sending and
receiving messages using round-robin algorithms. It is reliable, insofar as it
does not drop messages. `DEALER` works as an asynchronous replacement for
`REQ`, for clients that talk to `REP` or `ROUTER` servers. Message received by
a `DEALER` are fair-queued from all connected peers.

When a `DEALER` socket enters the mute state due to having reached the high
water mark for all peers, or if there are no peers at all, then any *send*
operation on the socket will block until the mute state ends or at least one
peer becomes available for sending; messages are not discarded.

When a `DEALER` socket is connected to a `REP` socket message sent must contain
an empty frame as first part of the message (the delimiter), followed by one or
more body parts.

**Summary of characteristics:**

|                           |                           |
|---------------------------|---------------------------|
| Compatible peer sockets   | `ROUTER`, `REP`, `DEALER` |
| Direction                 | Bidirectional             |
| Send/receive pattern      | Unrestricted              |
| Outgoing routing strategy | Round-robin               |
| Incoming routing strategy | Fair-queued               |
| Action in mute state      | Block                     |

#### ROUTER socket

The `ROUTER` socket type talks to a set of peers, using explicit addressing so
that each outgoing message is sent to a specific peer connection. `ROUTER`
works as an asynchronous replacement for `REP`, and is often used as the basis
for servers that talk to `DEALER` clients.

When receiving messages a `ROUTER` socket will prepend a message part
containing the routing id of the originating peer to the message before passing
it to the application. Messages received are fair-queued from among all
connected peers. When sending messages a `ROUTER` socket will remove the first
part of the message and use it to determine the *routing id* of the peer the
message shall be routed to. If the peer does not exist anymore, or has never
existed, the message shall be silently discarded.

When a `ROUTER` socket enters the mute state due to having reached the high
water mark for all peers, then any messages sent to the socket will be dropped
until the mute state ends. Likewise, any messages routed to a peer for which
the individual high water mark has been reached will also be dropped.

When a `REQ` socket is connected to a `ROUTER` socket, in addition to the
*routing id* of the originating peer each message received shall contain an
empty delimiter message part. Hence, the entire structure of each received
message as seen by the application becomes: one or more routing id parts,
delimiter part, one or more body parts. When sending replies to a `REQ`
socket the application must include the delimiter part.

**Summary of characteristics:**

|                           |                          |
|---------------------------|--------------------------|
| Compatible peer sockets   |`DEALER`, `REQ`, `ROUTER` |
| Direction                 | Bidirectional            |
| Send/receive pattern      | Unrestricted             |
| Outgoing routing strategy | See text                 |
| Incoming routing strategy | Fair-queued              |
| Action in mute state      | Drop (see text)          |

### Publish-subscribe pattern

The publish-subscribe pattern is used for one-to-many distribution of data from
a single publisher to multiple subscribers in a fan out fashion.

The publish-subscribe pattern is formally defined by RFC
[29/PUBSUB](http://rfc.zeromq.org/spec:29).

ZeroMQ comes with support for Pub/Sub by way of four socket types:

* `PUB` Socket Type
* `XPUB` Socket Type
* `SUB` Socket Type
* `XSUB` Socket Type

#### Topics

ZeroMQ uses multipart messages to convey topic information. Topics are expressed
as an array of bytes, though you may use a string and with suitable text
encoding.

A publisher must include the topic in the message's' first frame, prior to the
message payload. For example, to publish a status message to subscribers of the
status topic:

{{< example pubsub_topics_pub >}}

Subscribers specify which topics they are interested in via the Subscribe method
of SubscriberSocket:

{{< example pubsub_topics_sub >}}

A message's topic is compared against subscribers' subscription topics using a
prefix check.

That is, a subscriber who subscribed to `topic` would receive messages with topics:

* `topic`
* `topic/subtopic`
* `topical`

However it would not receive messages with topics:

* `topi`
* `TOPIC` (remember, it's a byte-wise comparison)

A consequence of this prefix matching behaviour is that you can receive all
published messages by subscribing with an empty topic string.

#### PUB socket

A `PUB` socket is used by a publisher to distribute data. Messages sent are
distributed in a fan out fashion to all connected peers. This socket type is
not able to receive any messages.

When a `PUB` socket enters the mute state due to having reached the high water
mark for a subscriber, then any messages that would be sent to the subscriber
in question shall instead be dropped until the mute state ends. The send
function does never block for this socket type.

**Summary of characteristics:**

|                           |                |
|---------------------------|----------------|
| Compatible peer sockets   | `SUB`, `XSUB`  |
| Direction                 | Unidirectional |
| Send/receive pattern      | Send only      |
| Incoming routing strategy | N/A            |
| Outgoing routing strategy | Fan out        |
| Action in mute state      | Drop           |

#### SUB socket

A `SUB` socket is used by a subscriber to subscribe to data distributed by a
publisher. Initially a `SUB` socket is not subscribed to any messages. The
`send` function is not implemented for this socket type.

**Summary of characteristics:**

|                           |                |
|---------------------------|----------------|
| Compatible peer sockets   | `PUB`, `XPUB`  |
| Direction                 | Unidirectional |
| Send/receive pattern      | Receive only   |
| Incoming routing strategy | Fair-queued    |
| Outgoing routing strategy | N/A            |

#### XPUB socket

Same as `PUB` except that you can receive subscriptions from the peers in form
of incoming messages. Subscription message is a byte 1 (for subscriptions) or
byte 0 (for unsubscriptions) followed by the subscription body. Messages
without a sub/unsub prefix are also received, but have no effect on
subscription status.

**Summary of characteristics:**

|                           |                                      |
|---------------------------|--------------------------------------|
| Compatible peer sockets   | ZMQ_SUB, ZMQ_XSUB                    |
| Direction                 | Unidirectional                       |
| Send/receive pattern      | Send messages, receive subscriptions |
| Incoming routing strategy | N/A                                  |
| Outgoing routing strategy | Fan out                              |
| Action in mute state      | Drop                                 |

#### XSUB socket

Same as `SUB` except that you subscribe by sending subscription messages to the
socket. Subscription message is a byte 1 (for subscriptions) or byte 0 (for
unsubscriptions) followed by the subscription body. Messages without a
sub/unsub prefix may also be sent, but have no effect on subscription status.

**Summary of characteristics:**

|                           |                                      |
|---------------------------|--------------------------------------|
| Compatible peer sockets   | ZMQ_PUB, ZMQ_XPUB                    |
| Direction                 | Unidirectional                       |
| Send/receive pattern      | Receive messages, send subscriptions |
| Incoming routing strategy | Fair-queued                          |
| Outgoing routing strategy | N/A                                  |
| Action in mute state      | Drop                                 |

### Pipeline pattern

The pipeline pattern is used for distributing data to nodes arranged in a
pipeline. Data always flows down the pipeline, and each stage of the pipeline is
connected to at least one node. When a pipeline stage is connected to multiple
nodes data is round-robined among all connected nodes.

The pipeline pattern is formally defined by RFC
[30/PIPELINE](http://rfc.zeromq.org/spec:30).

### Exclusive pair pattern

The exclusive pair pattern is used to connect a peer to precisely one other
peer. This pattern is used for inter-thread communication across the inproc
transport.

The exclusive pair pattern is formally defined by
[31/EXPAIR](http://rfc.zeromq.org/spec:31).

### Client-server pattern

The client-server pattern is used to allow a single `SERVER` server talk to one
or more `CLIENT` clients. The client always starts the conversation, after
which either peer can send messages asynchronously, to the other.

The client-server pattern is formally defined by RFC
[41/CLISRV](http://rfc.zeromq.org/spec:41).

### Radio-dish pattern

The radio-dish pattern is used for one-to-many distribution of data from a
single publisher to multiple subscribers in a fan out fashion.

Radio-dish is using groups (vs Pub-sub topics), Dish sockets can join a group
and each message sent by Radio sockets belong to a group.

Groups are null terminated strings limited to 16 chars length (including null).
The intention is to increase the length to 40 chars (including null). The
encoding of groups shall be UTF8.

Groups are matched using exact matching (vs prefix matching of PubSub).
