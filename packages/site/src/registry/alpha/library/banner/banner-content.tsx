import Link from "next/link";

export type BannerContentProps = React.PropsWithChildren<{
  heading?: string;
  description?: string;
  href?: string;
  label?: string;
}>;

/**
 * Responsible for rendering the content inside the banner shell
 * takes in 4 key static props: {heading, description, href, label}
 *
 * @export
 * @param {BannerContentProps} React.PropsWithChildren<{
 *   heading?: string, description?: string, href?: string, label?: string
 * }>
 * @return {*} {React.ReactNode}
 */
export function BannerContent({
  heading,
  description,
  href,
  label,
}: BannerContentProps) {
  return (
    <div className="flex flex-col justify-center gap-y-2 mr-2 flex-1 text-sm text-foreground">
      <strong>{heading ?? "trnsprncy"}</strong>

      <p>
        {description ??
          "We use cookies to improve your experience, manage your preferences, and provide better content."}{" "}
        <span className="text-primary/60 dark:text-primary-400 ">
          For details see our{"  "}
        </span>
        <Link
          href={href ?? "/policies/cookies"}
          className="text-indigo-900 dark:text-indigo-500 hover:underline"
        >
          {label ?? "cookie policy"}
        </Link>
        .
      </p>
    </div>
  );
}
