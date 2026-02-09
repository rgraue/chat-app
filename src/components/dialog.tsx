import { Box, CodeBlock, createShikiAdapter, Text } from "@chakra-ui/react";
import React, { useState }  from "react";
import { HighlighterGeneric } from "shiki";
import { getShikiAdapter, langs} from "../utils/shiki";
import { CODE_BLOCK_SEP, CodeBlockBuff } from "./codeBlockBuff";



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

  const format = () => {
    let isCodeBlock = false;
    let currentBlock = 0;
    let blocks: string = '';
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // start
        if (line.startsWith("```") && !isCodeBlock) {
            isCodeBlock = true;

            blocks += line + '\n';
            return CODE_BLOCK_SEP
        }

        if (isCodeBlock) {
            blocks += line + '\n';

            if (line.endsWith("```")) {
                isCodeBlock = false;
                blocks += CODE_BLOCK_SEP;
                return;
            
            } 
        }

        // if not code block
        if (!isCodeBlock) {
            return <Text>{line.length > 0 ? line : <br />}</Text>
        }
    }).map(line => {
        if (line === '<code_block>') {
            currentBlock += 1;
            return <CodeBlockBuff pos={currentBlock - 1} code={blocks} />
        }

        return line;
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
