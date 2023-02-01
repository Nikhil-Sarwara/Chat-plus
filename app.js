// import express package
const express = require("express");

//import path package
const path = require("path");

// Intialize the app
const app = express();

// Port Variable
const port = process.env.PORT || 3000;

// Use public folder
app.use(express.static(path.join(__dirname, "public")));

// Server listner
const server = app.listen(port, () => {
  // Print server starting log
  console.log(`Server Listening on ${port}`);
});

// Socket IO Intialization
const io = require("socket.io")(server);

let connectedSockets = new Set();

// When connected
io.on("connection", onConnected);

function onConnected(socket) {
  console.log(socket.id);
  connectedSockets.add(socket.id);

  io.emit("total", connectedSockets.size);

  socket.on("disconnect", () => {
    console.log("Socket Disconnected", socket.id);
    connectedSockets.delete(socket.id);

    io.emit("total", connectedSockets.size);
  });
}
