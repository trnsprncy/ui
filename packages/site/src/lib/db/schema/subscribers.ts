import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// @NOTE: users are not required for subscribers to exist this may change eventually.
export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  // other user attributes
  name: text("name"),
  email: text("email"),
  username: text("username"),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const subscribers = sqliteTable(
  "user_subscriber",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
    email: text("email").notNull().unique(),
    verified: integer("verified", { mode: "boolean" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
  },
  (table) => ({
    subscriberUserIdIdx: index("subscriber_user_id_idx").on(table.userId),
  })
);

const selectSubscriberSchema = createSelectSchema(subscribers);
const insertSubscriberSchema = createInsertSchema(subscribers, {
  userId: z.string().optional(),
  email: (schema) => schema.email.email().optional(),
  verified: z.boolean().optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type SelectSubscriber = z.infer<typeof selectSubscriberSchema>;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
