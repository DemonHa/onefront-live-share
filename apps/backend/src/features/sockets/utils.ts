import { Socket } from "socket.io";
import { sockets } from "./sockets";

export const getUserIdFromSocket = (socket: Socket) => {
  return sockets[socket.id];
};
