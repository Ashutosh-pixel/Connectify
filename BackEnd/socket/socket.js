const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

const onlineusers = {};
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

function getUserSocketId(id) {
  if (id in onlineusers) return onlineusers[id];
}

io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);

  const userid = socket.handshake.query.authuserID;
  if (socket.id !== "undefined") {
    onlineusers[userid] = socket.id;
  }

  console.log(Object.keys(onlineusers));

  io.emit("getonlineusers", onlineusers);

  socket.on("disconnect", () => {
    delete onlineusers[userid];
    io.emit("getonlineusers", onlineusers);
    // console.log("disconnected", socket.id);
  });
});

module.exports = { app, io, server, getUserSocketId };
