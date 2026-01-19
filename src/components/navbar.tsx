import { Box, Container, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { ColorModeButton } from "./ui/color-mode";
import { TfiCommentAlt } from "react-icons/tfi";
import { Tooltip } from "./ui/tooltip";
import { useModelsAvailable } from "../hooks/useMeta";
import { SelectModel } from "./selectModel";
import { FiCloudOff } from "react-icons/fi";
import { useDevice } from "../hooks/useDevice";

export const Navbar = ({workspaceSetter}: {workspaceSetter: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const {data, isSuccess, isError} = useModelsAvailable();
    const device = useDevice();

    const toggleViewWorkspaces = () => {
        workspaceSetter(v => !v);
    }

    return (
        <Box paddingTop={'1rem'} paddingBottom={'1rem'} paddingEnd={'5rem'} paddingStart={'5rem'}>
            <Flex direction={device == 'BROWSER' ? 'row': 'column-reverse'} justify={'space-between'}>
                <Flex direction={'row'} alignItems={'center'} gap={'2'} w={'25%'}>
                    <Tooltip content={"Workspaces"}>
                        <IconButton variant={'ghost'} onClick={toggleViewWorkspaces}>
                            <TfiCommentAlt />
                        </IconButton>
                    </Tooltip>
                    {isSuccess && <SelectModel models={data}/>}
                    {isError && <Tooltip content={'No connection to model'}><FiCloudOff /></Tooltip>}
                </Flex>
                <Flex w={'50%'} justifyContent={'center'}>Ask Oryn</Flex>
                {device == 'BROWSER' && <Flex w={'25%'} direction={'row-reverse'}><ColorModeButton /></Flex>}
            </Flex>
        </Box>
    );
}