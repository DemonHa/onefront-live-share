import { Socket } from "socket.io";
import { Events } from "../events";

export default function chatSupport(socket: Socket, message: string) {
  // Save the message to the database

  // Share the message in real time to notify all connected support sockets
  socket.to("support").emit(Events.CHAT_SUPPORT, { message });
}
