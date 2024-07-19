---
layout: ../../../layouts/Markdown.astro
title: "Understanding WebSockets in JavaScript"
date: "Saturday, July 20th, 2024"
author: "Rogue87"
tags: ["JavaScript", "WebSockets", "Web Development"]
---

## Introduction

WebSockets provide a way to open an interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply.

In this blog post, we'll explore the basics of WebSockets, how to implement them in JavaScript, and some practical use cases.

## What are WebSockets?

WebSockets are a protocol that allows for full-duplex communication channels over a single TCP connection. They are designed to be used in scenarios where you need real-time updates from the server, such as live sports scores, chat applications, or collaborative editing.

### How WebSockets Work

When a WebSocket connection is established, the client and server can send messages to each other at any time. This is different from the traditional HTTP request/response model where the client has to initiate every communication.

## Implementing WebSockets in JavaScript

Let's look at a simple example of how to use WebSockets in a JavaScript application.

### Server-Side (Node.js)

First, we'll create a WebSocket server using the `ws` library in Node.js.

```javascript
const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log(`Received: ${message}`);
    socket.send(`Echo: ${message}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
```
