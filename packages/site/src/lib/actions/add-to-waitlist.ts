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
  message: Record<string, string> | undefined;
};
export async function addToWaitList(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = validateSchema(formData, waitlistSchema);

  if (result && !result.data) {
    return {
      message: { error: JSON.stringify(result.message) },
    };
  }

  try {
    const email = result?.data.email;
    console.log("🚀 | email:", email);

    // send sub to drizzle
    const response = await fetch(
      "https://www.waitlist.email/api/subscribers/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Waitlist-Api-Key": String(env.WAITLIST_API_KEY),
        },
        body: JSON.stringify({
          waitlist: env.WAITLIST_ID,
          email,
        }),
      }
    );

    const body = (await response.json()) as WaitListResponse;

    if (!response.ok) {
      console.error("🚀 NOT_OK | body:", body);
      return {
        message: { error: body.message },
      };
    }

    return {
      email: body.subscriber.email,
      message: {
        success: body.message,
      },
    };
  } catch (error) {
    console.error("🚀 | Server Error");
    return {
      email: prevState.email,
      message: { error: "Server Error" },
    };
  }
}
