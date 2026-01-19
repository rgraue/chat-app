import { CloseButton, Dialog, Flex, Portal, Text } from "@chakra-ui/react";
import React from "react";
import { WorkspaceTable } from "../components/workspaceTable";
import { ActiveWorkspaceTag } from "../components/activeWorkspaceTag";

export const WorkspaceModal = ({
  isViewing,
  setIsViewing,
  active,
  setActive,
}: {
  isViewing: boolean;
  setIsViewing: React.Dispatch<React.SetStateAction<boolean>>;
  active: string | undefined;
  setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const closeDialog = () => {
    setIsViewing((v) => !v);
  };

  return (
    <Dialog.Root size="full" motionPreset="slide-in-bottom" open={isViewing}>
      <Dialog.Trigger />
      <Portal>
        <Dialog.Backdrop />
        {/* @ts-ignore */}
        <Dialog.Positioner>
          {/* @ts-ignore */}
          <Dialog.Content>
            <Dialog.Header>
              {/* @ts-ignore */}
              <Dialog.Title>
                <Flex direction={"column"}>
                  <Text>Workspaces</Text>
                  <ActiveWorkspaceTag active={active} />
                </Flex>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <WorkspaceTable setActive={setActive} />
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
            {/* @ts-ignore */}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={closeDialog} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
