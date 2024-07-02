import fastify from "fastify";

import config from "@/config";

const getApp = () => {
  const app = fastify({
    logger: true,
  });

  const startTime = new Date();

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
