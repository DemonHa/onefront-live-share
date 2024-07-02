import { Socket } from "socket.io";
import { sockets } from "../sockets";

export default function authenticate(socket: Socket, token: string) {
  // TODO: Call auth service
  // TODO: Extract sub value
  // TODO: Maybe also store user roles in order to identify if he is a costumer support guy?
  const userId = "";

  // Save the socket information
  sockets[socket.id] = { userId };
}
