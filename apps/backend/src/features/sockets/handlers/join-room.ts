import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

import { Events } from "../events";
import { rooms } from "../rooms";

export default function joinRoom(
  socket: Socket,
  roomId: string,
  userId: string,
  password?: string
) {
  let room = rooms[roomId];

  if (room) {
    // User can't join if the password is incorrect or locked, or socket is already on the room
    if (
      room.password !== password ||
      room.locked ||
      room.sockets.has(socket.id)
    ) {
      return;
    }
  } else {
    room = rooms[roomId] = {
      owner: socket.id,
      password: uuidv4(),
      sockets: new Set([socket.id]),
      locked: false,
    };
  }

  // Join user to the room
  room.sockets.add(socket.id);

  socket.join(roomId);
  socket.to(roomId).emit(Events.USER_CONNECTED, userId);

  socket.on("disconnect", () => {
    socket.to(roomId).emit(Events.USER_DISCONNECTED, userId);
    room.sockets.delete(socket.id);

    if (room.sockets.size === 0) {
      delete rooms[roomId];
    }
  });
}
