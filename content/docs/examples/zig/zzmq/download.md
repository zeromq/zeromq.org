---
# THIS FILE IS 100% GENERATED. If you edit this file, you will lose  your
# changes at the next build cycle. DO NOT MAKE ANY CHANGES YOU WISH TO KEEP.
name: download
language: zig
library: zzmq
---

### Adding to build process

Determine the specific [release tag](https://github.com/nine-lives-later/zzmq/tags) of the library to use in the project.

Add to the `build.zig.zon` file, e.g. for Zig 0.11:

```zig
.{
    .dependencies = .{
        .zzmq = .{
            .url = "https://github.com/nine-lives-later/zzmq/archive/refs/tags/v0.1.0-zig0.11.tar.gz",
            .hash = "122080e22e9823dc0a4567c71553c4884978a33877c9b3d46f4594ca5f299d534f9b",
        },
    },
}
```

Note: Should the hash be wrong, remove the `.hash` field and the compiler error will show the correct value. Starting with Zig 0.12 you can also use `zig fetch zzmq <url>`.

It is also required to add it to the `build.zig` file:

```zig
const zzmq = b.dependency("zzmq", .{
    .target = target,
    .optimize = optimize,
});

// Note: starting with zig 0.12 the function will be 
//       `exe.root_module.addImport` instead of `exe.addModule`
exe.addModule("zzmq", zzmq.module("zzmq"));

exe.linkSystemLibrary("czmq");
exe.linkLibC();
```

### Installing local dependencies

Installing [CZMQ](http://czmq.zeromq.org) development library version 4.0 or higher is also required:

```sh
# Building on Ubuntu, PoP_OS, ZorinOS, etc.
sudo apt install libczmq-dev

# Running on Ubuntu, PoP_OS, ZorinOS, etc.
sudo apt install libczmq
```
