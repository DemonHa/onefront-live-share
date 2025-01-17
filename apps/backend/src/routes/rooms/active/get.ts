import { getActiveRooms } from "@/services/rooms";
import { route } from "convfastify";

export default route({
  method: "GET",
  url: "/rooms/active",
  schema: {
    tags: ["rooms"],
  },
  handler: async (_, res) => {
    const activeRooms = await getActiveRooms();
    return res.send({ rooms: activeRooms });
  },
});
