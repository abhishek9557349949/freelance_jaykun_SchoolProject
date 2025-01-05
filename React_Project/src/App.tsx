import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";
import Dashboard from "./pages/Dashboard";
import AddProjects from "./pages/AddProject";
import Projects from "./pages/Projects";
import Activities from "./pages/Activities";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LogoPage />} /> */}
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addproject" element={<AddProjects />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/Activities" element={<Activities />} />
        {/* <Route path="/Overview" element={<Overview />} />
        <Route path="/Settings" element={<Settings />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
