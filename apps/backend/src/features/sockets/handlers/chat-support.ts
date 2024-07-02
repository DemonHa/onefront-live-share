import { Socket } from "socket.io";
import { Events } from "../events";
import { createMessage } from "@/services/messages";

export default async function chatSupport(socket: Socket, message: string) {
  // Save the message to the database
  await createMessage("<REPLACE_WITH_CORRECT_USER_ID>", message);

  // Share the message in real time to notify all connected support sockets
  socket.to("support").emit(Events.CHAT_SUPPORT, { message });
}
