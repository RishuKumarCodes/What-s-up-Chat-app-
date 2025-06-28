// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/index";
import { setupSocket } from "./socket";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { Server } from "socket.io";
import { createServer } from "http";
import { instrument } from "@socket.io/admin-ui";

async function main() {
  const PORT = process.env.PORT || 7000;
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "https://admin.socket.io",
        "https://what-s-up-chat-app.onrender.com",
      ],
      credentials: true,
    },
  });

  const pubClient = createClient({ url: process.env.REDIS_URL! });
  const subClient = pubClient.duplicate();
  await pubClient.connect();
  await subClient.connect();
  console.log("✅ Redis adapter ready:", pubClient.isOpen, subClient.isOpen);

  io.adapter(createAdapter(pubClient, subClient));

  instrument(io, {
    auth: false,
    mode: "development",
  });

  setupSocket(io);

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get("/", (_req: Request, res: Response) => res.send("Welcome home."));
  app.use("/api", router);

  server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Fatal error starting server:", err);
  process.exit(1);
});
