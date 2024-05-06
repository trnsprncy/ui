import { Overview } from "../charts/overview";
import { GDPR } from "../regulatory-icons/gdpr";
import { Badge } from "../ui/badge";
import { CARD_ICONS } from "./card-icons";

export const bentoRowTop = [
  {
    title: "User Data Protection",
    description: "",
    body: "We apply sensible defaults to simplify compliance and protect user data",
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
    title: "Avoid Potentially Massive Fines",
    description: "",
    body: `It's not just the big companies that are impacted. Compliance must be at the forefront of your strategy.`,
    footer: [],
    component: Overview,
    leftSlot: CARD_ICONS["govt"]({ className: "w-14 h-12 text-right" }),
    rightSlot: <GDPR className="w-10" />,
  },
];

export const bentoRowBottom = [
  {
    title: "Automatically Block Cookies",
    description: "",
    body: "Once enabled, consent is mandated before cookies are allowed.",
    footer: ["gdpr", "ccpa"],
    leftSlot: CARD_ICONS["block"]({
      className: "w-12",
    }),
  },
  {
    title: "Quick Setup",
    description: "",
    body: `
      Install the consent provider, and install the UI components. 
    `,

    list: [
      "Wrap your app with the consent provider",
      "Copy UI components or use our new (Shadcn inspired) CLI!",
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
    body: `Optimized specifically for Next.js applications.`,
    footer: ["gdpr"],
    leftSlot: CARD_ICONS["google"]({ className: "w-12" }),
  },
];
