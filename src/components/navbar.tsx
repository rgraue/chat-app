import { Box, Container, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { ColorModeButton } from "./ui/color-mode";
import {FiCloud} from 'react-icons/fi'

export const Navbar = () => {

    return (
        <Container paddingTop={'1rem'} paddingBottom={'1rem'}>
            <Flex direction={'row'} gap={10} justify={'space-between'}>
                <Box><Icon><FiCloud /></Icon></Box>
                <Box>Ask Oryn</Box>
                <Box><ColorModeButton /></Box>
            </Flex>
        </Container>
    );
}