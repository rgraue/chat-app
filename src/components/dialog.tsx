import { Box, Flex, Text, WrapItem } from "@chakra-ui/react";
import React from "react";

export const Dialog = ({text, side, key}: {text: string, side: 'LEFT' | 'RIGHT', key: number | string}) => {

    const borderColor = () => {
        switch (side) {
            case 'RIGHT':
                return '#6699CC'
            case 'LEFT':
                return '#96ae8d'
        }
    }

    return (
        <Text 
            textWrap={'pretty'} 
            maxWidth={'3/4'}
            borderWidth={1} 
            borderColor={borderColor()}
            borderRadius={25}
            marginTop={'1rem'}
            padding={'.5rem'}
            justifySelf={side == 'LEFT' ? 'flex-start' : 'flex-end'}
        >
            {text}
        </Text>
    )
}