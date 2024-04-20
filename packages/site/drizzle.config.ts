import { env } from "@/lib/env.mjs";
import type { Config } from "drizzle-kit";

const IS_PROD = process.env.NODE_ENV === "production";

const credentials = Object.assign(
  {},
  {
    url: env.DATABASE_URL,
  },
  IS_PROD ? { authToken: env.DATABASE_AUTH_TOKEN } : {}
);

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  driver: "turso",
  dbCredentials: credentials,
} satisfies Config;
