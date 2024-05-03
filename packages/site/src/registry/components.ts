import { Registry } from "./schema";

// @TODO: rename extension to library
const extension: Registry = [
  {
    name: "banner-content",
    type: "components:library",
    dependencies: [],
    registryDependencies: [],
    uiDependencies: [],
    files: ["library/banner/banner-content.tsx"],
  },
  // {
  //   name: "banner-opt-base",
  //   type: "components:library",
  //   dependencies: ["@trnsprncy/oss"],
  //   registryDependencies: ["categorized-options"],
  //   uiDependencies: ["toast"],
  //   files: ["library/banner/banner-opt-base.tsx"],
  // },
  // {
  //   name: "banner-options",
  //   type: "components:library",
  //   dependencies: ["@trnsprncy/oss"],
  //   registryDependencies: ["categorized-options"],
  //   uiDependencies: [],
  //   files: ["library/banner/banner-options.tsx"],
  // },
  {
    name: "banner-shell",
    type: "components:library",
    dependencies: ["@radix-ui/react-slot", "@trnsprncy/oss"],
    registryDependencies: ["banner-content", "banner-trigger"],
    uiDependencies: [],
    files: ["library/banner/banner-shell.tsx"],
  },
  {
    name: "banner-switch",
    type: "components:library",
    dependencies: [],
    registryDependencies: ["switch-w-thumb"],
    uiDependencies: [],
    files: ["library/banner/banner-switch.tsx"],
  },
  {
    name: "banner-trigger",
    type: "components:library",
    dependencies: ["@trnsprncy/oss"],
    registryDependencies: [],
    uiDependencies: ["button"],
    fileDependencies: ["utils/triggers"],
    files: ["library/banner/banner-trigger.tsx"],
  },
  {
    name: "bare-banner-trigger",
    type: "components:library",
    dependencies: ["@trnsprncy/oss"],
    registryDependencies: [],
    uiDependencies: ["toast", "button"],
    fileDependencies: ["utils/triggers"],
    files: ["library/banner/bare-banner-trigger.tsx"],
  },
  {
    name: "switch-w-thumb",
    type: "components:library",
    dependencies: ["@radix-ui/react-switch"],
    registryDependencies: [],
    uiDependencies: [],
    files: ["library/banner/switch-w-thumb.tsx"],
  },
  {
    name: "trnsprncy-button",
    type: "components:library",
    dependencies: [],
    registryDependencies: ["banner-options"],
    uiDependencies: ["button", "popover"],
    files: ["library/banner/trnsprncy-button.tsx"],
  },

  {
    name: "categorized-options",
    type: "components:library",
    dependencies: ["@trnsprncy/oss"],
    registryDependencies: ["banner-switch"],
    uiDependencies: ["accordion"],
    files: ["library/banner/categorized-options.tsx"],
  },
];

const demos: Registry = [
  {
    name: "custom-banner",
    type: "components:demo",
    dependencies: ["@trnsprncy/oss"],
    registryDependencies: [
      "banner-shell",
      "banner-opts-base",
      "trnsprncy-button",
      "banner-triggers",
    ],
    uiDependencies: [""],
    files: ["demo/fake-banner-demo.tsx"],
  },
];

const examples: Registry = [];

export const registry: Registry = [...extension, ...demos, ...examples];
