import { WaitListForm } from "./forms/waitlist-form";
import { Icons } from "./icons";
import { Loading } from "./loading";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { siteConfig } from "@/config/site-config";
import { cn } from "@/lib/utils";
import { CircleCheckBig, X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Script from "next/script";
import React, { Suspense } from "react";
import Balancer from "react-wrap-balancer";

const REGULATIONS = ["GDPR", "CCPA", "ePrivacy", "UK GDPR"];
const followUrl = `https://twitter.com/intent/follow?screen_name=${"_trnsprncy"}`;

export default function Hero() {
  return (
    <>
      <h1
        className="max-w-4xl px-4 text-center motion-safe:animate-fade-up text:4xl font-extrabold tracking-tight opacity-0 text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-indigo-500 to-violet-300/80 bg-clip-text text-transparent"
        style={{
          animationDelay: "0.25s",
          animationFillMode: "forwards",
        }}
      >
        <Balancer>
          Cookie Consent Compliance{" "}
          <span className="text-foreground leading-relaxed">Simplified</span>
          <span className="bg-gradient-to-r from-indigo-400 to-violet-300/80 bg-clip-text text-transparent">
            .
          </span>{" "}
        </Balancer>
      </h1>
      <p className="max-w-3xl px-6">
        <span
          className="text-center motion-safe:animate-fade-up text-base text-muted-foreground sm:text-xl opacity-0"
          style={{
            animationDelay: "0.35s",
            animationFillMode: "forwards",
          }}
        >
          <Balancer>{siteConfig.description}</Balancer>
        </span>
      </p>
      <div
        className="motion-safe:animate-fade-up opacity-0 mt-2 mb-4 shadow-[0px_0px_100px_4px_rgba(73,8,242,0.48)] dark:shadow-[0px_0px_133px_4px_rgba(6,53,111,0.9)] rounded-xl overflow-hidden border-red-500 border-6"
        style={{
          animationDelay: "0.4s",
          animationFillMode: "forwards",
        }}
      >
        <div className="gradient-box p-1">
          <Suspense fallback={<Loading />}>
            <BannerDemo />
          </Suspense>
        </div>
      </div>
      <div
        className="opacity-0 motion-safe:animate-fade-up flex flex-col items-center gap-y-4"
        style={{
          animationDelay: "0.4s",
          animationFillMode: "forwards",
        }}
      >
        <ul
          className="flex gap-3 mb-6 motion-safe:animate-fade-up opacity-0"
          style={{
            animationDelay: "0.6s",
            animationFillMode: "forwards",
          }}
        >
          {REGULATIONS.map((regulation, i) => {
            const _i = i * 0.2;
            const delay = _i + 0.6;
            return (
              <li key={regulation}>
                <Badge
                  className="opacity-0 motion-safe:animate-fade-up flex gap-x-2 justify-between bg-background hover:bg-background/40 drop-shadow-glow"
                  variant="auto"
                  style={{
                    animationDelay: `${delay}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <CircleCheckBig className="w-5 h-5" /> {regulation}
                </Badge>
              </li>
            );
          })}
        </ul>
        <div className="w-full p-8 flex flex-col gap-y-4 border  border-indigo-500 dark:border-indigo-300/40 rounded-md bg-background/40 backdrop-blur-md">
          <strong className="max-w-4xl text-center">
            <Balancer>For Early Access, Updates and Exclusives:</Balancer>
          </strong>
          {/* <WaitListForm /> */}
          <div className="max-w-40 mx-auto w-full gradient-box rounded-md overflow-hidden">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "scale-[0.93] group cursor-pointer transition-colors py-5 hover:bg-black/60 hover:backdrop-blur-md hover:animate-pulse"
                    )}
                    style={{
                      animationDuration: "1.5s",
                    }}
                    href={followUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center justify-between space-x-2">
                      <span className="peer text-lg">Follow us on</span>
                      {Icons["twitter"]({
                        className:
                          "peer w-6 h-6 fill-current group-hover:fill-current transition-colors",
                      })}
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="bottom"
                  sideOffset={10}
                  className="bg-background border shadow-euphonious"
                >
                  <p className="text-foreground">
                    (
                    <span className="font-semibold text-indigo-400">Note:</span>{" "}
                    this action will automatically follow our twitter account.)
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* <Link @TODO: #JB4fsn/
              href={siteConfig.links.docs}
              className={cn(buttonVariants({ variant: "gooeyLeft" }))}
            >
              Get Started
            </Link> */}
      </div>
    </>
  );
}

const BannerDemo = dynamic(
  () => import("../registry/alpha/demo/fake-banner-demo"),
  {
    ssr: false,
  }
);
