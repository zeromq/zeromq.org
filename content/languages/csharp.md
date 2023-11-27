---
title: C#
weight: 3
---

Two options are available for C# developers, [NetMQ](https://github.com/zeromq/netmq), a port of zeromq to C#, or [clrzmq4](https://github.com/zeromq/clrzmq4), C# binding for libzmq.

NetMQ is the recommended option, which has implemented curve encryption (https://github.com/zeromq/netmq/blob/master/src/NetMQ.Tests/CurveTests.cs).

## NetMQ

| Github | https://github.com/zeromq/netmq         |
|--------|-----------------------------------------|
| Docs   | https://netmq.readthedocs.io/en/latest/ |
| Nuget  | https://www.nuget.org/packages/NetMQ    |


### Request-Response

Client:
```csharp
using (var client = new RequestSocket())
{
    client.Connect("tcp://127.0.0.1:5556");
    client.SendFrame("Hello");
    var msg = client.ReceiveFrameString();
    Console.WriteLine("From Server: {0}", msg);
}
```

Server:
```csharp
using (var server = new ResponseSocket())
{
    server.Bind("tcp://*:5556");
    string msg = server.ReceiveFrameString();
    Console.WriteLine("From Client: {0}", msg);
    server.SendFrame("World");
}
```

### Pub-Sub

Subscriber:
```csharp
using (var subscriber = new SubscriberSocket())
{
    subscriber.Connect("tcp://127.0.0.1:5556");
    subscriber.Subscribe("A");

    while (true)
    {
        var topic = subscriber.ReceiveFrameString();
        var msg = subscriber.ReceiveFrameString();
        Console.WriteLine("From Publisher: {0} {1}", topic, msg);
    }
}
```

Publisher:
```csharp
using (var publisher = new PublisherSocket())
{
    publisher.Bind("tcp://*:5556");

    int i = 0;

    while (true)
    {
        publisher
            .SendMoreFrame("A") // Topic
            .SendFrame(i.ToString()); // Message

        i++;
        Thread.Sleep(1000);
    }
}
```

## clrzmq4

| Github | https://github.com/zeromq/clrzmq4       |
|--------|-----------------------------------------|
| Nuget  | https://www.nuget.org/packages/ZeroMQ/  |

Package include libzmq for Windows, for OSX and Linux you need to [install libzmq]({{< relref "/docs/download" >}}).

