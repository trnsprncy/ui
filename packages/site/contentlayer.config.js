import { rehypeComponent } from "./src/lib/rehype-component";
import { rehypeNpmCommand } from "./src/lib/rehype-installation-command";
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "@contentlayer2/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

/** @type {import('@contentlayer2/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => {
      console.log(doc._raw);
      return `/${doc._raw.flattenedPath}`;
    },
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => {
      console.log("slugAsParams", doc._raw);
      return doc._raw.flattenedPath.split("/").slice(1).join("/");
    },
  },
};

const LinksProperties = defineNestedType(() => ({
  name: "LinksProperties",
  fields: {
    url: {
      type: "string",
    },
    title: {
      type: "string",
    },
  },
}));

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    links: {
      type: "list",
      of: LinksProperties,
    },
    toc: {
      type: "boolean",
      default: true,
      required: false,
    },
  },
  computedFields,
}));

/**
 * Configures the ContentLayer source for the site.
 * This function is exported as the default export of the file.
 * It sets up the content directory, document types, and various Markdown/MDX processing plugins.
 *
 * @exports default
 * @type {import('@contentlayer2/source-files').SourcePlugin}
 * @see https://contentlayer.dev/docs/reference/source-files/make-source-a5ba4922
 */
// This line exports the function `makeSource` as the default export of the module.
export default makeSource({
  // This option specifies the directory containing the content (likely Markdown files).
  contentDirPath: "./content",

  // This option defines the document types that the source can handle.
  // Presumably, `Doc` is a custom type or an imported type.
  documentTypes: [Doc],

  // This option configures how MDX files are processed.
  mdx: {
    // This option specifies remark plugins used for parsing Markdown.
    // Likely, `remarkGfm` enables GFM (GitHub Flavored Markdown) syntax.
    // `codeImport` might be a custom plugin for handling code imports.
    remarkPlugins: [remarkGfm, codeImport],

    // This option specifies rehype plugins used for transforming the AST.
    rehypePlugins: [
      // These plugins likely handle slugs, components, and basic formatting.
      rehypeSlug,
      rehypeComponent,
      // This custom plugin extracts event information from code blocks
      () => (tree) => {
        // Traverse the tree and extract event information from code blocks
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;
            if (codeEl.tagName !== "code") {
              return;
            }

            // Extract event from code block meta data
            if (codeEl.data?.meta) {
              const regex = /event="([^"]*)"/;
              const match = codeEl.data?.meta.match(regex);
              if (match) {
                // Store event data and remove it from meta
                node.__event__ = match ? match[1] : null;
                codeEl.data.meta = codeEl.data.meta.replace(regex, "");
              }
            }

            // Store additional information about the code block
            node.__rawString__ = codeEl.children?.[0].value;
            node.__src__ = node.properties?.__src__;
            node.__style__ = node.properties?.__style__;
          }
        });
      },
      // This plugin likely adds syntax highlighting with a dark theme
      rehypeNpmCommand,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
        },
      ],
      // This custom plugin processes figure elements containing pre blocks
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
              return;
            }

            const preElement = node.children.at(-1);
            if (preElement.tagName !== "pre") {
              return;
            }

            // Set properties for the pre element based on the figure element
            preElement.properties["__withMeta__"] =
              node.children.at(0).tagName === "div";
            preElement.properties["__rawString__"] = node.__rawString__;

            if (node.__src__) {
              preElement.properties["__src__"] = node.__src__;
            }

            if (node.__event__) {
              preElement.properties["__event__"] = node.__event__;
            }

            if (node.__style__) {
              preElement.properties["__style__"] = node.__style__;
            }
          }
        });
      },
    ],
  },
});
