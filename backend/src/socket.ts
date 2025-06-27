import { Socket, Server } from "socket.io";
import prisma from "./config/db.config";

interface CustomSocket extends Socket {
  room?: string;
  type?: "group" | "personal";
  userId?: number;
}

export function setupSocket(io: Server) {
  const onlineUsers = new Map<number, string>();

  io.use((socket: CustomSocket, next) => {
    const { room, type, userId } = socket.handshake.auth as CustomSocket;

    if (!room || (type !== "group" && type !== "personal")) {
      return next(new Error("Invalid room or type"));
    }
    socket.room = room;
    socket.type = type;
    socket.userId = userId;
    next();
  });

  // Event        | sent on         | reciever             | Purpose
  // ------------ | --------------- | -------------------- | -----------------
  // user_online  | new user join   | All connected users  | Informs new user is online
  // online_users | once on connect | newly connected user | Provide initial online list

  io.on("connection", (socket: CustomSocket) => {
    const userId = socket.userId!;
    onlineUsers.set(userId, socket.id);

    socket.broadcast.emit("user_online", userId);
    socket.emit("online_users", Array.from(onlineUsers.keys()));

    if (socket.room) {
      socket.join(socket.room);
    }
    if (socket.type == "group") {
      socket.on("message", async (data) => {
        await prisma.chats.create({
          data: data,
        });
        socket.to(socket.room!).emit("message", data);
      });
    }

    if (socket.type == "personal") {
      socket.on("personal_message", async (data) => {
        socket.to(socket.room!).emit("personal_message", data);
        const senderId = parseInt(data.senderId);
        const receiverId = parseInt(data.receiverId);

        if (isNaN(senderId) || isNaN(receiverId)) {
          console.error("Invalid senderId or receiverId");
          return;
        }

        await prisma.personalMessage.create({
          data: {
            content: data.content,
            sender: { connect: { id: senderId } },
            receiver: { connect: { id: receiverId } },
          },
        });
      });
    }

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      socket.broadcast.emit("user_offline", userId);
      console.log("A user disconnected", socket.id);
    });
  });
}
