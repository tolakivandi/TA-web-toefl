import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InstructionReading from "./pages/InstructionReading";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/instruction/reading" element={<InstructionReading />} />
      </Routes>
    </Router>
  );
};

export default App;
