const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use('/api/auth/', userRoutes);
app.use('/api/messages/', messageRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongo connection established");
}).catch((err) => {
    console.log(err.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT=${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);

        socket.broadcast.emit("contact-connect", userId);
    });

    socket.on("disconnect", () => {
        if(!!onlineUsers.size) {
            const offlineUser = [...onlineUsers].find(([key, value]) => value == socket.id);

            if(offlineUser.length) {
                onlineUsers.delete(offlineUser[0]);
                
                socket.broadcast.emit("contact-disconnect", offlineUser[0]);
            }
        }
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.msg);
        }
    });
});