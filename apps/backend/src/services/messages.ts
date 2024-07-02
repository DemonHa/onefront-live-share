import { Messages } from "@prisma/client";
import { prisma } from "./db";

export const getMessagesByUserId = (userId: Messages["sender"]) => {
  return prisma.messages.findMany({
    where: {
      sender: userId,
    },
  });
};

export const createMessage = (
  userId: Messages["sender"],
  content: Messages["content"]
) => {
  return prisma.messages.create({ data: { sender: userId, content } });
};