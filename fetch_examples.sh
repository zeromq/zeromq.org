#!/usr/bin/env bash

fetch_example() {
    LANG=$1
    LIBRARY=$2
    EXAMPLE=$3
    EXAMPLE_FILE=content/docs/examples/$LANG/$LIBRARY/$EXAMPLE.md
    INPUT_URL=$4
    HEADER=$5

    echo Generating example \'$EXAMPLE\': $EXAMPLE_FILE

    mkdir -p `dirname $EXAMPLE_FILE`

    cat << EOF > $EXAMPLE_FILE
---
# THIS FILE IS 100% GENERATED. If you edit this file, you will lose  your
# changes at the next build cycle. DO NOT MAKE ANY CHANGES YOU WISH TO KEEP.
name: $EXAMPLE
language: $LANG
library: $LIBRARY
---

EOF

    curl -s $INPUT_URL --output input.md

    ./extract_markdown.sh input.md "$EXAMPLE_FILE" "$HEADER"

    rm input.md
}

fetch_example c czmq download https://raw.githubusercontent.com/zeromq/czmq/master/README.md "Install from a package manager"
fetch_example cpp zmqpp download https://raw.githubusercontent.com/zeromq/zmqpp/develop/README.md "Requirements;Installation"
fetch_example cpp azmq download https://raw.githubusercontent.com/zeromq/azmq/master/README.md "Building and installation"
fetch_example csharp netmq download https://raw.githubusercontent.com/zeromq/netmq/master/README.md "Installation"
fetch_example erlang chumak download https://raw.githubusercontent.com/zeromq/chumak/master/README.md "Install"
fetch_example go zmq4 download https://raw.githubusercontent.com/pebbe/zmq4/master/README.md "Requirements;Install"
fetch_example go goczmq download https://raw.githubusercontent.com/zeromq/goczmq/master/README.md "Install"
fetch_example java jeromq download https://raw.githubusercontent.com/zeromq/jeromq/master/README.md "Usage"
fetch_example nodejs zeromqjs download https://raw.githubusercontent.com/zeromq/zeromq.js/master/README.md "Installation"
fetch_example perl perlzmq download https://raw.githubusercontent.com/zeromq/perlzmq/master/README.md "INSTALL"
fetch_example python pyzmq download https://raw.githubusercontent.com/zeromq/pyzmq/master/README.md "Downloading;Building and installation"
fetch_example rust rust-zmq download https://raw.githubusercontent.com/erickt/rust-zmq/master/README.md "Installation"
