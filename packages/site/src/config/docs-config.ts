export type DocsConfig = {
  title: string;
  path?: string;
  pages?: DocsConfig[];
};

export const Pages: DocsConfig[] = [
  // {
  //   title: "Kit",
  //   path: "/kit",
  // },
  // {
  //   title: "Docs",
  //   path: "/docs/introduction",
  // },
];

export const docsConfig: DocsConfig[] = [
  {
    title: "Getting Started",
    pages: [
      {
        title: "Introduction",
        path: "/docs/introduction",
      },
      {
        title: "Installation",
        path: "/docs/installation",
      },
      {
        title: "Changelog",
        path: "/docs/changelog",
      },
    ],
  },
  {
    title: "Components",
    pages: [
      // {
      //   title: "Tree view",
      //   path: "/docs/tree-view",
      // },
    ],
  },
];
