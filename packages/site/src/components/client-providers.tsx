"use client";

import BannerShell from "@/registry/alpha/library/banner/banner-shell";
import TrnsprncyProvider from "@trnsprncy/oss";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";

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
          essentialTags={[
            "functionality_storage",
            "personalization_storage",
            "security_storage",
          ]}
        >
          <BannerShell lockBodyScroll placement="bottom" />
        </TrnsprncyProvider>
        <Analytics />
      </ThemeProvider>
    </>
  );
};
