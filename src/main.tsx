import "@fontsource/lunasima/400.css";
import "@fontsource/lunasima/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Projects from "./pages/Projects.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import Contact from "./pages/Contact.tsx";
import Design from "./pages/Design.tsx";

const showDesignSystem = import.meta.env.VITE_SHOW_DESIGN_SYSTEM === 'true';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/projets", element: <Projects /> },
      { path: "/projets/:slug", element: <ProjectDetail /> },
      { path: "/contact", element: <Contact /> },
      ...(showDesignSystem ? [{ path: "/design", element: <Design /> }] : []),
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
