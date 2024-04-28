"use client";

import { useEffect, useRef } from "react";

interface ParallaxProps {
  backgroundImage?: string;
  backgroundComponent?: React.ReactNode;
  children: React.ReactNode;
}

export const Parallax: React.FC<ParallaxProps> = ({
  backgroundImage,
  backgroundComponent,
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollPosition = window.pageYOffset;
        contentRef.current.style.transform = `translateY(${
          scrollPosition * 0.5
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {backgroundImage && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      {backgroundComponent && (
        <div className="absolute top-0 left-0 w-full h-full">
          {backgroundComponent}
        </div>
      )}
      <div ref={contentRef} className="relative z-10 py-32">
        {children}
      </div>
    </div>
  );
};
