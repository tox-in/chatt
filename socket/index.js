const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });
let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  // Listen for a new user and add them to the onlineUsers array
  socket.on("AddNewUser", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
      console.log("User added:", userId);
    }
    console.log("OnlineUsers", onlineUsers);

    // Emit the updated list of online users to all connected clients
    io.emit("getOnlineUsers", onlineUsers);
  });

  // add message
  socket.on("SendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );
    console.log("sent");
    if (user) {
      // console.log("emited", user);
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        //send notification
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
      const { senderId, isRead, date } = message;
    }
  });

  // Disconnect event
  socket.on("disconnect", () => {
    io.emit("User disconnected", socket.id);

    // Remove the user from the onlineUsers array when they disconnect
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onlineUsers);
  });
});

// Start the WebSocket server
io.listen(3000, () => {
  console.log("WebSocket server listening on port 3000");
});
