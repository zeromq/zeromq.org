---
name: hello_world_server
language: python
library: pyzmq
---

```haskell
-- This lets us conviniently use efficient ByteString to send and recieve messages
{-# LANGUAGE OverloadedStrings #-}

{-
   Hello World client in Haskell
   Connects REQ socket to tcp://localhost:5555
   Sends "Hello" to server, expects "World" back
-}

import System.ZMQ4.Monadic (runZMQ, socket, connect, send, receive, Socket, Req(..))
import Control.Monad (forM_)
import Control.Monad.IO.Class (liftIO)
import Data.ByteString.Char8 (pack, unpack)

main :: IO ()
main = runZMQ $ do
    --  Socket to talk to server
    reqSocket <- socket Req
    connect reqSocket "tcp://localhost:5555"

    --  Do 10 requests, waiting each time for a response
    forM_ [1..10] $ \i -> do
        liftIO $ putStrLn ("Sending request " ++ show i ++ "...")
        send reqSocket [] (pack "Hello")

        --  Get the reply
        message <- receive reqSocket
        liftIO $ putStrLn ("Received reply " ++ show i ++ " [" ++ unpack message ++ "]")
```
