import { createShikiAdapter } from "@chakra-ui/react";
import React from "react";
import { HighlighterGeneric } from "shiki";

export const langs = [
          "tsx",
          "scss",
          "html",
          "bash",
          "json",
          "java",
          "scala",
          "rust",
          "ts",
          "js",
          "jsx",
          "css",
          "txt",
          "md",
          "sh",
          "graphql",
          "c#",
          "c++",
          "yaml",
          "python",
          "groovy"
        ];

let shikiAdapter: any = undefined;

export const getShikiAdapter = () => {
  if (!shikiAdapter) {
    shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
      async load() {
        const { createHighlighter } = await import("shiki");
        return createHighlighter({
          langs: langs,
          themes: ["github-dark"],
        });
      },
      theme: "github-dark",
      });
  }

  return shikiAdapter;
}