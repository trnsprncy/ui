import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  SubscriberId, 
  NewSubscriberParams,
  UpdateSubscriberParams, 
  updateSubscriberSchema,
  insertSubscriberSchema, 
  subscribers,
  subscriberIdSchema 
} from "@/lib/db/schema/subscribers";

export const createSubscriber = async (subscriber: NewSubscriberParams) => {
  const newSubscriber = insertSubscriberSchema.parse(subscriber);
  try {
    const [s] =  await db.insert(subscribers).values(newSubscriber).returning();
    return { subscriber: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSubscriber = async (id: SubscriberId, subscriber: UpdateSubscriberParams) => {
  const { id: subscriberId } = subscriberIdSchema.parse({ id });
  const newSubscriber = updateSubscriberSchema.parse(subscriber);
  try {
    const [s] =  await db
     .update(subscribers)
     .set({...newSubscriber, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
     .where(eq(subscribers.id, subscriberId!))
     .returning();
    return { subscriber: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSubscriber = async (id: SubscriberId) => {
  const { id: subscriberId } = subscriberIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(subscribers).where(eq(subscribers.id, subscriberId!))
    .returning();
    return { subscriber: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

