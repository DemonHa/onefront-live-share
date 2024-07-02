import { route } from "convfastify";

import { getMessagesByUserId } from "@/services/messages";

export default route({
  method: "GET",
  url: "/messages/:userId",
  schema: {
    params: {
      type: "object",
      properties: {
        userId: { type: "string" },
      },
      required: ["userId"],
    },
    tags: ["messages"],
  },
  handler: async (req, res) => {
    const { userId } = req.params;
    const messages = await getMessagesByUserId(userId);

    return { messages };
  },
});
