const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://domingodominic.github.io/simple-chat-app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected: ", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with ID ${socket.id} joined room in ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// Define a route for the root path ("/") to handle HTTP GET requests.
app.get("/", (req, res) => {
  res.send("Server is running."); // Respond with a simple message.
});

// Start the server and listen on port 3002.
server.listen(3002, () => {
  console.log("Server is running on port 3002");
});
