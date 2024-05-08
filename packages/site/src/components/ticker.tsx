"use client";

import React from "react";

interface TickerProps {
  speed?: "fast" | "slow";
  direction?: "left" | "right";
}

export const Ticker: React.FC<TickerProps & { children?: React.ReactNode }> = ({
  speed = "fast",
  direction = "right",
  children,
}) => {
  return (
    <div className="max-w-4xl relative flex overflow-x-hidden ">
      <ul className="px-4 flex flex-wrap gap-x-24 w-max animate-marquee whitespace-nowrap">
        <>
          {React.Children.toArray(children).map((child) => (
            <li
              key={child.toString()}
              aria-hidden
              className="opacity-0 animate-marquee whitespace-nowrap"
            >
              {child}
            </li>
          ))}
        </>
      </ul>
      <ul className="absolute top-0 px-4 flex flex-wrap gap-x-24 w-max animate-marquee2 whitespace-nowrap">
        <>
          {React.Children.toArray(children).map((child) => (
            <li
              key={child.toString()}
              aria-hidden
              className="animate-marquee2 whitespace-nowrap"
            >
              {child}
            </li>
          ))}
        </>
      </ul>
    </div>
  );
};

/**
 * @Usage
 * <section className="relative w-full max-w-3xl mx-auto my-36 border-x-4 border-white border-l border-r text-white">
      <p className="text-lg text-center pb-12">Our tools in crafting UI.</p>
      <Ticker>
        {[Icons["logo"], Icons["Ui"], Icons["Npmjs"], Icons["gitHub"]].map(
          (icon, i) => (
            <span key={i}>{icon({ width: "64px", height: "64px" })}</span>
          )
        )}
      </Ticker>
    </section> 
 * 
 */
