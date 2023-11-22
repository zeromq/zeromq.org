---
title: How to contribute
description: ØMQ Contribution Policy
toc: false
weight: 1
---

## How We Work Together

The ZeroMQ Community uses the [C4.1](http://rfc.zeromq.org/spec:22) process (with some caveats) for its core projects: [libzmq](https://github.com/zeromq/libzmq) and stable releases (zeromq2-x, zeromq3-x, zeromq4-x) as well as surrounding projects like [CZMQ](https://github.com/zeromq/czmq).

Please do take the time to read the C4.1 RFC, and/or the line-by-line breakdown in [Chapter 6 of the ZeroMQ Guide](https://zguide.zeromq.org/docs/chapter6/#The-ZeroMQ-Process-C).

There is a worked example of making a patch, with all commands, in the same chapter.

## Getting Started with Git and GitHub

Github provides a very good guide on how to contribute to Open Source projects.
Please start by reading the https://docs.github.com/en/get-started/quickstart/contributing-to-projects page.

## Contribution Example

The ZeroMQ Guide has a [detailed step-by-step example](https://zguide.zeromq.org/docs/chapter6/#A-Real-Life-Example) of contributing a patch to [libzmq](https://github.com/zeromq/libzmq).

## Write Good Commit Messages

Commit messages become the public record of your changes, as such it's important that they be well-written. The basic format of git commit messages is:

* A single summary line starting with "Problem: ". **This should be short — no more than 70 characters** or so, since it can be used as the e-mail subject when submitting your patch and also for generating patch file names by 'git format-patch'. If your change only touches a single file or subsystem you may wish to prefix the summary with the file or subsystem name.
* A blank line.
* A detailed description of your change starting with "Solution: ". Where possible, write in the present tense, e.g. "Add assertions to zmq_foo()". If your changes have not resulted from previous discussion on the mailing list you may also wish to include brief rationale on your change. **Your description should be formatted as plain text with each line not exceeding 80 characters.**

Example:

```
Problem: Windows build script requires edit of VS version

Solution: Use CMD.EXE environment variable to extract
DevStudio version number and build using it.
```

## Coding Style for libzmq

In case your contribution is targeting [libzmq](https://github.com/zeromq/libzmq) please stick to this guide as coding style.
Please also note that [clang-format](https://clang.llvm.org/docs/ClangFormat.html) is used to automatically validate and enforce proper formatting.

### General rules

* Maximal line length is limited to 80 characters.
* If a statement has to be broken into two lines, second (and any subsequent) line should be indented by one level (with exceptions for control statements; see below).
* Indentation is always done using spaces, tabs are never used.
* One level of indentation is 4 characters long.
* Each file starts with a header containing the short license text.


### Comments

Both C and C++ style comments are allowed.

* C style comments (/* */) should be used for large block of comments, mostly at the beginning of the file.
* The code itself should be commented by C++ line comments (//).
* Code should be broken to small pieces (couple of lines each), every piece doing one simple task.
* Each piece should be preceded by a comment explaining what is its intent.
* Each code piece should be followed by a blank line.
* C++ style line comment starts with two slashes followed by two spaces.
* The text of comment begins with a capital letter and ends by a period.

```
//  Compute the factorial.
int factorial = 1;
for (int i = 2; i != 11; i++)
    factorial *= i;

//  Present the result to the user.
cout << "Factorial of 10 is " << factorial << "." << endl;
```

### Identifiers

Identifiers are in lower case. If identifier consists of multiple words, the words are separated by underscores.

Identifiers should be meaningful rather than arbitrary. The only exception are control variables of short cycles where short names like `i`, `it` etc. can be used.

```
int sum = 0;
for (int i = 0; i != 100; i++)
     sum += i;
```

The type of the variable should not be explicitly marked in the identifier. I.e. no hungarian notation.

Function arguments should end by underscore. This way we can distinguish function arguments from member variables with the same name:

```
struct complex_t
{
    complex_t (float real_, float imaginary_) :
        real (real_),
        imaginary (imaginary_)
    {
    }

    float real;
    float imaginary;
};
```

Identifier for types (structs, classes, enums, typedefs) are postfixed by "_t" (e.g. `complex_t`).

### Code blocks

For functions, structures, classes, enums and namespaces both opening bracket and closing bracket are placed on separate lines:

```
void fx ()
{
    //  Code goes here.
}
```

With `for`, `while`, `if` and `else` blocks opening bracket is on the same line as the control statement:

```
if (sum > 1000) {
    //  Code goes here.
} else {
    //  More code.
}
```

Even if `for`, `while`, `if` or `else` block contains only a single statement, the statement should be placed on a separate line:

```
if (end)
    exit (1);
```

If an `if` block contains an `else` part, always write the curly braces around both parts.

If the indenting of the controlled block incidentally collides with the control statement that's broken into two lines, second line of the control statement should be indented by 6 spaces rather than 4 to prevent confusion:

```
if (very_long_variable_name == 10000 &&
      another_horrendous_variable_name == 1000000 &&
      ludicrously_long_variable_name == 1000000000)
    counter++;
```

### Operators

Unary operators are not separated from the expression in any way:

```
counter++;
```

Binary operators should be separated from adjacent expression by spaces:

```
z = x + y;
```
String concatenation (PHP) should be separated by spaces:

```
$foo = $bar . " " . $bat;
```

### Subscripting (function calls, array members)

Subscripts and function calls are separated from the expression by space:

```
fx (my_array [0]);
```

The same spacing rules apply to function definitions, direct-initialization, initializer lists, and function-like operators:

```
struct foo_t
{
    foo_t (int a_, int b_) :
        a (a_),
        b (b_)
    {
    }

    void foo (int n) const;
};

foo_t *p = new foo_t (1, 2);
void *q = std::malloc (sizeof (foo_t));
```

The type arguments of C++-style casts are separated by spaces, too:

```
std::intptr_t n = reinterpret_cast <std::intptr_t> (&x);
char *p = static_cast <char *> (q);
```

### Standard library headers

Do not use deprecated headers (like `<stddef.h>`). Use the C++ header instead: `<cstddef>`.

Always qualify all standard library names: `std::size_t`, `std::memcpy`, etc.


### Include guards and global file structure

Do not leave extraneous blank lines at the beginning or end of files. No file starts with a newline, and every file ends in precisely one newline.

Separate include guards with one newline:

```
/* Initial comments */

#ifndef GUARD
#define GUARD

namespace xyz
{
    // main content
}

#endif
```

The include guard for a header file `foo.hpp` should be `__ZMQ_FOO_HPP_INCLUDED__`. (In fact, names starting with double underscores are reserved, and technically any definition of such a name makes the program ill-formed. We need to change this rule and fix all the header files.)

### Miscellaneous spacing

Constructor initializer lists have spaces around the colon.

The spacing of pointer and reference modifiers is not completely decided, either `T* p` or `T *p` are acceptable. But use one fixed style in one file. In the latter case, casts also get a space: `static_cast <T *>`

### Exceptions

* Assertions say that the 0MQ developers do not expect this situation to ever happen, i.e. it is an internal error that demands a fix to the 0MQ code.
* Errors say that the 0MQ developers expect this situation to happen in applications, i.e. it is an external error that suggests a fix to the application.
* C++ exceptions are not to be used within the core codebase.

### Public Interfaces

Public interfaces of components must not be called by code inside the interface.

For example, this is not allowed:

```
int f(int x) { return g (x); }
int fsucc(int x) { return f (x) + 1; }
```

Reserving public interfaces for the public is necessary for maintenance of public invariants, whilst allowing encapsulated implementation manipulators to work with weaker invariants temporarily. Even the mere existence of an otherwise correct call stands in the way of simple code changes, and particularly transparent invasions such as provided by external tracing and profiling tools. We don't want to confuse public calls to functions with internal calls, and we don't want to count inner calls when profiling.

The 0MQ system demands an invariant of socket I/O: no two threads may perform I/O at the same time. There are two ways this invariant can be maintained: by the client, or by 0MQ. In the latter case wrapping the code bodies of the function calls with a mutex lock suffices, however if one public API doing this called another there'd be an immediate deadlock.
