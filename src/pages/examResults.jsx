import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const ExamResults = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("examResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-200 flex flex-col">
      <div className="flex justify-between items-center p-6 bg-white shadow-md">
        <h2 className="text-gray-700 font-semibold text-xl">Exam Results</h2>
        <div className="flex items-center space-x-3">
          <FaUserCircle className="text-gray-700 text-2xl" />
          <span className="text-gray-700 text-lg">{results?.username || "Guest"}</span>
        </div>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="grid grid-cols-3 gap-12">
          <div className="text-center">
            <p className="bg-blue-500 text-white px-6 py-2 rounded-t-lg text-lg">Correct</p>
            <p className="border border-blue-500 px-10 py-4 text-3xl font-bold bg-white text-black">{results?.correct || 0}</p>
          </div>
          <div className="text-center">
            <p className="bg-blue-500 text-white px-6 py-2 rounded-t-lg text-lg">Incorrect</p>
            <p className="border border-blue-500 px-10 py-4 text-3xl font-bold bg-white text-black">{results?.incorrect || 0}</p>
          </div>
          <div className="text-center">
            <p className="bg-blue-500 text-white px-6 py-2 rounded-t-lg text-lg">Score</p>
            <p className="border border-blue-500 px-10 py-4 text-3xl font-bold bg-white text-black">{results?.score || 0}</p>
          </div>
        </div>
        <button className="mt-10 bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg text-lg hover:bg-blue-800">Back to Dashboard</button>
      </div>
    </div>
  );
};

export default ExamResults;
