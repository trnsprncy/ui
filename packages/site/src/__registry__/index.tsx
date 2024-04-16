// @ts-nocheck
// This file is autogenerated by scripts/registry-builder.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {
    "alpha": {
    "banner-shell": {
      name: "banner-shell",
      type: "components:library",
      registryDependencies: ["banner-trigger"],
      component: React.lazy(() => import("@/registry/alpha/library/banner/banner-shell.tsx")),
      files: ["src/registry/alpha/library/banner/banner-shell.tsx"],
    },
    "banner-switch": {
      name: "banner-switch",
      type: "components:library",
      registryDependencies: [],
      component: React.lazy(() => import("@/registry/alpha/library/banner/banner-switch.tsx")),
      files: ["src/registry/alpha/library/banner/banner-switch.tsx"],
    },
    "banner-trigger": {
      name: "banner-trigger",
      type: "components:library",
      registryDependencies: ["trnsprncy-button"],
      component: React.lazy(() => import("@/registry/alpha/library/banner/banner-switch.tsx")),
      files: ["src/registry/alpha/library/banner/banner-switch.tsx"],
    },
    "trnsprncy-button": {
      name: "trnsprncy-button",
      type: "components:library",
      registryDependencies: ["banner-options"],
      component: React.lazy(() => import("@/registry/alpha/library/banner/trnsprncy-button.tsx")),
      files: ["src/registry/alpha/library/banner/trnsprncy-button.tsx"],
    },
  },
}
