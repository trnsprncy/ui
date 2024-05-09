import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().optional(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    WAITLIST_API_KEY: z.string().optional(),
    WAITLIST_ID: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID:
      process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
  },
});
