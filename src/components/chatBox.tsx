import { Container, ScrollArea, Input, IconButton, Group, Switch, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDevice } from "../hooks/useDevice";
import { FiArrowRight, FiTrash } from 'react-icons/fi'
import { Dialog } from './dialog'
import { useAskPrompt } from "../hooks/useAsk";

const uuid = () => {
    return `${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`
}

export const ChatBox = () => {
    const device = useDevice();
    const [prompt, setPrompt] = useState("");
    const [dialog, setDialog] = useState<React.ReactElement[]>([]);
    const [currentDialogKey, setCurrentDialogKey] = useState<string | number>();
    const {mutate, data, isSuccess, isError} = useAskPrompt();
    const [verbose, setVerbose] = useState(false);

    useEffect(() => {
        if (isError) {
            addErrorDialog();
        }

        if (isSuccess) {
            parseResponse(data!);
        }
    }, [isSuccess, isError, data]);

    const addErrorDialog = () => {
        setDialog(dialogs => {
            return dialogs.map(d => {
                if (d.key == currentDialogKey) {
                    return <Dialog text={'Error occurred. Please try again.'} side="LEFT" key={currentDialogKey} />
                }
                return d;
            })
        })
    }

    const addDialog = () => {
        const rightUUID = uuid()
        setDialog(old => [...old, <Dialog text={prompt} side={"RIGHT"} key={rightUUID}/>]);
        mutate({prompt, verbose});
        const leftUUID = uuid()
        setCurrentDialogKey(leftUUID);
        setDialog(old => [...old, <Dialog text={"..."} side={"LEFT"} key={leftUUID}/>]);
        setPrompt("");
    }

    const clearDialog = () => {
        setDialog(old => []);
    }

    const parseResponse = async (data: ReadableStream) => {
        const reader = data.getReader();

        if (!reader) {
            return;
        }

        const decoder = new TextDecoder();
        let buffer = ''
        while (true) {
            const {done, value} = await reader.read();

            if (done) {
                flushBuffer(buffer);
                break;
            }

            const decoded = decoder.decode(value)
            const lines = decoded.split('\n')
            lines.forEach(line => {
                try {
                    if (line.length > 0){
                        const obj = JSON.parse(line);
                        buffer += obj.message.content;
                    } else {
                        // this is kinda weird...
                        // buffer += '\n';
                    }
                } catch (e) {
                    console.log(line, (e as Error).message);
                }

            })
            flushBuffer(buffer);
        }
    }

    const flushBuffer = (buffer: string) => {
        setDialog(dialogs => {
            return dialogs.map(d => {
                if (d.key == currentDialogKey) {
                    return <Dialog text={buffer} side="LEFT" key={currentDialogKey} />
                }

                return d;
            })
        })
    }


    return (
        <Container width={device=='MOBILE' ? '3/4': '3/5'}>
            <Container borderWidth={1} borderColor={'gray'} borderRadius={10}>
                <ScrollArea.Root height='70vh'>
                    {/* @ts-expect-error chakra is whack*/}
                    <ScrollArea.Viewport>
                        {/* @ts-expect-error chakra is whack*/}
                        <ScrollArea.Content>
                            {dialog}
                        </ScrollArea.Content>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar />
                </ScrollArea.Root>
                <Group attached w="full"  marginBottom={'1rem'}>
                    <Input 
                        placeholder={"How can I help?"}
                        name={'prompt'} 
                        value={prompt} 
                        onChange={(val) => setPrompt(val.currentTarget.value)}
                        />
                        <IconButton onClick={addDialog} disabled={prompt.length <= 0}>
                            <FiArrowRight/>
                        </IconButton>
                </Group>
            </Container>
            <Flex direction={'row'} justify='space-between' marginTop={1}>
                <Switch.Root
                    checked={verbose}
                    // eslint-disable-next-line
                    onCheckedChange={(e: any) => setVerbose(e.checked)}
                >
                    <Switch.HiddenInput />
                    <Switch.Control />
                    {/* @ts-expect-error chakra is whack*/}
                    <Switch.Label>Verbose Response</Switch.Label>
                </Switch.Root>
                <IconButton justifySelf={'flex-end'} onClick={clearDialog} variant={'ghost'}>
                    <FiTrash/>
                </IconButton>
            </Flex>
        </Container>
    );
}