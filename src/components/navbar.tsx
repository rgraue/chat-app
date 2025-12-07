import { Box, Container, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { ColorModeButton } from "./ui/color-mode";
import { TfiCommentAlt } from "react-icons/tfi";

export const Navbar = () => {

    return (
        <Container paddingTop={'1rem'} paddingBottom={'1rem'}>
            <Flex direction={'row'} gap={10} justify={'space-between'}>
                <Box><Icon><TfiCommentAlt /></Icon></Box>
                <Box>Ask Oryn</Box>
                <Box><ColorModeButton /></Box>
            </Flex>
        </Container>
    );
}