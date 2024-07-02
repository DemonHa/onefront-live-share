import { createRoom } from "@/services/rooms";
import { route } from "convfastify";
import { randomUUID } from "crypto";

export default route({
  method: "POST",
  url: "/rooms/schedule",
  schema: {
    body: {
      type: "object",
      properties: {
        userId: { type: "string" },
        scheduledAt: { type: "number" },
      },
      required: ["userId", "scheduledAt"],
    },
    tags: ["rooms"],
  },
  handler: async (req, res) => {
    const { userId, scheduledAt } = req.body;

    const scheduledDate = new Date(scheduledAt);

    await createRoom(userId, randomUUID(), scheduledDate);

    return res.code(201).send();
  },
});
