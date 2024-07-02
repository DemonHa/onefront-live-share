import { Server, Socket } from "socket.io";
import { Events } from "./events";
import joinRoom from "./handlers/join-room";

export default function socket(io: Server) {
  return io.on("connection", (socket: Socket) => {
    socket.on(Events.JOIN_ROOM, (roomId: string, userId: string) =>
      joinRoom(socket, roomId, userId)
    );
  });
}
