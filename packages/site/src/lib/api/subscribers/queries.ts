import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type SubscriberId, subscriberIdSchema, subscribers } from "@/lib/db/schema/subscribers";

export const getSubscribers = async () => {
  const rows = await db.select().from(subscribers);
  const s = rows
  return { subscribers: s };
};

export const getSubscriberById = async (id: SubscriberId) => {
  const { id: subscriberId } = subscriberIdSchema.parse({ id });
  const [row] = await db.select().from(subscribers).where(eq(subscribers.id, subscriberId));
  if (row === undefined) return {};
  const s = row;
  return { subscriber: s };
};


