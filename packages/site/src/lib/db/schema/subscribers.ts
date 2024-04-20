import { type getSubscribers } from "@/lib/api/subscribers/queries";
import { nanoid, timestamps } from "@/lib/utils";
import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const subscribers = sqliteTable(
  "subscribers",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    email: text("email").notNull(),
    verified: integer("verified", { mode: "timestamp_ms" }),
    name: text("name"),

    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (subscribers) => {
    return {
      emailIndex: uniqueIndex("email_idx").on(subscribers.email),
    };
  }
);

// Schema for subscribers - used to validate API requests
const baseSchema = createSelectSchema(subscribers).omit(timestamps);

export const insertSubscriberSchema =
  createInsertSchema(subscribers).omit(timestamps);
export const insertSubscriberParams = baseSchema
  .extend({
    verified: z.coerce.date(),
  })
  .omit({
    id: true,
  });

export const updateSubscriberSchema = baseSchema;
export const updateSubscriberParams = baseSchema.extend({
  verified: z.coerce.date(),
});
export const subscriberIdSchema = baseSchema.pick({ id: true });

// Types for subscribers - used to type API request params and within Components
export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = z.infer<typeof insertSubscriberSchema>;
export type NewSubscriberParams = z.infer<typeof insertSubscriberParams>;
export type UpdateSubscriberParams = z.infer<typeof updateSubscriberParams>;
export type SubscriberId = z.infer<typeof subscriberIdSchema>["id"];

// this type infers the return from getSubscribers() - meaning it will include any joins
export type CompleteSubscriber = Awaited<
  ReturnType<typeof getSubscribers>
>["subscribers"][number];
