import { cleanEnv, num, str } from "envalid";

import { name, version } from "@/../../package.json";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const envs = cleanEnv(process.env, {
  PORT: num({
    desc: "Port number",
    default: 4000,
  }),
  CORS_ALLOWED_ORIGINS: str({
    desc: "Allow origins",
    default: "*",
  }),
});

const config = {
  server: {
    port: envs.PORT,
    cors: envs.CORS_ALLOWED_ORIGINS,
  },
  app: {
    name,
    version,
  },
};

export default config;
