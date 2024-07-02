import { Socket } from "socket.io";
import { Events } from "../events";
import { createMessage } from "@/services/messages";
import { getUserIdFromSocket } from "../utils";

export default async function chatSupport(socket: Socket, message: string) {
  const { userId } = getUserIdFromSocket(socket) ?? {};

  // Connected socket is not authenticated yet
  // therfore it can not send messages
  if (!userId) {
    socket.emit(Events.ERROR, {
      code: 401,
      message: "You need to be authorized",
    });
    return;
  }

  // Save the message to the database
  await createMessage(userId, message);

  // Share the message in real time to notify all connected support sockets
  socket.to("support").emit(Events.CHAT_SUPPORT, { message });
}
