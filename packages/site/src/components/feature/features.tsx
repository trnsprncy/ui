"use client";

import { FeatureCard } from "./feature-card";
import { cn } from "@/lib/utils";
import { InView } from "react-intersection-observer";

const _card = {
  title: "Card Heading",
  description: "This is a card description",
  body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eveniet pariatur labore blanditiis fugit. Obcaecati repudiandae error nisi a distinctio.",
  footer: "card Footer",
};

const cardRowTop = [
  {
    title: "Automatically Block Cookies",
    description: "",
    body: "Once enabled, consent is mandated before cookies are allowed.",
    footer: ["gdpr"],
    cardIcon: "block",
  },
  {
    title: "User Data Protection",
    description: "",
    body: "We apply sensible defaults to simplify compliance and protect user data",
    footer: ["gdpr", "eprivacy", "ccpa", "lcpd"],
    badge: "ads_data_redacted",
    iconPosition: "right" as "right",
    cardIcon: "data",
  },
  // {
  //   title: "Simple Drop-in Consent Compliance Solution",
  //   description: "",
  //   body: "Install in 3 Easy Steps.",
  //   footer: [],
  //   cardIcon: "nextjs",
  // },
];
const cardRowBottom = [
  {
    cardIcon: "google",
    title: "Optimized Google Tag Manager",
    description: "",
    body: `Optimized specifically for Next.js applications.`,
    footer: ["gdpr"],
  },
  {
    cardIcon: "govt",
    title: "Avoid Potentially Massive Fines",
    description: "",
    body: `Take advantage of our sensible defaults and avoid compliance nightmares.`,
    footer: [],
  },
  {
    cardIcon: "nextjs",
    title: "Quick Setup",
    description: "",
    body: `
      Install the consent provider, and install the UI components. 
    `,

    list: [
      "Wrap you app with the consent provider",
      "Copy UI components or use our new cli!",
      "Simply drop in the banner component and your all set!",
    ],
    footer: [],
  },
];

export default function Features() {
  return (
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
            />
          );
        })}
      </div>
      <div className="w-full flex flex-col md:flex-row gap-y-2 md:gap-x-2">
        <FeatureCard {...cardRowBottom[0]} className="md:w-[50%]" />
        <FeatureCard
          {...cardRowBottom[1]}
          className="md:w-full"
          iconPosition="right"
          highlight
        />
        <FeatureCard {...cardRowBottom[2]} className="md:w-[50%]" />
      </div>
    </InView>
  );
}
