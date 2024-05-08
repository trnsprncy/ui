"use client";

import React, { useEffect, useRef } from "react";

interface ParallaxProps {
  children: React.ReactNode;
  svgContent: React.ReactNode;
  scrollRate?: number;
}

export const ParallaxItem: React.FC<ParallaxProps> = ({
  children,
  svgContent,
  scrollRate = 0.5,
}) => {
  const parallaxSvgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxSvgRef.current) {
        parallaxSvgRef.current.style.transform = `translateY(${-(
          window.pageYOffset * scrollRate
        )}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRate]);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={parallaxSvgRef}
        className="absolute top-[50dvh] right-0 mx-auto w-full h-full z-[-1]"
      >
        <div className="w-full h-full object-cover flex flex-col justify-center items-center gap-y-3">
          {svgContent}
          <span className="font-semibold text-muted-foreground/70">
            {children}
          </span>
        </div>
      </div>
      <div className="relative z-10 py-24"></div>
    </div>
  );
};
