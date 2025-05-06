import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/index";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redisConfig";
import { instrument } from "@socket.io/admin-ui";

const PORT = process.env.PORT || 7000;
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true,
  },
  adapter: createAdapter(redis),
});

instrument(io, {
  auth: false,
  mode: "development",
});

setupSocket(io);
export { io };

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return res.send("Welcome home. ");
});

app.use("/api", router);

server.listen(PORT, () => {
  console.log(`Server smelling from Port: ${PORT}`);
});
