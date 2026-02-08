import { Box, CodeBlock, createShikiAdapter, Text } from "@chakra-ui/react";
import React, { useState }  from "react";
import { HighlighterGeneric } from "shiki";
import { getShikiAdapter, langs} from "../utils/shiki";



export const Dialog = ({
  text,
  side,
  key,
}: {
  text: string;
  side: "LEFT" | "RIGHT";
  key: number | string;
}) => {
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

        codeBlock = codeBlock.substring(codeBlock.indexOf("\n")).replace('\n```', '');

        try {
          return (
            <CodeBlock.AdapterProvider value={getShikiAdapter()} key={crypto.randomUUID()}>
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
          <Text key={crypto.randomUUID()}>
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
      // start
      if (s.startsWith("```") && !isCodeBlock) {
        isCodeBlock = true;
        // const lang = s.replace('```', '');

        blocks.push("");
      }

      if (isCodeBlock) {
        blocks[currentBlock] += s + "\n";

        if (s.endsWith("```")) {
          isCodeBlock = false;
          currentBlock += 1;
          return tryCodeBlock(blocks, currentBlock - 1);
        } 

        // else if (i <= lines.length) {
        //   return tryCodeBlock(blocks, currentBlock);
        // }
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
