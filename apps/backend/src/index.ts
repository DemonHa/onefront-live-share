import config from "@/config";
import getApp from "@/server";

getApp().listen({
  port: config.server.port,
});
