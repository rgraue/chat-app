import { CodeBlock } from "@chakra-ui/react";
import React from "react";
import { getShikiAdapter, langs } from "../utils/shiki";

export const CODE_BLOCK_SEP = '<code_block>'

export const CodeBlockBuff = ({code, pos}: {code: string, pos: number}) => {

    const renderCodeBlock = () => {
        const split = code.split(CODE_BLOCK_SEP);

        let toRender = '';

        if (split.length > pos) {
            toRender = split[pos];
        }

        let language = "txt";
        try {
            language = toRender.split("\n")[0].replace("```", "");
            
            if (!langs.includes(language)) {
                language = 'txt'
            }
        // eslint-disable-next-line
        } catch {}

        toRender = toRender.substring(toRender.indexOf("\n")).replace('\n```', '');
        return (
            <CodeBlock.AdapterProvider value={getShikiAdapter()} key={CODE_BLOCK_SEP + pos}>
                <CodeBlock.Root code={toRender} language={language}>
                    <CodeBlock.Content>
                    <CodeBlock.Code>
                        <CodeBlock.CodeText />
                    </CodeBlock.Code>
                    </CodeBlock.Content>
                </CodeBlock.Root>
            </CodeBlock.AdapterProvider>
        )

    }

    return renderCodeBlock();
}