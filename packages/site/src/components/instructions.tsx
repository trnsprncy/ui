/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kxL0zu7EIdu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

const INSTRUCTION_STEPS = [
  {
    title: "Install our package",
    description:
      "Start by installing trnsprncy into your existing project using your favorite package manager.",
    // code: "$ npm i @trnsprncy/oss",
  },
  {
    title: "Add the Consent Provider",
    description:
      "Import and use the `<ConsentProvder/>` context component into your app's top-level layout.",
    // code: "import { ConsentProvider } from '@trnsprncy/oss'",
    // link: {
    //   href: "#",
    //   text: "Please refer to our documentation for further reference.",
    // },
  },
  {
    title: "Create your UI",
    description:
      "You can simply use our prebuilt UI components or create your own using our primitives.",
    note: "You can either copy and paste components or use our Shadcn-inspired CLI to generate them.",
  },
];

export function Instructions() {
  return (
    <div className="flex flex-col space-y-8 px-6 md:p-0">
      <div className="flex flex-col md:flex-row md:justify-between items-stretch md:space-x-4">
        {INSTRUCTION_STEPS.map((step, index) => (
          <InstructionCard key={index} order={index + 1} {...step} />
        ))}
      </div>
    </div>
  );
}

type InstructionCardProps = {
  order: number;
  title: string;
  description: string;
  code?: string;
  link?: {
    href: string;
    text: string;
  };
  note?: string;
};

function InstructionCard({
  order,
  title,
  description,
  code,
  link,
  note,
}: InstructionCardProps) {
  return (
    <Card className="flex-1 w-full h-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{order}</Badge>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">
          <Balancer>{description}</Balancer>
        </CardDescription>
        {code ? (
          <pre className="p-4 rounded-md mt-4 text-xs bg-muted/60 max-w-xs overflow-x-hidden">
            <code>{code}</code>
          </pre>
        ) : null}
        {link ? (
          <div className="flex items-center gap-x-4 text-blue-600 ">
            <ExternalLink className="block w-8 text-current" />
            <Link
              className="text-xs hover:underline mt-4 block"
              href={link?.href ?? ""}
            >
              {link?.text}
            </Link>
          </div>
        ) : null}
        {note ? (
          <p className="text-xs text-yellow-600 hover:underline mt-4 block">
            {note}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
