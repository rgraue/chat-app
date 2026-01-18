import { Button, Group, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useWorkspace } from "../context/workspaceContext";

export const AddUserContextGroup = ({name}: {name: string}) => {
    const workspace = useWorkspace();
    const [context, setContext] = useState<string>('');

    const addContext = () => {
        workspace.addQuery(name, context!);
        setContext('');
    }


    return (
        <Group attached w="full" maxW="sm">
            <Input flex="1" placeholder="Add User Context" value={context} onChange={e => setContext(e.target.value)}/>
            <Button bg="bg.subtle" variant="ghost" onClick={addContext} disabled={!context}>
                Add
            </Button>
        </Group>
    )
}