import { env } from "@/env";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const config = Object.assign(
  {},
  {
    url: env.DATABASE_URL!,
  },
  process.env.NODE_ENV === "production"
    ? {
        authToken: env.DATABASE_AUTH_TOKEN!,
      }
    : {}
);

const client = createClient(config);

export const db = drizzle(client);
