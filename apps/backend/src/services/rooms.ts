import { Rooms } from "@prisma/client";
import { prisma } from "./db";

export const getActiveRooms = () => {
  return prisma.rooms.findMany({
    orderBy: { scheduledAt: "asc" },
    where: {
      completed: false,
    },
  });
};

export const markRoomAsCompleted = (id: Rooms["id"]) => {
  return prisma.rooms.update({
    where: {
      id,
    },
    data: {
      completed: true,
    },
  });
};

export const createRoom = (
  owner: Rooms["owner"],
  password: Rooms["password"],
  scheduledAt: Rooms["scheduledAt"]
) => {
  return prisma.rooms.create({
    data: {
      owner,
      password,
      scheduledAt,
    },
  });
};
