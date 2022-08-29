const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const port = process.env.port || 3000;

// Attached http server to the socket.io
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "../public")));

// route
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "../public/index"));

  // res.send("socket.io is ready to start");
});

// create a new connection
io.on("connection", (socket) => {
  console.log("a user is connected!");
  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
  socket.on("message", (msg) => {
    socket.broadcast.emit('message',msg)
  });
});

http.listen(port, () => {
  console.log(`socket.io server is ready at http://localhost:${port}`);
});
