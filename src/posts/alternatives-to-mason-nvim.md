---
title: "Alternatives to Mason.nvim"
desc: "Looking for another way to manage tools in nvim"
date: "2025-06-04"
tags: ["package manager", "tool manager", "neovim", "tooling"]
published: false
---

## Why?

First, I gotta say that mason.nvim really simplifies installing & managing tools plus it covers huge amount of packages, but personally, I've always been a fan of the unix philosphy "do one thing well", and I find an editor plugin doing all that kind of work is something a plugin shouldn't really do.

So if you're looking for a separate tool for managing installations of `language servers`, `formatters`, `linters` and `other cli tools`, you may wanna keep reading.

### 1. Default package manager

Most linux distros software repositories offer some tooling but it's often quite lacking and this is why mason.nvim exists.

### 2. [Mise-en-place](https://mise.jdx.dev/)

This one is basically [asdf](https://asdf-vm.com/) but written in rust, and offers a decent amount of tools. You can also use it in a local project, so you won't have to pollute your global PATH environment variable.

You can get a list of possible packages to install by running this command

```sh
mise use -g
```

You'll be greeted with this fancy selector

### 3. [Nix package manager](https://nixos.org/) (bit of a learning curve, but trust me, IT'S WORTH IT)

This one may take some time as you'll have to learn the nix language. It's kind of a weird language but not that hard as some may claim.

Very cool thing about nix package manager is that it has one of the biggest software repositories in the WORLD! You can be well certain that all the packages you need are available in there.

You may run into some issues while setting this package manager up(e.g. pissing off SELinux or enabling flakes), so I recommend installing this flavour of nix called [determinate nix](https://github.com/DeterminateSystems/nix-installer).

One issue I ran into when using nix... I CAN'T INSTALL GUI PROGRAMS >:[
You won't have that problem if you're using NixOS, but in case you're using it on a linux distro like archlinux or fedora, yeah you're gonna run into that problem. That shouldn't really be a problem if you're using it ONLY for development, but in case you want to install literally everything using nix then you may wanna consider using NixOS at that point.

<style> @import "./style/default.css" </style>
