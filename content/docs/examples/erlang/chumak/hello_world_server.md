---
name: hello_world_server
language: erlang
library: chumak
---

```erlang
-module(hello_world_server).
-export([main/0]).

main() ->
    application:start(chumak),
    {ok, Socket} = chumak:socket(rep, "hello world server"),

    {ok, _BindPid} = chumak:bind(Socket, tcp, "localhost", 5555),
    loop(Socket).

loop(Socket) ->
    Reply = chumak:recv(Socket),
    io:format("Question: ~p\n", [Reply]),
    chumak:send(Socket, <<"Hello Friend">>),
    loop(Socket).
```