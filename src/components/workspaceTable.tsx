import React, { useEffect, useState } from "react";
import { useWorkspace } from "../context/workspaceContext";
import { Button, Container, Flex, Group, Input, Spacer, Table, Text } from "@chakra-ui/react";
import { AddUserContextGroup } from "./addUserContextGroup";

export const WorkspaceTable = ({setActive}: {setActive: React.Dispatch<React.SetStateAction<string | undefined>>}) => {
    const workspaces = useWorkspace();

    const [lookingFor, setLookingFor] = useState<string>();
    const [createDisabled, setCreateDisabled] = useState(true);
    const [conversations, setConversations] = useState(workspaces.getConversations());

    useEffect(() => {
        convoSearchFunc();
        createDisabledFunc();
    }, [lookingFor]);

    const clearConversations = () => {
        workspaces.clearAllConversations();
        setActive(workspaces.getActiveConversation());
        convoSearchFunc();
        createDisabledFunc();
    }

    const convoSearchFunc = () => {
        if (!lookingFor || lookingFor.length == 0) {
            setConversations(x => workspaces.getConversations());
        } else {
            setConversations(x => {
                const found: string[] = []
                workspaces.getConversations().forEach(name => {
                    if (name.toUpperCase().startsWith(lookingFor.toUpperCase())) {
                        found.push(name)
                    }
                })

                return new Set(found);
            })
        }
    }

    const createDisabledFunc = () => {
        if (lookingFor) {
            if (conversations.has(lookingFor)) {
                setCreateDisabled(true)
            } else {
                setCreateDisabled(false)
            }
        } else {
            setCreateDisabled(true);
        }
    }

    const createNewWorkspace = () => {
        workspaces.createConversation(lookingFor!) // button disabling makes this safe
        setCreateDisabled(true);
        convoSearchFunc(); // refresh seach context
    }

    const activateWorkspaceButton = (name: string) => {
        const activate = () => {
            workspaces.setActiveConversation(name);
            setActive(workspaces.getActiveConversation());
            convoSearchFunc();
        }

        return (<Button onClick={activate} disabled={name == workspaces.getActiveConversation()}>Activate</Button>)
    }

    const deleteWorkspaceButton = (name: string) => {
        const deleteHelper = () => {
            workspaces.clearConversation(name);
            setActive(workspaces.getActiveConversation());
            convoSearchFunc();
        }

        return <Button onClick={deleteHelper}>Delete</Button>
    }

    const disableActiveWorkspace = () => {
        workspaces.setActiveConversation(undefined);
        setActive(undefined);
    }

    return (
        <Flex direction={'column'} h='85vh' gap={'10'}>
            <Flex direction={'row'}>
                <Input placeholder="Search WorkSpaces" onChange={(e) => setLookingFor(e.target.value)}></Input>
                <Button onClick={createNewWorkspace} disabled={createDisabled}>Create New WorkSpace</Button>
            </Flex>
            <Table.Root size="sm" striped>
            <Table.Header>
                <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Depth</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {Array.from(conversations).map((item) => (
                <Table.Row key={item}>
                    <Table.Cell>{item}</Table.Cell>
                    <Table.Cell>{workspaces.getConversation(item).length}</Table.Cell>
                    <Table.Cell textAlign="end">{
                        <Flex direction={'row-reverse'} gap={'2'}>
                            {deleteWorkspaceButton(item)}
                            {activateWorkspaceButton(item)}
                            {<AddUserContextGroup name={item}/>}
                        </Flex>
                    }</Table.Cell>
                </Table.Row>
                ))}
            </Table.Body>
            </Table.Root>
            {conversations.size == 0 && 
            <Flex direction={'row'} justifyContent={'center'}>
                <Text textStyle={'5xl'} justifySelf={'center'}>{'No Workspaces Found :('}</Text>
            </Flex>
            }
            <Spacer />
            <Flex justifySelf={'end'}>
                <Flex direction={'row'} gap={'2'}>
                    <Button onClick={disableActiveWorkspace}>Disable Workspaces</Button>
                    <Button onClick={clearConversations}>Delete All</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}