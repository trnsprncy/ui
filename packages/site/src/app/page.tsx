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
      <div className="absolute inset-0 dark:bg-dot-white/[0.4] bg-dot-black/[0.4] dot-grid" />
      <section className="max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center gap-4">
        <h1
          className="px-4 text-center motion-safe:animate-fade-up text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          style={{
            animationDelay: "0.25s",
            animationFillMode: "forwards",
          }}
        >
          <Balancer>
            Cookie Consent Compliance{" "}
            <span className="text-foreground leading-relaxed">Simplified</span>
            <span className="text-gray-500">.</span>{" "}
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
          className="motion-safe:animate-fade-up opacity-0 mt-2 shadow-[0px_0px_133px_4px_rgba(6,53,111,0.9)]"
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
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="0 0 20 20"
        className="fill-foreground"
      >
        <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z" />
      </svg> */}
      <SiteFooter />
    </main>
  );
}
