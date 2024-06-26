"use client";

import { TailwindIndicator } from "./tailwind-indicator";
import BannerShell from "@/registry/alpha/library/banner/banner-shell";
import TrnsprncyProvider from "@trnsprncy/oss";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <ThemeProvider attribute="class">
        {children}
        <TrnsprncyProvider
          essentialTags={["functionality_storage", "security_storage"]}
          nonEssentialTags={["personalization_storage"]}
        >
          <BannerShell lockBodyScroll placement="bottom" />
        </TrnsprncyProvider>
        <TailwindIndicator />
        <Toaster richColors position="bottom-center" />
        <SpeedInsights />
        <Analytics />
      </ThemeProvider>
    </>
  );
};
