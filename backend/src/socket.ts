import { Socket, Server } from "socket.io";
import prisma from "./config/db.config";

interface CustomSocket extends Socket {
  room?: string;
  type?: "group" | "personal";
}

export function setupSocket(io: Server) {
  // io.use((socket: CustomSocket, next) => {
  //   const room = socket.handshake.auth.room;
  //   if (!room) {
  //     return next(new Error("Invalid room"));
  //   }
  //   socket.room = room;
  //   next();
  // });

  io.use((socket: CustomSocket, next) => {
    const { room, type } = socket.handshake.auth as {
      room?: string;
      type?: "group" | "personal";
    };

    if (!room || (type !== "group" && type !== "personal")) {
      return next(new Error("Invalid room or type"));
    }
    socket.room = room;
    socket.type = type;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    if (socket.room) {
      socket.join(socket.room);
    }
    if (socket.type == "group") {
      socket.on("message", async (data) => {
        // console.log("Server side message", data);
        await prisma.chats.create({
          data: data,
        });
        socket.to(socket.room!).emit("message", data);
      });
    }

    if (socket.type == "personal") {
      socket.on("personal_message", async (data) => {
        console.log("message request recieved at backend", data);

        const senderId = parseInt(data.senderId);
        const receiverId = parseInt(data.receiverId);

        if (isNaN(senderId) || isNaN(receiverId)) {
          console.error("Invalid senderId or receiverId");
          return;
        }

        const msg = await prisma.personalMessage.create({
          data: {
            content: data.content,
            sender: { connect: { id: senderId } },
            receiver: { connect: { id: receiverId } },
          },
        });
        io.to(socket.room!).emit("personal_message", msg);
      });
    }

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });
}
