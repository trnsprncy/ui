import { z } from "zod";

export const registrySchema = z.array(
  z.object({
    name: z.string(),
    dependencies: z.array(z.string()).optional(),
    devDependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    fileDependencies: z.array(z.string()).optional(),
    uiDependencies: z.array(z.string()).optional(),
    files: z.array(z.string()),
    type: z.enum([
      "components:library",
      "components:extension", // @TODO: remove extension type
      "components:demo",
      "components:example",
    ]),
  })
);

export type Registry = z.infer<typeof registrySchema>;
