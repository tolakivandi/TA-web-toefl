import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import IntructionCamera from "./pages/IntructionCamera";
import Reading from "./pages/Reading";
import InstructionReading from "./pages/InstructionReading";
import InstructionListening from "./pages/listening/InstructionListening";
import Listening from "./pages/listening/Listening";
import Login from "./pages/Login";
import ExamResults from "./pages/ExamResults";
import InstructionStructure from "./pages/structure/InstructionStructure"
import Skor from "./pages/skor/skor"
import TestTOEFL from "./pages/Reading";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/instruction/Reading" element={<InstructionReading />} />  
        <Route path="/instruction/camera" element={<IntructionCamera />} />
        <Route path="/paket" element={<TestTOEFL />} />
        <Route path="/Instruction/instructionListening" element={<InstructionListening/>} />
        <Route path="/Instruction/listening" element={<Listening/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/hasil" element={<ExamResults />} />
        <Route path="/Instruction/instructionStructure" element={<InstructionStructure/>} />
        <Route path="/Skor" element={<Skor/>} />
      </Routes>
    </Router>
  );
};

export default App;
