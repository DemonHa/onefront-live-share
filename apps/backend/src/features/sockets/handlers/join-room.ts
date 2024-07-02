import { Socket } from "socket.io";
import { Events } from "../events";

export default function joinRoom(
  socket: Socket,
  roomId: string,
  userId: string
) {
  socket.join(roomId);
  socket.to(roomId).emit(Events.USER_CONNECTED, userId);

  socket.on("disconnect", () => {
    socket.to(roomId).emit(Events.USER_DISCONNECTED, userId);
  });
}
