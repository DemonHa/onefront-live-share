import { Socket } from "socket.io";

export const rooms: Partial<
  Record<
    string,
    {
      locked: boolean;
      sockets: Set<string>;
    }
  >
> = {};
