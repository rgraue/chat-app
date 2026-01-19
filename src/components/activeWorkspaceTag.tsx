import { Text } from "@chakra-ui/react";
import React from "react";

// @ts-ignore
export const ActiveWorkspaceTag = (props: any) => {
  const { active, ...rest } = props;

  const helper = () => {
    if (!active) {
      return "No Active Workspace";
    }

    return `${active}`;
  };

  return (
    <Text {...rest} color={active ? "green" : "grey"} textStyle={"label"}>
      {helper()}
    </Text>
  );
};
