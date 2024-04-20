import { EmailTemplate } from "@/components/emails/FirstEmail";
import { resend } from "@/lib/email/index";
import { emailSchema } from "@/lib/email/utils";
import { NextResponse } from "next/server";

// @TODO: update email route
export async function POST(request: Request) {
  const body = await request.json();
  const { name, email } = emailSchema.parse(body);
  try {
    const data = await resend.emails.send({
      from: "trnsprncy <transparencyui@gmail.com>",
      to: [email],
      subject: "Hello world!",
      react: EmailTemplate({ firstName: name }),
      text: "Email powered by Resend.",
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
