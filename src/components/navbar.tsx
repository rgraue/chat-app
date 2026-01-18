import { Box, Container, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { ColorModeButton } from "./ui/color-mode";
import { TfiCommentAlt } from "react-icons/tfi";
import { Tooltip } from "./ui/tooltip";

export const Navbar = ({workspaceSetter}: {workspaceSetter: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const toggleViewWorkspaces = () => {
        workspaceSetter(v => !v);
    }

    return (
        <Container paddingTop={'1rem'} paddingBottom={'1rem'}>
            <Flex direction={'row'} gap={10} justify={'space-between'}>
                <Box>
                    <Tooltip content={"Workspaces"}>
                        <IconButton variant={'ghost'} onClick={toggleViewWorkspaces}>
                            <TfiCommentAlt />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box>Ask Oryn</Box>
                <Box><ColorModeButton /></Box>
            </Flex>
        </Container>
    );
}