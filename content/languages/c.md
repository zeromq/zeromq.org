---
title: C
weight: 1
---

# C

Two options are available for C developers, CZMQ or libzmq, the low-level zeromq library.

The recommended binding for C developers is CZMQ, which provides a high-level API for ØMQ, with additional classes such as pollers, thread management, and security helpers.

## CZMQ

<table>
<tr><td>Github</td><td>https://github.com/zeromq/czmq</td></tr>
<tr><td>Docs</td><td>http://czmq.zeromq.org/</td></tr>
<table>

### Install

First [install libzmq]({{< relref "/docs/download" >}}).

#### Ubuntu/Debian/Mint

```bash
apt-get install libczmq-dev
```

#### Fedora

```bash
dnf install czmq-devel
```

#### OSX

```bash
brew install czmq
```

#### Windows

Using vcpkg

```batch
.\vcpkg.exe install czmq
```

this will build czmq as a 32-bit shared library.

```batch
.\vcpkg.exe install czmq:x64-windows-static
```

this will build czmq as a 64-bit static library.

To use the draft APIs, you may build czmq with draft feature:

```batch
.\vcpkg install czmq[draft]
```

### Example

```c
#include <czmq.h>
int main (void)
{
    zsock_t *push = zsock_new_push ("inproc://example");
    zsock_t *pull = zsock_new_pull ("inproc://example");
    zstr_send (push, "Hello, World");

    char *string = zstr_recv (pull);
    puts (string);
    zstr_free (&string);

    zsock_destroy (&pull);
    zsock_destroy (&push);
    return 0;
}
```

## libzmq

<table>
<tr><td>Github</td><td>https://github.com/zeromq/libzmq</td></tr>
<tr><td>Docs</td><td>http://api.zeromq.org/</td></tr>
<table>

### Install

Following the instrunctions on [download page]({{< relref "/docs/download" >}}).

### Example

Server:
```C
#include <zmq.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <assert.h>

int main (void)
{
    //  Socket to talk to clients
    void *context = zmq_ctx_new ();
    void *responder = zmq_socket (context, ZMQ_REP);
    int rc = zmq_bind (responder, "tcp://*:5555");
    assert (rc == 0);

    while (1) {
        char buffer [10];
        zmq_recv (responder, buffer, 10, 0);
        printf ("Received Hello\n");
        sleep (1);          //  Do some 'work'
        zmq_send (responder, "World", 5, 0);
    }
    return 0;
}
```

Client:

```C
#include <zmq.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

int main (void)
{
    printf ("Connecting to hello world server…\n");
    void *context = zmq_ctx_new ();
    void *requester = zmq_socket (context, ZMQ_REQ);
    zmq_connect (requester, "tcp://localhost:5555");

    int request_nbr;
    for (request_nbr = 0; request_nbr != 10; request_nbr++) {
        char buffer [10];
        printf ("Sending Hello %d…\n", request_nbr);
        zmq_send (requester, "Hello", 5, 0);
        zmq_recv (requester, buffer, 10, 0);
        printf ("Received World %d\n", request_nbr);
    }
    zmq_close (requester);
    zmq_ctx_destroy (context);
    return 0;
}
```