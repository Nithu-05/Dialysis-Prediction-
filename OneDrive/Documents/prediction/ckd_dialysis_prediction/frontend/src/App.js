import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reports from "./pages/Reports";
import RiskFactors from "./pages/RiskFactors";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-blue-50">
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/risk-factors" element={<RiskFactors />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
