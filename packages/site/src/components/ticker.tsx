import { Icons } from "./icons";
import React, { useCallback, useEffect, useRef, useState } from "react";

const useTicker = () => {
  const [position, setPosition] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering.current) {
        setPosition((prevPosition) => prevPosition - 1);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
  }, []);

  return {
    position,
    tickerRef,
    handleMouseEnter,
    handleMouseLeave,
  };
};
export default function Ticker({ logos }: { logos: (keyof typeof Icons)[] }) {
  const { position, tickerRef, handleMouseEnter, handleMouseLeave } =
    useTicker();
  return (
    <div
      ref={tickerRef}
      className="flex items-center overflow-hidden whitespace-wrap"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {logos.map((logo, index) => (
        <div key={index}>
          {Icons[logo]({
            width: "12px",
            height: "12px",
          })}
        </div>
      ))}
    </div>
  );
}
