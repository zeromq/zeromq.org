---
title: F#
weight: 5
---

# F\#

Two alternatives are available for F# developers, `fszmq` and `FsNetMQ`. `fszmq` is a binding over libzmq and FsNetMQ is a thin F# wrapper over NetMQ, which is a pure port of libzmq to C#.


## FsNetMQ

<table>
<tr><td>Github</td><td>https://github.com/NetMQ/FsNetMQ</td></tr>
<tr><td>Nuget</td><td>https://www.nuget.org/packages/FsNetMQ/</td></tr>
<table>

### Example

```fsharp
use router = Socket.router ()
router.bind socket "tcp://*:6566"

use dealer = Socket.dealer ()
Socket.connect socket "tcp://127.0.0.1:6566"

Frame.send dealer "Hello"B

let frame,more = Frame.recv router
```

### Using a poller for multiple sockets

Poller is using IObservable, so when ever you add a socket to the poller you get an observable which you can subscribe to be notified of new messages.

```fsharp
use poller = Poller.create ()
use dealer = Socket.dealer ()
use subscriber = Socker.sub ()

// Connecting and subscribing...

let dealerObservable =
  Poller.addSocket poller dealer
  |> Observable.map Frame.recv

let subObservable =
  Poller.addSocket poller subscriber
  |> Observable.map Frame.recv

use observer =
  Observable.merge dealerObservable subObservable
  |> Observable.subscribe (fun msg -> printfn "%A" msg)

Poller.run poller
```

### Actor
Actor is a thread with socket attached to it, so you are able to send it messages and request cancellation. Together with Poller it is a powerful concept.

```fsharp
// Actor is disposable, so whenever you call dispose
// on the actor the end message will be sent and the thread will exit
let actor =
  Actor.create (fun shim ->
    use poller = Poller.create ()

    // Registering for the end message which will cancel the actor
    use emObserver = Poller.registerEndMessage poller shim

    // Creating sockets and adding them to the poller
    ...

    // Signalling that the actor is ready, this will let the Actor.create function to return
    Actor.signal shim

    Poller.run poller
```

## fszmq

<table>
<tr><td>Github</td><td>https://github.com/zeromq/fszmq</td></tr>
<tr><td>Website</td><td>http://zeromq.github.io/fszmq/</td></tr>
<tr><td>Docs</td><td>http://zeromq.github.io/fszmq/reference/index.html</td></tr>
<tr><td>Nuget</td><td>https://www.nuget.org/packages/FsNetMQ/</td></tr>
<table>

### Pre-requisites

You need to install libzmq, follow the instrunctions on the [download page]({{< relref "/docs/download" >}}).

### Example

```fsharp
open fszmq
open fszmq.Context
open fszmq.Socket

let server () =
  // create a ZMQ context
  use context = new Context()

  // create reply socket
  use server  = rep context
  // begin receiving connections
  bind server "tcp://*:5555"

  let rec loop () =
    // process request (i.e. 'recv' a message from our 'server')
    // NOTE: it's convenient to 'decode' the (binary) message into a string
    match server |> recv |> decode with
    | "hello"   ->  // valid request; send a reply back
                    // NOTE: "..."B is short-hand for a byte array of ASCII-encoded chars
                    "world"B |>> server
                    // wait for next request
                    loop()
    | _         ->  // invalid request; stop receiving connections
                    "goodbye"B |>> server

  // wait for next request
  loop ()

let client () =
  // create a ZMQ context
  use context = new Context()

  // create a request socket
  use client  = req context
  // connect to the server
  "tcp://localhost:5555" |> connect client

  for i in 1 .. 10 do
    // 'send' a request to the server
    let request = if i = 10 then "goodbye" else "hello"
    // NOTE: we need to 'encode' a string to binary (before transmission)
    request |> encode |> send client
    printfn "(%i) sent: %s" i request
    // receive and print a reply from the server
    let reply = (recv >> decode) client
    printfn "(%i) got: %s" i reply
```
