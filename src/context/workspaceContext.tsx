import React, { useContext } from "react";
import { createContext, useState } from "react";
import { WorkspaceService } from "../services/workspaceService";


const workspaceContext = createContext<WorkspaceService | undefined>(undefined);

export const useWorkspace = () => {
    const context = useContext(workspaceContext);

    if (!context) {
        throw new Error("useWorkspace cannot be used without WorkspaceProvider.");
    }

    return context;
}

export const WorkspaceProvider = ({ children, workspace }: { children: any; workspace: WorkspaceService }) => {
    // eslint-disable-next-line
    const [ workspaceState, setWorkspaceState ] = useState(workspace);

    workspaceState.restoreWorkspaces();

    return (
        <workspaceContext.Provider value={workspaceState}>
            {children}
        </workspaceContext.Provider>
    )

}