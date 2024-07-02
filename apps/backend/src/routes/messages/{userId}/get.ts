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

    // TODO: Restrict access to only the authenticated user or costuner support
    // Hint: Check for a specific role which identifies costumer support

    return res.send({ messages });
  },
});
