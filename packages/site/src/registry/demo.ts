import { Registry } from "./schema";

export const demo: Registry = [
  {
    name: "fake-banner-demo",
    dependencies: ["@trnsprncy/oss"],
    registryDependencies: [
      "banner-shell",
      "trnsprncy-button",
      "banner-trigger",
    ],
    fileDependencies: ["logic", "demo/hooks"],
    files: [
      "demo/fake-banner-demo.tsx",
      "library/banner/logic/banner-opt-base.tsx",
      "demo/hooks/use-mock-browser-cookies.ts",
    ],
    type: "components:demo",
  },
];
