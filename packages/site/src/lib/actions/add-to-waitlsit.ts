"use server";

import { insertSubscriberSchema } from "../db/schema/subscribers";
import { insertSubscriber } from "../db/services/insertSubscriber";
import { handleLibSqlError, validateSchema } from "../db/utils";
import { LibsqlError } from "@libsql/client";

export type FormState = {
  email?: string;
  message: Record<string, string> | undefined;
};
export async function addToWaitList(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = validateSchema(formData, insertSubscriberSchema);
  console.log("🚀 | result:", result);

  if (result && !result.data) {
    console.log("🚀 | result.message:", result.message);
    return {
      email: prevState.email,
      message: { email: JSON.stringify(result.message) },
    };
  }

  try {
    const email = result?.data.email;
    console.log("🚀 | email:", email);
    // const name = String(formData.get("name")); // @TODO: expand form:  add name field

    // send sub to drizzle
    const subscriber = await insertSubscriber(email);
    console.log("🚀 | subscriber:", subscriber);

    return {
      email: subscriber.email,
      message: {
        email: "Please check your inbox for instructions to verify your email.",
      },
    };
  } catch (error) {
    if (error instanceof LibsqlError) {
      console.error("🚀 | error:", error);
      return handleLibSqlError(error);
    }
  }

  console.error("🚀 | Server Error");
  return {
    email: prevState.email,
    message: { email: "Server Error" },
  };
}
