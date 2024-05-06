"use client";

import { BentoCard } from "./bento-card";
import { bentoRowBottom, bentoRowTop } from "./bento-cards";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { InView } from "react-intersection-observer";

export function BentoSection() {
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
        {bentoRowTop.map((card, i) => {
          const width = i === 1 ? "" : "md:w-[64%]";
          return (
            <BentoCard
              key={card.title}
              {...card}
              className={cn("w-full", width)}
              {...Object.assign({}, i === 1 && { highlight: true })}
            />
          );
        })}
      </div>
      <div className="w-full flex flex-col md:flex-row gap-y-2 md:gap-x-2">
        <BentoCard {...bentoRowBottom[0]} className="md:w-[50%]" />
        <BentoCard {...bentoRowBottom[1]} className="md:w-full" />
        <BentoCard {...bentoRowBottom[2]} className="md:w-[50%]" />
      </div>
    </InView>
  ) : null;
}
