import express from "express"
import http from "http"
import { Server } from "socket.io";
const app = express();

const server = http.createServer(app);
const port = process.env.PORT || 5000;
const io = new Server(server);

const userSocketMap = {};
const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            userName: userSocketMap[socketId],
        };
    });
};


io.on("connection", (socket) => {
    // console.log(socket.id);

    socket.on('join', ({ roomId, userName }) => {
        // console.log(userName )   
        userSocketMap[socket.id] = userName
        // console.log(roomId)
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit("joined", {
                clients,
                userName,
                socketId: socket.id,
            })
        })


    })
    socket.on('disconnecting', () => {
        const room = [...socket.rooms];
        // console.log("fascs")
        // console.log(room)

        room.forEach((roomId) => {
            socket.in(roomId).emit("disconnected", {
                socketId: socket.id,
                userName: userSocketMap[socket.id]
            })
        })
        delete userSocketMap[socket.id]
        socket.leave();
    })
})




server.listen(port, () => {
    console.log("server connect", port)
})