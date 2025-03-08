import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import IntructionCamera from "./pages/IntructionCamera";
import Reading from "./pages/Reading";
import InstructionReading from "./pages/InstructionReading";
import InstructionListening from "./pages/listening/InstructionListening";
import Listening from "./pages/listening/Listening";
import Login from "./pages/Login";
import ExamResults from "./pages/examResults";
import InstructionStructure from "./pages/structure/InstructionStructure"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/instruction/Reading" element={<InstructionReading />} />
        <Route path="/instruction/simulation" element={<Reading />} />
        <Route path="/instruction/camera" element={<IntructionCamera />} />
        <Route path="/paket" element={<Reading />} />
        <Route path="/Instruction/instructionListening" element={<InstructionListening/>} />
        <Route path="/Instruction/listening" element={<Listening/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/hasil" element={<ExamResults />} />
        <Route path="/Instruction/instructionStructure" element={<InstructionStructure/>} />
      </Routes>
    </Router>
  );
};

export default App;
