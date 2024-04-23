"use server";

import { validateSchema } from "../db/utils";
import { env } from "@/env";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email().min(1).max(255),
});

type WaitListResponse = {
  message: string;
  subscriber: {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    referralCode?: string;
  };
};

export type FormState = {
  email?: string;
  message: string;
  success: boolean;
};
export async function addToWaitList(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = validateSchema(formData, waitlistSchema);
  console.log("🚀 | result:", result);

  if (result && !result.data) {
    return {
      success: false,
      message: JSON.stringify(result.message),
    };
  }

  try {
    const email = result?.data.email;
    console.log("🚀 | email:", email);
    // send sub to https://waitlist.email
    const response = await fetch(
      "https://www.waitlist.email/api/subscribers/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Waitlist-Api-Key": process.env.WAITLIST_API_KEY!!,
        },
        body: JSON.stringify({
          waitlist: process.env.WAITLIST_ID,
          email,
        }),
      }
    );

    const body = (await response.json()) as WaitListResponse;
    console.log("🚀 | body:", body);

    if (!response.ok) {
      return {
        success: false,
        message: body.message,
      };
    }

    return {
      email: body.subscriber.email,
      message: body.message,
      success: true,
    };
  } catch (error) {
    return {
      email: prevState.email,
      message: "Server Error",
      success: false,
    };
  }
}
