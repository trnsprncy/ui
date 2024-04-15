"use client";

import Banner from "@/registry/alpha/library/banner";
import CookieConsentProvider from "@trnsprncy/oss";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class">
        {children}
        <CookieConsentProvider
          necessaryTags={[
            "functionality_storage",
            "personalization_storage",
            "security_storage",
          ]}
        >
          <Banner />
          <Analytics/> 
        </CookieConsentProvider>
      </ThemeProvider>
    </>
  );
};
