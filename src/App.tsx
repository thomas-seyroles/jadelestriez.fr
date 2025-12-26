import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets" element={<Projects />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
