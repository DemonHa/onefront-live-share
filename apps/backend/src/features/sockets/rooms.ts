import { Socket } from "socket.io";

export const rooms: Record<
  string,
  {
    owner: string;
    password: string;
    locked: boolean;
    sockets: Set<string>;
  }
> = {};
