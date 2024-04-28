"use client";

import React from "react";

// Interface for scroller props
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
