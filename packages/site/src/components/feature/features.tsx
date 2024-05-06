"use client";

import { Overview } from "../charts/overview";
import { GDPR } from "../regulatory-icons/gdpr";
import { Badge } from "../ui/badge";
import { CARD_ICONS } from "./card-icons";
import { FeatureCard } from "./feature-card";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { InView } from "react-intersection-observer";

const cardRowTop = [
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
const cardRowBottom = [
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

export function Features() {
  const mounted = useMounted();
  return mounted ? (
    <InView
      as="div"
      className="max-w-5xl mx-auto flex flex-col gap-2"
      onChange={(inView, entry) => console.log(inView, entry)}
      threshold={0.5}
    >
      <p className="text-4xl text-center font-semibold py-12"></p>
      <div className="w-full flex flex-col md:flex-row gap-y-2 md:gap-x-2">
        {cardRowTop.map((card, i) => {
          const width = i === 1 ? "" : "md:w-[64%]";
          return (
            <FeatureCard
              key={card.title}
              {...card}
              className={cn("w-full", width)}
              {...Object.assign({}, i === 1 && { highlight: true })}
            />
          );
        })}
      </div>
      <div className="w-full flex flex-col md:flex-row gap-y-2 md:gap-x-2">
        <FeatureCard {...cardRowBottom[0]} className="md:w-[50%]" />
        <FeatureCard {...cardRowBottom[1]} className="md:w-full" />
        <FeatureCard {...cardRowBottom[2]} className="md:w-[50%]" />
      </div>
    </InView>
  ) : null;
}
