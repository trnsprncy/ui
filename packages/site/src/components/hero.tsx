import { WaitListForm } from "./forms/waitlist-form";
import { Loading } from "./loading";
import { Badge } from "./ui/badge";
import { siteConfig } from "@/config/site-config";
import FakeBannerDemo from "@/registry/alpha/demo/fake-banner-demo";
import { BannerContent } from "@/registry/alpha/library/banner/banner-content";
import { CircleCheckBig } from "lucide-react";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import Balancer from "react-wrap-balancer";

const BannerDemo = dynamic(
  () => import("../registry/alpha/demo/fake-banner-demo"),
  {
    ssr: false,
  }
);

const REGULATIONS = ["GDPR", "CCPA", "ePrivacy", "UK GDPR"];

export default function Hero() {
  return (
    <>
      <h1
        className="px-4 text-center motion-safe:animate-fade-up text:4xl font-extrabold tracking-tight opacity-0 text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-indigo-500 to-violet-300/80 bg-clip-text text-transparent"
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
        <div className="w-full p-8 flex flex-col gap-y-4">
          <strong className="max-w-4xl text-center">
            <Balancer>Sign up for early access</Balancer>
          </strong>
          <WaitListForm />
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
