import signal
import time
import zmq


signal.signal(signal.SIGINT, signal.SIG_DFL)

context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind('tcp://*:5555')

for i in range(10):
    message = bytes(f'Broadcasting message {i}', 'utf-8')
    print(message)
    socket.send(message)
    time.sleep(1)
