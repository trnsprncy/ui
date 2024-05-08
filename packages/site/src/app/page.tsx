import { SubtleCard } from "@/components/cards/subtle-card";
import { BentoSection } from "@/components/feature/bento-section";
import Hero from "@/components/hero";
import { Icons } from "@/components/icons";
import { Instructions } from "@/components/instructions";
import { Parallax } from "@/components/parallax";
import { ParallaxItem } from "@/components/parallax-svg";
import Balancer from "react-wrap-balancer";

export default async function Home() {
  return (
    <>
      <main
        id="main-content"
        className="w-full h-full flex flex-1 flex-col shadow-euphonious mb-24"
      >
        <Parallax
          backgroundComponent={
            <div className="absolute inset-0 dark:bg-dot-white/[0.4] bg-dot-black/[0.4] dot-grid bg-fixed" />
          }
        >
          {/* <ParallaxItem
            svgContent={Icons["logo"]({ width: "10%", height: "10%" })}
          > */}
          <section className="relative my-12 w-full mx-auto flex-1 flex flex-col items-center justify-center gap-y-4 z-10">
            <Hero />
          </section>
          {/* </ParallaxItem> */}
        </Parallax>
        <section className="relative my-12 w-full mx-auto px-6 md:p-0">
          <div className="relative flex flex-col items-center gap-y-4 my-24">
            <h2 className="leading-loose text-center text-5xl font-semibold  bg-gradient-to-r from-muted-foreground to-muted-foreground/50 bg-clip-text text-transparent">
              What is trnsprncy?
            </h2>

            <div className="max-w-6xl flex flex-col md:flex-row items-stretch gap-y-12 md:gap-x-12 overflow-hidden p-6">
              <SubtleCard
                title="OSS"
                body={[
                  `Open source consent manager with sensible defaults to help you get up and running
                quickly. Uses a highly optimized solution for enabling GTM in
                Next.js applications.`,
                ]}
              />{" "}
              <div className="min-w-72 h-42 subtle-surface bg-opacity-20 text-center bg-grid-small-black/[0.9] dark:bg-grid-small-white/[0.1] bg-fixed">
                <ParallaxItem
                  svgContent={Icons["logo"]({ width: "35%", height: "35%" })}
                >
                  <p>Consent Simplified</p>
                </ParallaxItem>
              </div>
              <SubtleCard
                title="UI"
                body={[
                  `Optional drop-in UI components to get you up and running right away, or allow you to roll your own consent using our primitives.`,
                  `Or use our Shadcn inspired CLI`,
                ]}
              />
            </div>
            <div className="max-w-2xl flex flex-row items-center gap-x-8 justify-between overflow-hidden my-24">
              <div>
                <h3 className="pb-2 text-left text-5xl font-semibold bg-gradient-to-r from-muted-foreground to-muted-foreground/50 bg-clip-text text-transparent">
                  Why trnsprncy?
                </h3>
                <p className="text-muted-foreground/70 text-sm pt-3">
                  Build Trust. Eliminate ambiguity. Increase transparency.{" "}
                </p>
              </div>
              <div className="flex flex-col gap-y-6">
                <p className="text-left w-full mx-auto">
                  <Balancer>
                    We believe the web can be a safer place. trnsprncy empowers
                    users by giving them control over their data and protecting
                    their privacy.
                  </Balancer>
                </p>
                <p className="text-left w-full mx-auto">
                  <Balancer>
                    As developers we built trnsprncy with the goal of
                    simplifying consent and removing the ambiguity of
                    international compliance regulations.
                  </Balancer>
                </p>
              </div>
            </div>
            <div className="max-w-6xl">
              <Instructions />
            </div>
          </div>
        </section>
        <section className="relative w-full h-full min-h-[100dvh] mx-auto sheen pb-24 px-12 before:content=[' '] before:absolute before:inset-0 before:bg-dot-black/[0.1] before:dark:bg-dot-white/[0.1]">
          <BentoSection />
        </section>
      </main>
    </>
  );
}
