import { Socket, Server } from "socket.io";
import prisma from "./config/db.config";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room;
    if (!room) {
      return next(new Error("Invalid room"));
    }
    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    if (socket.room) {
      socket.join(socket.room);
    }
    socket.on("message", async (data) => {
      // console.log("Server side message", data);
      await prisma.chats.create({
        data: data,
      });
      socket.to(socket.room!).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });
}
