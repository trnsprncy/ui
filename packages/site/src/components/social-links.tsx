import { Icons } from "./icons";
import { ModeToggle } from "./toggle-theme";
import { buttonVariants } from "./ui/button";
import { siteConfig } from "@/config/site-config";
import { cn } from "@/lib/utils";
import Link from "next/link";

// used by site-header and site-footer
export const SocialLinks = ({ className }: { className: string }) => {
  return (
    <div className={cn("items-center gap-1 xs:gap-1.5", className)}>
      <Link
        aria-label="Twitter"
        href={siteConfig.links.twitter}
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "icon",
          })
        )}
      >
        <Icons.twitter className="h-3 w-3 fill-current" />
      </Link>
      {/* <Link #TODO: #JB4fsn/
        aria-label="GitHub"
        href={siteConfig.links.github}
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "icon",
          })
        )}
      >
        <Icons.gitHub className="h-4 w-4" />
      </Link> */}
      <div className="hidden xs:flex">
        <ModeToggle />
      </div>
    </div>
  );
};
