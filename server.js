const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const app = express();

const PORT = 5000;

/**for development purpose **/
app.use(cors());
app.options("*", cors());

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

app.use(express.static("client/build/"));

/**for development purpose **/
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

const activeUsers = new Set();

io.on("connection", function (socket) {
  socket.on("new user", function (data) {
    console.log("new user", data.username, "connected.");
    socket.userId = data;
    activeUsers.add(data.username);
    io.emit("new user", [...activeUsers]);
  });

  socket.on("send", function (data) {
    io.emit("send-message-to-all", data);
  });
});
