"use client";

import { BannerOptionsBase } from "../library/banner/logic/banner-opt-base";
import { TrnsprncyButton } from "../library/banner/trnsprncy-button";
import { useMockBrowserCookies } from "@/registry/alpha/demo/hooks/use-mock-browser-cookies";
import BannerShell from "@/registry/alpha/library/banner/banner-shell";
import { BareBannerTriggers } from "@/registry/alpha/library/banner/bare-banner-trigger";
import { _buttons } from "@/registry/alpha/library/banner/utils/triggers";
import { EssentialTags, NonEssentialTags } from "@trnsprncy/oss/dist/types";
import React from "react";

const essentialCookies = ["security_storage"] as EssentialTags[];
const nonEssentialCookies = [
  "personalization_storage",
  "functionality_storage",
] as NonEssentialTags[];

const consentCookie = "fake-consent";

export default function FakeBannerDemo() {
  const { getCookie, setCookie } = useMockBrowserCookies();
  return (
    <BannerShell
      className="bg-background rounded-xl"
      buttonGroup={
        <BareBannerTriggers
          buttons={_buttons}
          tags={[essentialCookies, nonEssentialCookies]}
        >
          <TrnsprncyButton type="submit" label="Show Me" variant="ghost">
            <BannerOptionsBase
              tags={[essentialCookies, nonEssentialCookies]}
              consentCookie={consentCookie}
              getCookie={getCookie}
              setCookie={setCookie}
            />
          </TrnsprncyButton>
        </BareBannerTriggers>
      }
    />
  );
}
