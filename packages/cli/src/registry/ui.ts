import { Registry } from "./schema";

export const ui: Registry = [
  {
    name: "banner-content",
    files: ["library/banner/banner-content.tsx"],
    type: "components:library",
  },
  {
    name: "banner-shell",
    dependencies: ["@radix-ui/react-slot", "@trnsprncy/oss"],
    uiDependencies: ["accordion", "sonner"],
    registryDependencies: ["banner-content"],
    fileDependencies: ["utils", "logic", "hooks"],
    files: [
      "library/banner/banner-shell.tsx",
      "library/banner/logic/banner-trigger.tsx",
      "library/banner/logic/banner-opt-base.tsx",
      "library/banner/logic/banner-options.tsx",
      "library/banner/logic/bare-banner-trigger.tsx",
      "library/banner/logic/categorized-options.tsx",
      "library/banner/utils/constants.ts",
      "library/banner/utils/use-lock-body-scroll.ts",
    ],
    type: "components:library",
  },
  {
    name: "banner-switch",
    registryDependencies: ["switch-w-thumb"],
    files: ["library/banner/banner-switch.tsx"],
    type: "components:library",
  },
  {
    name: "switch-w-thumb",
    dependencies: ["@radix-ui/react-switch"],
    files: ["library/banner/switch-w-thumb.tsx"],
    type: "components:library",
  },
  {
    name: "trnsprncy-button",
    uiDependencies: ["button", "popover"],
    fileDependencies: ["utils"],
    files: [
      "library/banner/trnsprncy-button.tsx",
      "library/banner/utils/constants.ts",
    ],
    type: "components:library",
  },
];
