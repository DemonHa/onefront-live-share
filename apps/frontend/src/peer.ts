import { singleton } from "./singleton";
import config from "./config";
import Peer from "peerjs";

export const peer = singleton(
  "peer",
  () =>
    new Peer(undefined as unknown as string, {
      host: config.peerjs.host,
      port: config.peerjs.port,
    })
);
