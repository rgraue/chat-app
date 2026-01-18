import { Text } from "@chakra-ui/react";
import React from "react";

export const ActiveWorkspaceTag = (props: any) => {

    const {active, ...rest} = props;

    const helper = () => {
        if (!active) {
            return "No Active Workspace"
        }

        return `${active}`;
    }

    return (
        <Text {...rest}  color={active ? 'green' : 'grey'} textStyle={'sm'}>{helper()}</Text>
    )
}