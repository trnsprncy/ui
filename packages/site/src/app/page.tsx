import { LabelInput } from "@/components/label-input";
import { SiteFooter } from "@/components/layouts/site-footer";
import { WaitListForm } from "@/components/waitlist-form";
import { siteConfig } from "@/config/site-config";
import { env } from "@/env.mjs";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

export default async function Home() {
  return (
    <main
      id="main-content"
      className="w-full h-full flex-1 flex flex-col mt-12 p-3 md:p-0"
    >
      <div className="absolute inset-0 dark:bg-dot-white/[0.4] bg-dot-black/[0.4] dot-grid" />
      <section className="max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center gap-4">
        <h1
          className="px-4 text-center motion-safe:animate-fade-up text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-indigo-500 to-violet-300/80 bg-clip-text text-transparent"
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
        <p className="max-w-4xl my-4 px-6">
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
          className="motion-safe:animate-fade-up opacity-0 mt-2 mb-4 shadow-[0px_0px_100px_4px_rgba(73,8,242,0.48)] dark:shadow-[0px_0px_133px_4px_rgba(6,53,111,0.9)] rounded-xl overflow-hidden"
          style={{
            animationDelay: "0.4s",
            animationFillMode: "forwards",
          }}
        >
          <div className="motion-safe:gradient-box">
            <Image
              src="/banner-shot-light.png"
              alt="Banner"
              className="w-full dark:hidden rounded-xl"
              width="600"
              height="100"
              priority
            />
            <Image
              src="/banner-shot.png"
              alt="Banner"
              className="w-full hidden dark:inline-block rounded-xl"
              width="600"
              height="100"
              priority
            />
          </div>
        </div>
        <strong
          className="motion-safe:animate-fade-up opacity-0 max-w-4xl px-6 text-center"
          style={{
            animationDelay: "0.5s",
            animationFillMode: "forwards",
          }}
        >
          <Balancer>Sign up for early access.</Balancer>
        </strong>
        <WaitListForm />
        {/* <Link @TODO: #JB4fsn/
            href={siteConfig.links.docs}
            className={cn(buttonVariants({ variant: "gooeyLeft" }))}
          >
            Get Started
          </Link> */}
      </section>
      <SiteFooter />
    </main>
  );
}
