---
name: hello_world_server
language: python
library: pyzmq
---

```haskell
-- This lets us conviniently use efficient ByteString to send and recieve messages
{-# LANGUAGE OverloadedStrings #-}         

{-
   Hello World server in Haskell
   Binds REP socket to tcp://*:5555
   Expects "Hello" from client, replies with "World"
-}

import System.ZMQ4.Monadic (runZMQ, socket, bind, send, receive, Socket, Rep(..))
import Control.Monad (forever)
import Control.Monad.IO.Class (liftIO)
import Control.Concurrent (threadDelay)
import Data.ByteString.Char8 (pack, unpack)

main :: IO ()
main = runZMQ $ do
    repSocket <- socket Rep
    bind repSocket "tcp://*:5555"
    forever $ do
        --  Wait for next request from client
        message <- receive repSocket
        liftIO $ putStrLn ("Received request: " ++ unpack message)

        --  Do some 'work' (waiting for 1 second here)
        liftIO $ threadDelay (1 * 1000000)

        --  Send reply back to client
        send repSocket [] (pack "World")
```
