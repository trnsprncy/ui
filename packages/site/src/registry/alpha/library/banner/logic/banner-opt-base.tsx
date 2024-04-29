"use-client";

import { CategorizedOptions } from "./categorized-options";
import { useMockBrowserCookies } from "@/hooks/demo/use-mock-browser-cookies";
import { cn } from "@/lib/utils";
import {
  EssentialTags,
  NonEssentialTags,
  type BrowserCookies,
  type EssentialTagsTupleArrays,
} from "@trnsprncy/oss/dist/types";
import {
  ESSENTIAL_TAGS,
  convertTagsToCookies,
} from "@trnsprncy/oss/dist/utils";
import { cookieExpiry } from "@trnsprncy/oss/dist/utils/constants";
import { convertCookieToConsent } from "@trnsprncy/oss/dist/utils/cookie-conversion-utils";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type BannerOptionsBaseProps = {
  tags: EssentialTagsTupleArrays;
  consentCookie: string;
  open?: boolean;
  onClose?: () => void;
};

/**
 * Check if the user has opted out of all essential tags
 * This will return a warning if the user has opted out of all essential tags
 *
 * @param {EssentialTags[]} {tags}
 * @return {*} {boolean}
 */
function checkEssentialTags(tags: EssentialTags[]) {
  if (!tags.length || !Array.isArray(tags)) {
    console.warn(
      "Analytics and tracking is not enabled. No essential tags were provided. Please ensure that this was intentional"
    );
    return false;
  }
  return tags.every((tag) => {
    const isEssentialTag = ESSENTIAL_TAGS.includes(tag);
    if (!isEssentialTag) console.warn("Invalid essential tag provided: ", tag);
    return isEssentialTag;
  });
}

/**
 * Check if the user has opted out of all tracking tags
 * This will return a warning if the user has opted out of all tracking tags
 *
 * @param {NonEssentialTags[]} tags
 * @return {*} {boolean}
 */
function checkNonEssentialTags(tags: NonEssentialTags[]) {
  if (!tags.length || !Array.isArray(tags)) {
    console.warn(
      "You have opted out of all tracking tags. Please ensure that this was intentional."
    );
    return false;
  }
  return tags.every((tag) => ESSENTIAL_TAGS.includes(tag));
}

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
}: BannerOptionsBaseProps) {
  const { getCookie, setCookie } = useMockBrowserCookies();
  const [cookies, setCookies] = useState<Partial<BrowserCookies>>(() =>
    convertTagsToCookies(tags)
  );
  /**
   * isCheck state is used to determine if the user has opted out of all tags in a given category
   * this tuple is used to determine if the category switch should be toggled on or off
   *
   *
   */
  const [isChecked, setIsChecked] = useState([
    tags[0]?.every((tag) => !!cookies[tag as keyof typeof cookies]),
    tags[1]?.every((tag) => !!cookies[tag as keyof typeof cookies]),
  ]);

  const [selectedKeys] = useState<EssentialTagsTupleArrays>(() => {
    // coerce tags into selectedKeys shape
    const hasEssentialTags = tags[0] && checkEssentialTags(tags[0]);
    const hasNonEssentialTags = tags[1] && checkNonEssentialTags(tags[1]);

    return [
      hasEssentialTags ? tags[0] : [], // essential tags should never be empty
      hasNonEssentialTags ? tags[1] : [], // nonessential tags can be empty
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
        // transform_updatedCookie  to consent
        const consent = convertCookieToConsent(_updatedCookie);
        // update the consent in GTM
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
  const [accordion, setAccordion] = useState<"Essential" | "Analytics" | null>(
    null
  );

  const toggleAccordion = (accordionName: "Essential" | "Analytics") => {
    if (accordion === accordionName) {
      setAccordion(null);
    } else {
      setAccordion(accordionName);
    }
  };

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
