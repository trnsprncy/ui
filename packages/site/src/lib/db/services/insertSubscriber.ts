import { db } from "../";
import { subscribers } from "../schema/subscribers";
import { datetimeNow } from "../utils";
import { sql } from "drizzle-orm";
import { nanoid } from "nanoid";

/**
 * Inserts a new subscriber into the database with the provided email.
 * If the email already exists, updates the existing subscriber's email, verification status, and verification token.
 * Returns the newly created or updated subscriber.
 *
 * @param email - The email of the subscriber.
 * @returns The newly created or updated subscriber.
 * @throws Error if there is an error creating the subscription.
 */
export async function insertSubscriber(email: string) {
  const now = new Date().getSeconds();

  const subscriber = await db
    .insert(subscribers)
    .values({
      id: nanoid(),
      email,
    })
    .onConflictDoNothing({ target: subscribers.email }) // if email already exists, do nothing
    // .onConflictDoUpdate({
    //   target: subscribers.email,
    //   set: { email, verified: false, },
    //   where: sql`${subscribers.email} = ${email} AND ${subscribers.verified} = 0 AND ${subscribers.createdAt} < datetime('now', '-24 hours')`,
    // })
    .returning(); // returns back the new subscriber

  if (!subscriber) {
    throw new Error("Error creating subscription");
  }

  return subscriber[0]; // return the new subscriber
}
