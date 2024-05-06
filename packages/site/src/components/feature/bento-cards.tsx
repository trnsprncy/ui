import { Overview } from "../charts/overview";
import { GDPR } from "../regulatory-icons/gdpr";
import { Badge } from "../ui/badge";
import { CARD_ICONS } from "./card-icons";

export const bentoRowTop = [
  {
    title: "Privacy First",
    description: "",
    body: "Proctect your user's privacy with our built-in sensible defaults. Eliminate 90% of compliance concerns by redacting all identifying data.",
    footer: ["gdpr", "eprivacy", "ccpa", "lcpd"],

    rightSlot: CARD_ICONS["data"]({ className: "w-12" }),
    leftSlot: (
      <Badge className="bg-indigo-200 dark:bg-indigo-700 text-foreground">
        ads_data_redacted
      </Badge>
    ),
  },
  {
    cardIcon: "govt",
    title: "Avoid Massive Fines",
    description: "",
    body: `Don't get caught off guard - compliance violations can be expensive and damaging to your brand. With over 4 Billion Euros in fines issued since 2018.`,
    footer: [],
    component: Overview,
    leftSlot: CARD_ICONS["govt"]({ className: "w-14 h-12 text-right" }),
    rightSlot: <GDPR className="w-10 opacity-70" />,
  },
];

export const bentoRowBottom = [
  {
    title: "Simplified Compliance",
    description: "",
    body: "Using our drop-in done-for-you UI kit, you can easily implement a compliant consent strategy in minutes.",
    footer: ["gdpr", "ccpa"],
    leftSlot: CARD_ICONS["block"]({
      className: "w-12",
    }),
  },
  {
    title: "Quick Setup",
    description: "",
    body: `
      Combine the Consent Provider open-source package with our Shadcn-inspired UI Kit to get complaint easily.
    `,

    list: [
      "Wrap your app with the consent provider",
      "Copy UI components or use our new CLI to streamline your development!",
      "Simply drop in the banner component and your all set!",
    ],
    footer: [],
    credits: ["tailwind", "shadcn"],
    leftSlot: (
      <div className="flex gap-x-4">
        {CARD_ICONS["nextjs"]({ className: "w-10" })}
      </div>
    ),
    rightSlot: (
      <ul className="flex items-center justify-center gap-x-2">
        <li>{CARD_ICONS["tailwind"]({ className: "w-10" })}</li>
        <li className="inline-block text-2xl text-indigo-200">+</li>
        <li>{CARD_ICONS["shadcn"]({ className: "w-10" })}</li>
        <li className="inline-block text-2xl text-indigo-200">+</li>
        <li>{CARD_ICONS["radix"]({ className: "w-5" })}</li>
      </ul>
    ),
  },
  {
    cardIcon: "google",
    title: "Optimized GTM",
    description: "",
    body: `Our GTM implementation is optimized specifically for Next.js application to avoid the performance pitfalls traditionally associated with Google Tag Manager.`,
    footer: ["gdpr"],
    leftSlot: CARD_ICONS["google"]({ className: "w-12" }),
  },
];
