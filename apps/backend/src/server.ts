import fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import { Server } from "socket.io";
import cors from "@fastify/cors";

import config from "@/config";

declare module "fastify" {
  interface FastifyInstance {
    io: Server<{
      "join-room": (...args: [string, string]) => void;
      "user-connected": (...args: [string]) => void;
      "user-disconnected": (...args: [string]) => void;
    }>;
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
    app.io.on("connection", (socket) => {
      console.log("socket connected");
      socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-connected", userId);

        socket.on("disconnect", () => {
          socket.to(roomId).emit("user-disconnected", userId);
        });
      });
    });
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
