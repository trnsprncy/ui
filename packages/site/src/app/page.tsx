import { BentoSection } from "@/components/feature/bento-section";
import Hero from "@/components/hero";
import { Icons } from "@/components/icons";
import { Parallax } from "@/components/parallax";
import { Ticker } from "@/components/ticker";

export default async function Home() {
  return (
    <>
      <main
        id="main-content"
        className="w-full h-full flex flex-1 flex-col shadow-euphonious"
      >
        <Parallax
          backgroundComponent={
            <div className="absolute inset-0 dark:bg-dot-white/[0.4] bg-dot-black/[0.4] dot-grid bg-fixed" />
          }
        >
          <section className="relative my-12 w-full mx-auto flex-1 flex flex-col items-center justify-center gap-y-4 z-10">
            <Hero />
          </section>
        </Parallax>
        {/* <section className="relative w-full max-w-3xl mx-auto my-36 border-x-4 border-white border-l border-r text-white">
          <p className="text-lg text-center pb-12">Our tools in crafting UI.</p>
          <Ticker>
            {[Icons["logo"], Icons["Ui"], Icons["Npmjs"], Icons["gitHub"]].map(
              (icon, i) => (
                <span key={i}>{icon({ width: "64px", height: "64px" })}</span>
              )
            )}
          </Ticker>
        </section> */}
        <section className="relative w-full mx-auto sheen pb-24 px-12 before:content=[' '] before:absolute before:inset-0 before:bg-dot-black/[0.1] before:dark:bg-dot-white/[0.1] rounded-t-[15%] overflow-hidden">
          <BentoSection />
        </section>
      </main>
    </>
  );
}
