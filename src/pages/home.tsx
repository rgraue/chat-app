import React, { useState } from "react";
import { Navbar } from "../components/navbar";
import { ChatBox } from "../components/chatBox";
import { WorkspaceModal } from "../modals/workspaceModal";
import { useWorkspace } from "../context/workspaceContext";

export const Home = () => {
  const workspace = useWorkspace();
  const [viewingWorkspaces, setviewingWorkspaces] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState(
    workspace.getActiveConversation(),
  );

  // useEffect(() => {
  //     workspace.restoreWorkspaces();
  //     setActiveWorkspace(workspace.getActiveConversation());
  // }, []);

  return (
    <>
      <Navbar workspaceSetter={setviewingWorkspaces} />
      <ChatBox activeWorkspace={activeWorkspace} />
      <WorkspaceModal
        isViewing={viewingWorkspaces}
        setIsViewing={setviewingWorkspaces}
        active={activeWorkspace}
        setActive={setActiveWorkspace}
      />
    </>
  );
};
