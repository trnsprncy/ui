export const styles = [
  // this manages which folder in the registry to look for components
  {
    name: "alpha",
    label: "alpha",
  },
] as const;

export type Style = (typeof styles)[number];
