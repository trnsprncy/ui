"use server";

import { revalidatePath } from "next/cache";
import {
  createSubscriber,
  deleteSubscriber,
  updateSubscriber,
} from "@/lib/api/subscribers/mutations";
import {
  SubscriberId,
  NewSubscriberParams,
  UpdateSubscriberParams,
  subscriberIdSchema,
  insertSubscriberParams,
  updateSubscriberParams,
} from "@/lib/db/schema/subscribers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSubscribers = () => revalidatePath("/subscribers");

export const createSubscriberAction = async (input: NewSubscriberParams) => {
  try {
    const payload = insertSubscriberParams.parse(input);
    await createSubscriber(payload);
    revalidateSubscribers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSubscriberAction = async (input: UpdateSubscriberParams) => {
  try {
    const payload = updateSubscriberParams.parse(input);
    await updateSubscriber(payload.id, payload);
    revalidateSubscribers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSubscriberAction = async (input: SubscriberId) => {
  try {
    const payload = subscriberIdSchema.parse({ id: input });
    await deleteSubscriber(payload.id);
    revalidateSubscribers();
  } catch (e) {
    return handleErrors(e);
  }
};