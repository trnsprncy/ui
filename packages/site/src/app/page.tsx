import { WaitListForm } from "@/components/forms/waitlist-form";
import { SiteFooter } from "@/components/layouts/site-footer";
import { Loading } from "@/components/loading";
import Ticker from "@/components/ticker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site-config";
import { BannerContent } from "@/registry/alpha/library/banner/banner-content";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Balancer from "react-wrap-balancer";

const _card = {
  title: "Card Heading",
  description: "This is a card description",
  body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eveniet pariatur labore blanditiis fugit. Obcaecati repudiandae error nisi a distinctio.",
  footer: "card Footer",
};

const BannerDemo = dynamic(() => import("./components/fake-banner-demo"), {
  ssr: false,
});

export default async function Home() {
  return (
    <main
      id="main-content"
      className="w-full h-full flex-1 flex flex-col p-5 md:p-0"
    >
      <div className="absolute inset-0 dark:bg-dot-white/[0.4] bg-dot-black/[0.4] dot-grid" />
      <section className="max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center gap-y-12">
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
        <p className="max-w-3xl my-4 px-6">
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
          <Suspense fallback={<Loading />}>
            <div className="gradient-box">
              <BannerDemo>
                <BannerContent />
              </BannerDemo>
            </div>
          </Suspense>
        </div>
        <div
          className="opacity-0 motion-safe:animate-fade-up flex flex-col items-center gap-y-4"
          style={{
            animationDelay: "0.4s",
            animationFillMode: "forwards",
          }}
        >
          <strong className="max-w-4xl px-6 text-center">
            <Balancer>Sign up for early access</Balancer>
          </strong>
          <WaitListForm />

          {/* <Link @TODO: #JB4fsn/
              href={siteConfig.links.docs}
              className={cn(buttonVariants({ variant: "gooeyLeft" }))}
            >
              Get Started
            </Link> */}
        </div>
      </section>

      <Ticker logos={["logo", "twitter", "Ui", "Npmjs", "RadixUi"]} />
      <section className="relative w-full max-w-5xl mx-auto my-36">
        <p className="text-4xl text-center font-semibold pb-12">
          Features & Benefits
        </p>
        <div className="flex gap-x-6">
          {[...Array(3).fill("")].map((_, i) => (
            <FeatureCard key={i} {..._card} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  body: string;
  footer: string;
};
function FeatureCard({ title, description, body, footer }: FeatureCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <p className="font-bold text-2xl">{title}</p>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
      <CardFooter className="text-sm text-gray-500">{footer}</CardFooter>
    </Card>
  );
}
