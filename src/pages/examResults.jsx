import React from "react";
import { FaUserCircle } from "react-icons/fa";
import gambar3 from "../assets/images/gambar3.png";

const ExamResults = () => {
  return (
    <div className="h-screen w-screen bg-gray-200 flex flex-col">
      <div className="flex justify-between items-center p-6 bg-white shadow-md">
        <h2 className="text-gray-700 font-semibold text-xl">Exam results</h2>
        <div className="flex items-center space-x-3">
          <FaUserCircle className="text-gray-700 text-2xl" />
          <span className="text-gray-700 text-lg">Username</span>
        </div>
      </div>
      <div className="relative flex-grow ">
        <img src={gambar3} alt="Exam Illustration" className="object-cover brightness-50 " />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <p className="bg-[#3FA2F6] text-white px-6 py-2 rounded-t-lg text-lg">Correct</p>
              <p className="border border-blue-500 px-10 py-4 text-3xl font-bold bg-white text-black bg-opacity-50">20</p>
            </div>
            <div className="text-center">
              <p className="bg-[#3FA2F6] text-white px-6 py-2 rounded-t-lg text-lg">Incorrect</p>
              <p className="border border-blue-500 px-10 py-4 text-3xl font-bold bg-white text-black bg-opacity-50">100</p>
            </div>
            <div className="text-center">
              <p className="bg-[#3FA2F6] text-white px-6 py-2 rounded-t-lg text-lg">Score</p>
              <p className="border border-blue-500 px-10 py-4 text-3xl font-bold bg-white text-black bg-opacity-50">371</p>
            </div>
          </div>
          <button className="mt-10 bg-[#24437A] text-white px-8 py-3 rounded-lg shadow-lg text-lg hover:bg-blue-800">
            Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;
