import { cleanEnv, num } from "envalid";

import { name, version } from "@/../../package.json";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const envs = cleanEnv(process.env, {
  PORT: num({
    desc: "Port number",
    default: 4000,
  }),
});

const config = {
  server: {
    port: envs.PORT,
  },
  app: {
    name,
    version,
  },
};

export default config;
