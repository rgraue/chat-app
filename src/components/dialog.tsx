import { Box, CodeBlock, createShikiAdapter, Text } from "@chakra-ui/react";
import React  from "react";
import { HighlighterGeneric } from "shiki";

const langs = [
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
        ]

export const Dialog = ({
  text,
  side,
  key,
}: {
  text: string;
  side: "LEFT" | "RIGHT";
  key: number | string;
}) => {
  // const [codeBlocks, setCodeBlocks] = useState<{code: string, language: string}[]>([]);

  const borderColor = () => {
    switch (side) {
      case "RIGHT":
        return "#6699CC";
      case "LEFT":
        return "#96ae8d";
    }
  };

  const tryCodeBlock = (blocks: string[], currentBlock: number) => {
        let codeBlock = blocks[currentBlock];

        let language = "txt";
        try {
          language = codeBlock.split("\n")[0].replace("```", "");
          
          if (!langs.includes(language)) {
            language = 'txt'
          }
        // eslint-disable-next-line
        } catch {}

        codeBlock = codeBlock.substring(codeBlock.indexOf("\n"));

        try {
          return (
            <CodeBlock.AdapterProvider value={shikiAdapter} key={currentBlock}>
              <CodeBlock.Root code={codeBlock} language={language}>
                <CodeBlock.Content>
                  <CodeBlock.Code>
                    <CodeBlock.CodeText />
                  </CodeBlock.Code>
                </CodeBlock.Content>
              </CodeBlock.Root>
            </CodeBlock.AdapterProvider>
          );

        } catch {
          <Text key={currentBlock}>
            {codeBlock}
            <br />
          </Text>
        }
  }

  const format = () => {
    let isCodeBlock = false;
    let currentBlock = 0;
    const blocks: string[] = [];
    const lines = text.split("\n");
    return lines.map((s, i) => {
      if ((isCodeBlock && s.endsWith("```"))) {
        isCodeBlock = false;
        currentBlock += 1;
        
        return tryCodeBlock(blocks, currentBlock - 1);
      }

      if (s.startsWith("```")) {
        isCodeBlock = true;
        // const lang = s.replace('```', '');

        blocks.push("");
      }

      if (isCodeBlock) {
        blocks[currentBlock] += s + "\n";

        // return tryCodeBlock(blocks, currentBlock);
      }

      if (!isCodeBlock) {
        return (
          <Text key={i}>
            {s}
            <br />
          </Text>
        );
      }
    });
  };

  return (
    <Box
      key={key}
      textWrap={"pretty"}
      maxWidth={"3/4"}
      borderWidth={1}
      borderColor={borderColor()}
      borderRadius={25}
      marginTop={"1rem"}
      padding={".5rem"}
      justifySelf={side == "LEFT" ? "flex-start" : "flex-end"}
    >
      {format()}
    </Box>
  );
};

  const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
    async load() {
      const { createHighlighter } = await import("shiki");
      return createHighlighter({
        langs: langs,
        themes: ["github-dark"],
      });
    },
    theme: "github-dark",
  });
