import { SocialLinks } from "../social-links";
import { siteConfig } from "@/config/site-config";
import Link from "next/link";

export const SiteFooter = () => {
  return (
    <footer className="py-2 px-4 flex items-center justify-between xs:justify-center w-full">
      <p className="text-sm leading-loose xs:text-left">
        <span>
          Consent by{" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            trnsprncy
          </Link>
        </span>
      </p>
      <SocialLinks className="flex xs:hidden" />
    </footer>
  );
};
