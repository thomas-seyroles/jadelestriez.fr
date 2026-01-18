import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/Header";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import Design from "./pages/Design";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith("/projets/") && location.pathname !== "/projets";
  const showDesignSystem = import.meta.env.VITE_SHOW_DESIGN_SYSTEM === 'true';

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/projets/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          {showDesignSystem && <Route path="/design" element={<Design />} />}
        </Routes>
      </main>
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;
