"use-client";

import { CategorizedOptions } from "./categorized-options";
import { cn } from "@/lib/utils";
// import { sendGTMEvent } from "@next/third-parties/google"; // @TODO: implement GTM
import {
  type BrowserCookies,
  type EssentialTagsTupleArrays,
} from "@trnsprncy/oss/dist/types";
import {
  ESSENTIAL_TAGS,
  convertTagsToCookies,
} from "@trnsprncy/oss/dist/utils";
import { cookieExpiry } from "@trnsprncy/oss/dist/utils/constants";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type BannerOptionsBaseProps = {
  tags: EssentialTagsTupleArrays;
  consentCookie: string;
  getCookie: (cookieName: string) => string;
  setCookie: (cookie: string, cookieName: string, expiry: number) => void;
};

/**
 * Responsible for building up and syncing the options object from cookies with the consent manager context
 * Delegates renderSwitch to render out the options and assign functionality.
 *
 * @export
 * @param {BannerOptionsBaseProps} { tags: EssentialAnalyticsTagsTupleArrays, consentCookie: string }
 * @return {*} {React.ReactNode}
 */
export function BannerOptionsBase({
  tags,
  consentCookie,
  getCookie,
  setCookie,
}: BannerOptionsBaseProps) {
  const [cookies, setCookies] = useState<Partial<BrowserCookies>>(() =>
    convertTagsToCookies(tags)
  );
  /**
   * isCheck state is used to determine if the user has opted out of all tags in a given category
   * this tuple is used to determine if the category switch should be toggled on or off
   */
  const [isChecked, setIsChecked] = useState([
    tags[0]?.every((tag) => !!cookies[tag as keyof typeof cookies]),
    tags[1]?.every((tag) => !!cookies[tag as keyof typeof cookies]),
  ]);

  const [selectedKeys] = useState<EssentialTagsTupleArrays>(() => {
    // coerce tags into selectedKeys shape
    return [
      tags[0]?.every((tag) => {
        const isEssentialTag = ESSENTIAL_TAGS.includes(tag);
        if (!isEssentialTag) {
          console.warn("Invalid essential tag provided: ", tag);
        }
        return isEssentialTag;
      })
        ? tags[0]
        : undefined,
      tags[1]?.every((tag) => ESSENTIAL_TAGS.includes(tag))
        ? tags[1]
        : undefined,
    ];
  });

  const handleConsentUpdate = useCallback(
    (consentUpdate: Partial<BrowserCookies>) => {
      try {
        const _cookies = JSON.parse(getCookie(consentCookie) || "{}");

        const _updatedCookie = {
          ...convertTagsToCookies(selectedKeys),
          ..._cookies,
          ...consentUpdate,
        };

        // update the consent cookie
        setCookie(_updatedCookie, consentCookie, cookieExpiry);

        // @TODO: update the consent in GTM
        // // transform_updatedCookie  to consent
        // const consent = convertCookieToConsent(_updatedCookie);
        // // sendGTMEvent(consent);
        toast.success(
          `trnsprncy: Consent updated ${JSON.stringify(consentUpdate)}`,
          {
            icon: "🍪",
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
    [consentCookie, getCookie, selectedKeys, setCookie]
  );

  const updateCookiesState = useCallback(
    (cookies: Partial<BrowserCookies>) => {
      setCookies((prev) => {
        const updatedCookies = { ...prev, ...cookies };

        setIsChecked([
          tags[0]?.every(
            (tag) => !!updatedCookies[tag as keyof typeof updatedCookies]
          ),
          tags[1]?.every(
            (tag) => !!updatedCookies[tag as keyof typeof updatedCookies]
          ),
        ]);
        return updatedCookies;
      });

      handleConsentUpdate(cookies);
    },
    [handleConsentUpdate, tags]
  );
  return (
    <div className="grid gap-2 min-w-2xl w-full">
      <div
        className={cn(
          "w-full p-2 bg-background/40 backdrop-blur-md rounded-md z-10 [&:not(:first-child)]:border-t transition-opacity duration-150"
        )}
      >
        {tags.map((tags, index) => (
          <CategorizedOptions
            key={index}
            tagGroup={tags}
            index={index}
            updateCookiesState={updateCookiesState}
            isChecked={isChecked}
            cookies={cookies}
          />
        ))}
      </div>
    </div>
  );
}
