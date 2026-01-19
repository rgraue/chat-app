import React, { createContext, useContext, useState } from "react";
import { SystemService } from "../services/systemService";

const systemContext = createContext<SystemService | undefined>(undefined);

export const useSystem = () => {
  const context = useContext(systemContext);

  if (!context) {
    throw new Error("useSystem cannot be used without SystemProvider.");
  }

  return context;
};

export const SystemProvider = ({
  children,
  system,
}: {
  children: any;
  system: SystemService;
}) => {
  // eslint-disable-next-line
  const [systemState, setSystemState] = useState(system);

  return (
    <systemContext.Provider value={systemState}>
      {children}
    </systemContext.Provider>
  );
};
