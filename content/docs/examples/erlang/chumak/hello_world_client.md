---
name: hello_world_client
language: erlang
library: chumak
---

```erlang
-module(hello_world_client).
-export([main/0]).

main() ->
    application:start(chumak),
    {ok, Socket} = chumak:socket(req, "hello world client"),

    {ok, Pid} = chumak:connect(Socket, tcp, "localhost", 5555),

    send_messages(Socket, 10).

send_messages(Socket, 0) ->
    ok;

send_messages(Socket, N) ->
    io:format("Sending Hello ~p\n...", [N]),
    ok = chumak:send(Socket, <<"Hello">>),

    {ok, RecvMessage} = chumak:recv(Socket),
    io:format("Received: ~p\n", [RecvMessage]),

    send_messages(Socket, N-1).
```