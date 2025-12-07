import { Container, ScrollArea, Input, InputGroup, Button, IconButton, Group } from "@chakra-ui/react";
import React, { JSX, useState } from "react";
import { useDevice } from "../hooks/useDevice";
import {FiArrowRight} from 'react-icons/fi'
import { Dialog } from './dialog'

export const ChatBox = () => {
    const device = useDevice();
    const [prompt, setPrompt] = useState("");
    const [dialog, setDialog] = useState<React.ReactElement[]>([])

    const addDialog = () => {
        setDialog(old => [...old, <Dialog text={prompt} side={"RIGHT"}/>]);
        setPrompt("");
    }


    return (
        <Container borderWidth={1} borderColor={'gray'} borderRadius={10}  width={device=='MOBILE' ? '3/4': '1/2'}>
            <ScrollArea.Root height="35rem">
                {/* @ts-ignore */}
                <ScrollArea.Viewport>
                    {/* @ts-ignore */}
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
    );
}