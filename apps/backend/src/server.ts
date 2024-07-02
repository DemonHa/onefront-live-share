import fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import { Server } from "socket.io";
import cors from "@fastify/cors";

import config from "@/config";
import socket from "./features/sockets";

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
  }
}

const getApp = () => {
  const app = fastify({
    logger: true,
  });

  app.register(cors, {
    allowedHeaders: config.server.cors,
  });

  app.register(fastifySocketIO, {
    cors: {
      origin: config.server.cors,
    },
  });

  const startTime = new Date();

  app.ready(() => {
    socket(app.io);
  });

  app.route({
    method: "GET",
    url: "/info",
    handler: (_, reply) => {
      reply.send({
        name: config.app.name,
        version: config.app.version,
        startTime,
      });
    },
  });

  return app;
};

export default getApp;
