import { Socket } from "socket.io";

import { Events } from "../events";
import { getRoomById } from "@/services/rooms";
import { getUserIdFromSocket } from "../utils";
import { rooms } from "../rooms";

export default async function joinRoom(
  socket: Socket,
  roomId: string,
  peerId: string,
  password: string
) {
  const roomInformation = await getRoomById(roomId);
  const { userId } = getUserIdFromSocket(socket) ?? {};

  if (!userId) {
    return socket.emit(Events.ERROR, {
      code: 401,
      message: "You need to be authenticated",
    });
  }

  if (!roomInformation || roomInformation.completed) {
    return socket.emit(Events.ERROR, {
      code: 404,
      message: "Room does not exists",
    });
  }

  // Check for the user password to join the room
  // Skip this check if the current user is the owner
  if (
    userId !== roomInformation.owner &&
    roomInformation.password !== password
  ) {
    return socket.emit(Events.ERROR, {
      code: 403,
      message: "Incorrect password",
    });
  }

  if (!rooms[roomId]) {
    rooms[roomId] = { locked: false, sockets: new Set(socket.id) };
  }

  // We are sure a room exists
  const room = rooms[roomId]!;

  if (room.locked) {
    return socket.emit(Events.ERROR, { code: 403, message: "Room is locked" });
  }

  // Join user to the room
  room.sockets.add(socket.id);

  socket.join(roomId);
  socket.to(roomId).emit(Events.USER_CONNECTED, peerId);

  socket.on("disconnect", () => {
    socket.to(roomId).emit(Events.USER_DISCONNECTED, peerId);
    room.sockets.delete(socket.id);

    if (room.sockets.size === 0) {
      delete rooms[roomId];
    }
  });
}
