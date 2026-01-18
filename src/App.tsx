import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/Header";
import "./App.css";

function App() {
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith("/projets/") && location.pathname !== "/projets";

  return (
    <>
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
      {!isProjectDetail && <Header />}
      <main className={`content ${isProjectDetail ? "no-header-footer" : ""}`}>
        <Outlet />
      </main>
    </>
  );
}

export default App;
