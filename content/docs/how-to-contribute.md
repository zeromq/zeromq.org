---
title: How to contribute
description: ØMQ Contribution Policy
toc: false
weight: 1
---

## How We Work Together

The ZeroMQ Community uses the [C4.1](http://rfc.zeromq.org/spec:22) process (with some caveats) for its core projects: libzmq and stable releases (zeromq2-x, zeromq3-x, zeromq4-x) as well as surrounding projects like CZMQ.

Please do take the time to read the C4.1 RFC, and/or the line-by-line breakdown in [Chapter 6 of the ZeroMQ Guide](http://zguide.zeromq.org/page:all#The-MQ-Process-C).

There is a worked example of making a patch, with all commands, in the same chapter.


## Getting Started with Git

Download and install git. On Linux, apt-get install git. If you're new to git, read the git docs, and Pro git by Scott Chacon.

The easygit wrapper does a good job of fixing git's command line. It's a standard package on most Linux systems.

Ensure that your copy of git is configured with your real name and the e-mail address you wish to be associated with your contributions. This is required to correctly track authorship:

$ git config --global user.name "Your Name"
$ git config --global user.email your.name@example.com
Create a user profile at GitHub with your real name and the same email you used to configure your git.

Configure your Bash prompt if you are on Linux by copying this into your .bashrc or .bash_profile.

Do your research. To contribute to a project, you need to know (a) the owner of that project and (b) the location of the git at github.com. If it's not obvious, ask on zeromq-dev.

We don't use branches (except master), so git comes down to a small set of commands:

clone, to get a git onto your own computer
add, to add files to the staging area
commit, to commit what's in the staging area
stash, to save all changes to the stash
remote, to view, or add remote git aliases
There's a few more you may want to use, like reset, or checkout.

## Contribution Example

The ZeroMQ Guide has a detailed step-by-step example of contributing a patch to libzmq.

## Write Good Commit Messages

Commit messages become the public record of your changes, as such it's important that they be well-written. The basic format of git commit messages is:

A single summary line starting with "Problem: ". This should be short — no more than 70 characters or so, since it can be used as the e-mail subject when submitting your patch and also for generating patch file names by 'git format-patch'. If your change only touches a single file or subsystem you may wish to prefix the summary with the file or subsystem name.
A blank line.
A detailed description of your change starting with "Solution: ". Where possible, write in the present tense, e.g. "Add assertions to zmq_foo()". If your changes have not resulted from previous discussion on the mailing list you may also wish to include brief rationale on your change. Your description should be formatted as plain text with each line not exceeding 80 characters.
Example:

Problem: Windows build script requires edit of VS version

Solution: Use CMD.EXE environment variable to extract
DevStudio version number and build using it.

## Coding Style

The code style we follow can be found on this page.

