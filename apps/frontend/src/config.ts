import { cleanEnv, num, str } from "envalid";

const envs = cleanEnv(import.meta.env, {
  VITE_SOCKET_SERVER_URL: str({
    desc: "Socket server url",
    default: "http://localhost:4000",
  }),
  VITE_PEER_SERVER_HOST: str({
    desc: "Peer server url, used to establish connections between peerjs clients",
    default: "localhost",
  }),
  VITE_PEER_SERVER_PORT: num({
    desc: "Peer server url, used to establish connections between peerjs clients",
    default: 3001,
  }),
});

const config = {
  socket: {
    url: envs.VITE_SOCKET_SERVER_URL,
  },
  peerjs: {
    host: envs.VITE_PEER_SERVER_HOST,
    port: envs.VITE_PEER_SERVER_PORT,
  },
};

export default config;
