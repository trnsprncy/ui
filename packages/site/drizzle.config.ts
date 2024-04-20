import { env } from "@/env";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema",
  out: "./migrations",
  driver: "turso",
  dbCredentials: {
    url: env.DATABASE_URL!,
    authToken: env.DATABASE_AUTH_TOKEN!,
  },
} satisfies Config;
