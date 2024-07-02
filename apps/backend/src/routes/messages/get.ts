import { getSingleMessageForUsers } from "@/services/messages";
import { route } from "convfastify";

export default route({
  method: "GET",
  url: "/messages",
  schema: {
    tags: ["messages"],
  },
  handler: async (_, res) => {
    const messages = await getSingleMessageForUsers();
    return res.send({ messages });
  },
});
