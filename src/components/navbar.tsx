import { Box, Container, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { ColorModeButton } from "./ui/color-mode";
import { TfiCommentAlt } from "react-icons/tfi";
import { Tooltip } from "./ui/tooltip";
import { useModelsAvailable } from "../hooks/useMeta";
import { SelectModel } from "./selectModel";
import { FiCloudOff } from "react-icons/fi";

export const Navbar = ({workspaceSetter}: {workspaceSetter: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const {data, isSuccess, isError} = useModelsAvailable();

    const toggleViewWorkspaces = () => {
        workspaceSetter(v => !v);
    }

    return (
        <Container paddingTop={'1rem'} paddingBottom={'1rem'}>
            <Flex direction={'row'} gap={10} justify={'space-between'}>
                    <Flex direction={'row'} alignItems={'center'} gap={'2'} w={'33vh'}>
                        <Tooltip content={"Workspaces"}>
                            <IconButton variant={'ghost'} onClick={toggleViewWorkspaces}>
                                <TfiCommentAlt />
                            </IconButton>
                        </Tooltip>
                        {isSuccess && <SelectModel models={data}/>}
                        {isError && <Tooltip content={'No connection to model'}><FiCloudOff /></Tooltip>}
                    </Flex>
                <Flex w={'33vh'} justifyContent={'center'}>Ask Oryn</Flex>
                <Flex w={'33vh'} direction={'row-reverse'}><ColorModeButton /></Flex>
            </Flex>
        </Container>
    );
}