"use client";

import Banner from "@/registry/alpha/library/banner/banner-shell";
import TrnsprncyProvider from "@trnsprncy/oss";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class">
        {children}
        <TrnsprncyProvider essentialTags={["functionality_storage"]}>
          <Banner />
          <Analytics />
        </TrnsprncyProvider>
      </ThemeProvider>
    </>
  );
};
