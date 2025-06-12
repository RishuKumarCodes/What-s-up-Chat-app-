import { io, Socket } from "socket.io-client";
import Env from "./env";

let socket: Socket;
export const getSocket = () => {
  if (!socket) {
    socket = io(Env.BACKEND_URL, { autoConnect: false });
  }
  return socket;
};

export type SocketType = "group" | "personal";

// export function GetGroupSocket(groupId: string): Socket {
//   return io(Env.BACKEND_URL, {
//     autoConnect: false,
//     auth: { room: groupId, type: "group" },
//   });
// }

export function getPersonalSocket(other: number, me: number): Socket {
  const room = [other, me].sort().join("_");
  return io(Env.BACKEND_URL, {
    autoConnect: false,
    auth: { room, type: "personal" },
  });
}