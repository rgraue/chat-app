import { Container, ScrollArea, Input, IconButton, Group, Switch, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDevice } from "../hooks/useDevice";
import { FiArrowRight, FiRefreshCw, FiTrash } from 'react-icons/fi'
import { Dialog } from './dialog'
import { useAskPrompt } from "../hooks/useAsk";
import { ActiveWorkspaceTag } from "./activeWorkspaceTag";
import { useWorkspace } from "../context/workspaceContext";
import { Tooltip } from "./ui/tooltip";
import { useSystem } from "../context/systemContext";

const uuid = () => {
    return `${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`
}

export const ChatBox = ({activeWorkspace}: {activeWorkspace: string | undefined}) => {
    const workspaces = useWorkspace();
    const system = useSystem();
    const device = useDevice();
    const [prompt, setPrompt] = useState("");
    const [dialog, setDialog] = useState<React.ReactElement[]>([]);
    const [currentDialogKey, setCurrentDialogKey] = useState<string | number>();
    const {mutate, data, isSuccess, isError} = useAskPrompt();
    const [verbose, setVerbose] = useState(true);

    useEffect(() => {
        if (isError) {
            addErrorDialog();
        }

        if (isSuccess) {
            parseResponse(data!);
        }
    }, [isSuccess, isError, data]);

    useEffect(() => {
        restoreFromActive();
    }, [activeWorkspace]);

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
        // user query
        const rightUUID = uuid()
        setDialog(old => [...old, <Dialog text={prompt} side={"RIGHT"} key={rightUUID}/>]);

        // send
        mutate({
            prompt, 
            verbose, 
            model: system.getStateValue('model'), 
            conversation: activeWorkspace? workspaces.getConversation(activeWorkspace) : undefined 
        });
        
        // add user prompt to conversation after if workspace is being used.
        if (activeWorkspace) {
            workspaces.addQuery(activeWorkspace, prompt);
        }


        // system response
        const leftUUID = uuid()
        setCurrentDialogKey(leftUUID);
        setDialog(old => [...old, <Dialog text={"..."} side={"LEFT"} key={leftUUID}/>]);
        setPrompt("");
    }

    const clearDialog = () => {
        setDialog(() => []);
    }

    const restoreFromActive = () => {
        setDialog(() => 
            workspaces.getConversation(activeWorkspace!).map(message => {
                // system is left
                if (message.role == 'system') {
                    return <Dialog text={message.content} side={"LEFT"} key={uuid()}/>
                } else {
                    return <Dialog text={message.content} side={"RIGHT"} key={uuid()}/>
                }
            })
        )
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

                // add response to workspace convo if exists
                if (activeWorkspace) {
                    workspaces.addResponse(activeWorkspace, buffer);
                }
                
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
                <Group attached w="full"  marginBottom={'1rem'} marginTop={'1rem'}>
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
            <Flex direction={'row'} justify='space-between' marginTop={1} alignContent={'center'}>
                <Switch.Root
                    checked={verbose}
                     
                    onCheckedChange={(e: any) => setVerbose(e.checked)}
                >
                    <Switch.HiddenInput />
                    <Switch.Control />
                    {/* @ts-expect-error chakra is whack*/}
                    <Switch.Label>Verbose Response</Switch.Label>
                </Switch.Root>
                <Flex direction={'row'} gap={2}>
                    <ActiveWorkspaceTag active={activeWorkspace} alignSelf='center'/>
                    <Tooltip content={'Restore chat from workspace'}>
                        <IconButton onClick={restoreFromActive} disabled={!activeWorkspace} variant={'ghost'}>
                            <FiRefreshCw/>
                        </IconButton>
                    </Tooltip>
                </Flex>
                <Tooltip content={'Clear Dialog Box'}>
                    <IconButton justifySelf={'flex-end'} onClick={clearDialog} variant={'ghost'}>
                        <FiTrash/>
                    </IconButton>
                </Tooltip>
            </Flex>
        </Container>
    );
}