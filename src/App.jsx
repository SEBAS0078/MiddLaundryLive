import { Routes, Route } from "react-router-dom";
import Navbar from "./NavBar";
import Home from "./Home";
import About from "./pages/about";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Optional: use pages/index.jsx as another route */}
        {/* <Route path="/info" element={<IndexPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
