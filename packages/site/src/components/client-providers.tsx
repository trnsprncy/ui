"use client";

import { TailwindIndicator } from "./tailwind-indicator";
import BannerShell from "@/registry/alpha/library/banner/banner-shell";
import TrnsprncyProvider from "@trnsprncy/oss";
import { Analytics } from "@vercel/analytics/react";
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
          essentialTags={["functionality_storage", "personalization_storage"]}
          nonEssentialTags={["security_storage"]}
        >
          <BannerShell lockBodyScroll placement="bottom" />
        </TrnsprncyProvider>
        <TailwindIndicator />
        <Toaster richColors position="bottom-center" />

        <Analytics />
      </ThemeProvider>
    </>
  );
};
