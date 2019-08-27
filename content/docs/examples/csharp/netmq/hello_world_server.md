---
name: hello_world_server
language: csharp
library: NetMQ
---

```csharp
using System;
using System.Threading;
using NetMQ;
using NetMQ.Sockets;

static class Program
{
    public static void Main()
    {        
        using (var responder = new ResponseSocket())
        {
            responder.Bind("tcp://*:5555");

            while (true) 
            {
                string str = responder.ReceiveFrameString();
                Console.WriteLine("Received Hello");
                Thread.Sleep(1000);  //  Do some 'work'
                responder.SendFrame("World");
            }
        }
    }
}
```

