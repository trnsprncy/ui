import { LabelInput } from "@/components/label-input";
import { SiteFooter } from "@/components/layouts/site-footer";
import { siteConfig } from "@/config/site-config";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

export default async function Home() {
  return (
    <main
      id="main-content"
      className="w-full h-full flex-1 flex flex-col mt-12"
    >
      <div className="absolute inset-0 opacity-50 bg-dots -z-1" />
      <section className="max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center gap-4 ">
        <h1
          className="px-4 text-center motion-safe:animate-fade-up text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          style={{
            animationDelay: "0.25s",
            animationFillMode: "forwards",
          }}
        >
          <Balancer>
            Cookie Consent Compliance{" "}
            <span className="text-foreground leading-relaxed">Simplified.</span>{" "}
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
          className="motion-safe:animate-fade-up opacity-0 mt-2"
          style={{
            animationDelay: "0.4s",
            animationFillMode: "forwards",
          }}
        >
          <div className="p-0 motion-safe:gradient-box rounded-xl mb-6">
            <Image
              src="/banner-shot-light.png"
              alt="Banner"
              className="w-full dark:hidden shadow-md"
              width="600"
              height="100"
              priority
            />
            <Image
              src="/banner-shot.png"
              alt="Banner"
              className="w-full hidden dark:inline-block shadow-md"
              width="600"
              height="100"
              priority
            />
          </div>
        </div>
        <strong className="max-w-4xl px-6 text-">
          Sign up for early access to our alpha preview.
        </strong>
        <form
          className="motion-safe:animate-fade-up flex items-center justify-center gap-y-4 opacity-0 w-full"
          style={{
            animationDelay: "0.4s",
            animationFillMode: "forwards",
          }}
        >
          <LabelInput />
          {/* <Link @TODO: #JB4fsn/
            href={siteConfig.links.docs}
            className={cn(buttonVariants({ variant: "gooeyLeft" }))}
          >
            Get Started
          </Link> */}
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}
