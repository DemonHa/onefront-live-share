import { io } from "socket.io-client";
import { singleton } from "./singleton";
import config from "./config";

export const socket = singleton("socket", () => io(config.socket.url));
