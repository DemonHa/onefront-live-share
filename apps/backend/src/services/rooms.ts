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
