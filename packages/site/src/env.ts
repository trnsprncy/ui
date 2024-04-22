import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().optional(),
    // DATABASE_AUTH_TOKEN: z.string().optional(),
    WAITLIST_API_KEY: z.string().optional(),
    WAITLIST_ID: z.string().optional(),
  },
  client: {},
  experimental__runtimeEnv: {},
});
