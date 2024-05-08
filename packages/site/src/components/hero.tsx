import { Icons } from "./icons";
import { Loading } from "./loading";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { siteConfig } from "@/config/site-config";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { Suspense } from "react";
import Balancer from "react-wrap-balancer";

const followUrl = `https://twitter.com/intent/follow?screen_name=${"_trnsprncy"}`;

export default function Hero() {
  return (
    <>
      <h1
        className="max-w-6xl px-4 text-center motion-safe:animate-fade-up text:4xl font-extrabold tracking-tight opacity-0 text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-indigo-500 to-violet-300/80 bg-clip-text text-transparent"
        style={{
          animationDelay: "0.25s",
          animationFillMode: "forwards",
        }}
      >
        <Balancer>
          Simplify Consent, Safeguard Data,
          <span className="inline-block text-foreground leading-relaxed">
            and Gain Trust
          </span>
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
      <div className="flex items-center mb-16">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link // @TODO: #JB4fsn/
                href={"#" ?? siteConfig.links.docs}
                className={cn(
                  buttonVariants({ variant: "disabled", size: "lg" })
                )}
              >
                Get Started
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="leading-loose text-center text-sm max-w-sm p-1">
                🤫 Psst! We&apos;re still in the alpha stages.
                <br /> But we&apos;re glad you found us! <br />
                Be sure to{" "}
                <Link
                  href="https://twitter.com/intent/follow?screen_name=_trnsprncy"
                  className="text-indigo-400 font-semibold hover:underline"
                >
                  follow us on 𝕏
                </Link>{" "}
                for updates and early access.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        className="opacity-0 motion-safe:animate-fade-up flex flex-col items-center gap-y-4"
        style={{
          animationDelay: "0.4s",
          animationFillMode: "forwards",
        }}
      >
        <div className="px-8 py-6 pb-12 flex flex-col gap-y-4 border border-indigo-500 dark:border-indigo-300/40 rounded-md bg-background/40 backdrop-blur-md">
          <strong className="max-w-4xl text-center text-indigo-500">
            <Balancer>For Early Access and Exclusives:</Balancer>
          </strong>
          <div className="max-w-60 mx-auto w-full mb-4 gradient-box rounded-md overflow-hidden active:scale-[0.85] transform-gpu ease-in-out-sine ">
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
                <span className="peer text-lg">Follow our updates on</span>
                {Icons["twitter"]({
                  className:
                    "peer w-6 h-6 fill-current group-hover:fill-current transition-colors",
                })}
              </div>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 right-1 py-2 scale-[0.7] flex items-center gap-2">
          <p className="text-center text-xs font-semibold text-muted-foreground mb-1">
            made by:
          </p>
          <div className="flex -space-x-2 rtl:space-x-reverse">
            <Link
              href="https://x.com/dangling_hanma"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Avatar className="hover:border-2 hover:border:white hover:scale-[1.2] hover:ease-in transition-gpu">
                <AvatarImage src="https://pbs.twimg.com/profile_images/1787014305629519872/7-GAeKCm_400x400.jpg" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
            </Link>
            <Link
              href="https://x.com/soham_asmi"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Avatar className="hover:border-2 hover:border:white hover:scale-[1.2] hover:ease-in transition-gpu">
                <AvatarImage src="https://pbs.twimg.com/profile_images/1758898035617083393/Dj9pSWia_400x400.jpg" />
                <AvatarFallback>GS</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
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
