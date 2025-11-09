import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // Helper to highlight the active page
  const isActive = (path) =>
    location.pathname === path
      ? "text-yellow-300 font-semibold border-b-2 border-yellow-300 pb-1"
      : "hover:text-yellow-300";

  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide">
        CKD Dialysis Predictor
      </h1>

      <div className="space-x-6 text-lg">
        <Link to="/" className={isActive("/")}>
          Home
        </Link>
        <Link to="/predict" className={isActive("/predict")}>
          Predict
        </Link>
        <Link to="/about" className={isActive("/about")}>
          About
        </Link>
        <Link to="/contact" className={isActive("/contact")}>
          Contact
        </Link>
        <Link to="/reports" className={isActive("/reports")}>
          Reports
        </Link>
        <Link to="/risk-factors" className={isActive("/risk-factors")}>
          Risk Factors
        </Link>
      </div>
    </nav>
  );
}
