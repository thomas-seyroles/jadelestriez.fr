import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Toaster } from "sonner";
import Header from "./components/Header";
import "./App.css";
import { PageExitProvider } from "./context/PageExitContext";

function App() {
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith("/projets/") && location.pathname !== "/projets";

  return (
    <PageExitProvider>
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          style: {
            borderRadius: '0',
            border: '1px solid var(--gray-200)',
            fontFamily: 'var(--font-body)',
          },
        }}
      />
      <AnimatePresence>
        {!isProjectDetail && <Header />}
      </AnimatePresence>
      <main className={`content ${isProjectDetail ? "no-header-footer" : ""}`}>
        <Outlet />
      </main>
    </PageExitProvider>
  );
}

export default App;
