# ZeroMQ Website

Website is using [hugo static website engine](https://gohugo.io/) and [netlify](https://www.netlify.com/) for hosting.

You can check it out at https://zeromq.org

## Contribute

### Language Pages

Help is needed with the different langauge pages https://github.com/zeromq/zeromq.org/tree/master/content/languages.

Please pick one of them and provide:

1. Links to github, docs and package manager
2. Download instructions
3. Example

### Documenation Examples

Help is as well needed to translate the examples for different programming
languages and libraries in the documentation.

If you're translating from scratch you the hugo archetype which will create
a stub for each example.

```sh
hugo new --kind examples docs/examples/<your language>/<your framework name>
```

If you're like to add an example copy an exisiting on from
`content/docs/examples/c/libzmq/<example name>.md` to your language's and
librarie's folder.

## Run locally

1. Run `npm install` to install CSS and JavaScript dependencies
2. Run `make serve` to compile the website and start the local server
