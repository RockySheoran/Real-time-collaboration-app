import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
import dotenv from "dotenv"
import { db } from "./db.js";

dotenv.config();

const server = http.createServer(app);
const port = process.env.PORT || 5000;
const io = new Server(server);

const userSocketMap = {};
const roomCodeMap = {}; // A map to store the code for each room

const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            
            socketId,
            userName: userSocketMap[socketId],
        };
    });
};

io.on("connection", (socket) => {
    // When a new user joins the room
    socket.on("join", ({ roomId, userName }) => {
        // console.log(userName, socket.id)
        userSocketMap[socket.id] = userName;
        socket.join(roomId);

        const clients = getAllConnectedClients(roomId);
        // console.log(clients)

        // Send the current code to the new user
        const currentCode = roomCodeMap[roomId] || ""; // Fetch the latest code for the room
        io.to(socket.id).emit("current_code", { code: currentCode });

        // Notify existing clients about the new user
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit("joined", {
                clients,
                userName,
                socketId: socket.id,
            });
        });
    });

    // When code is changed by any user in the room
    socket.on("code_change", ({ roomId, code }) => {
        roomCodeMap[roomId] = code;
        // console.log(roomId)
        // console.log(code)
        // Update the code for the room
        socket.in(roomId).emit("code_change", { code });
    });
    socket.on("sync_code", ({ socketId, code }) => {
       
        // console.log(roomId)
        // console.log(code)
        // Update the code for the room
    io.to(socketId).emit("code_change", { code });
    });
    

    // When a user disconnects
    socket.on("disconnecting", () => {
        const room = [...socket.rooms];
        room.forEach((roomId) => {
            socket.in(roomId).emit("disconnected", {
                socketId: socket.id,
                userName: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

server.listen(port, () => {
    db();
    console.log(`Server connected on port ${port}`);
});
