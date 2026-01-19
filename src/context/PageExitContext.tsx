import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageExitContextType {
  isExiting: boolean;
  setIsExiting: (value: boolean) => void;
  shouldHeaderExit: boolean;
  setShouldHeaderExit: (value: boolean) => void;
}

const PageExitContext = createContext<PageExitContextType | undefined>(undefined);

export function PageExitProvider({ children }: { children: ReactNode }) {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldHeaderExit, setShouldHeaderExit] = useState(false);
  const location = useLocation();

  // Réinitialiser l'état isExiting à chaque changement de route effectif
  useEffect(() => {
    setIsExiting(false);
    setShouldHeaderExit(false);
  }, [location.pathname]);

  return (
    <PageExitContext.Provider value={{ isExiting, setIsExiting, shouldHeaderExit, setShouldHeaderExit }}>
      {children}
    </PageExitContext.Provider>
  );
}

export function usePageExitContext() {
  const context = useContext(PageExitContext);
  if (context === undefined) {
    throw new Error("usePageExitContext must be used within a PageExitProvider");
  }
  return context;
}
