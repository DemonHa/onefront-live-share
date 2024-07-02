import { rooms } from "@/features/sockets/rooms";
import { route } from "convfastify";

export default route({
  method: "GET",
  url: "/rooms/active",
  handler: (_, res) => {
    return res.send(Object.keys(rooms));
  },
});
