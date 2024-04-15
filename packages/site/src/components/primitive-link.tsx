import { Icons } from "./icons";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const extractDomain = async (link: string) => {
  const domain = new URL(link).hostname
    .replaceAll("www.", "")
    .split(".")[0]
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  return domain;
};

interface PrimitiveLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

// used by docs pages
export const PrimitiveLink = async ({
  href,
  className,
  children,
  ...props
}: PrimitiveLinkProps) => {
  if (!href) return null;

  const currentDomain = await extractDomain(href);
  const Icon = Icons[currentDomain as keyof typeof Icons];

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        badgeVariants({ variant: "secondary" }),
        className,
        "flex items-center gap-1"
      )}
      {...props}
    >
      <Icon className="size-3" />
      {children}
    </Link>
  );
};

PrimitiveLink.displayName = "PrimitiveLink";
