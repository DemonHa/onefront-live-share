import { Socket } from "socket.io";
import { sockets } from "../sockets";

export default function authenticate(socket: Socket, token: string) {
  // TODO: Call auth service
  // TODO: Extract sub value
  const userId = "";

  // Save the socket information
  sockets[socket.id] = { userId };
}
