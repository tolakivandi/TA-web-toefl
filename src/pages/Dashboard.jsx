// Sidebar Component
import React from "react";
import { User, BookOpen, ChevronDown } from "lucide-react";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import Progress from "../components/Progress";
import Button from "../components/Button";

import gambar1 from "../assets/images/gambar1.png";
import gambar2 from "../assets/images/gambar2.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#2E4C7A] text-white p-4">
      <h1 className="text-2xl font-bold mb-8">AppName</h1>
      <ul>
        <li className="mb-4">
          <button className="flex items-center w-full p-2 text-left rounded hover:bg-blue-700">
            <span className="mr-2">🏠</span> Home
          </button>
        </li>
        <li>
          <button className="flex items-center w-full p-2 text-left rounded hover:bg-blue-700">
            <span className="mr-2">📜</span> History
          </button>
        </li>
      </ul>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <div>
      <div className="flex justify-end mr-6 mb-2 items-center space-x-2">
        <User className="w-6 h-6" />
        <span className="text-sm font-medium">Username</span>
        <a href="">
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
      <div className="bg-linear-to-t from-[#24437A] to-[#A8DBFA] p-6 rounded shadow flex items-center justify-between mb-6">
        <div className="flex w-full justify-between items-center">
          <img src={gambar2} alt="" />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-white">
              Hi, Tolak Ivandi Yudistiawan
            </h2>
            <p className="text-xl text-white">3122522020</p>
            <h3 className="text-lg text-white">
              TOEFL Application for Student to Improve Their Knowledgw in
              English
            </h3>
          </div>
          <img src={gambar1} alt="" className="h-38" />
        </div>
      </div>
    </div>
  );
};

// SimulationTest Component
const SimulationTest = () => {
  return (
    <Card className="col-span-2 h-full">
      <CardContent className={`flex flex-col items-start`}>
        <h3 className="text-xl font-bold mb-4">Simulation Test</h3>
        <p className="text-sm text-gray-500 mb-6">
          Try the TOEFL simulation to test your understanding
        </p>
        <div className="flex flex-col items-center">
          <Link to={"/instruction/reading"}>
            <Button className="bg-[#A8DBFA] py-7 px-7 rounded-lg shadow-md hover:bg-[#76B7E4]">
              <div className="bg-[rgba(63,162,246,0.3)] p-6 rounded-full flex hover:bg-[rgba(63,162,246,0.5)] items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </Button>
          </Link>
          <span className="font-semibold mt-4">Start Exam</span>
        </div>
      </CardContent>
    </Card>
  );
};

// Overview Component
const Overview = () => {
  return (
    <Card className={"h-full"}>
      <CardContent>
        <h3 className="text-xl font-bold mb-4">Overview</h3>
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle
                className="text-gray-300"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="transparent"
                r="16"
                cx="18"
                cy="18"
              />
              <circle
                className="text-purple-500"
                strokeWidth="3.8"
                strokeDasharray="25, 100"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="16"
                cx="18"
                cy="18"
              />
              <circle
                className="text-yellow-500"
                strokeWidth="3.8"
                strokeDasharray="20, 100"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="16"
                cx="18"
                cy="18"
              />
              <circle
                className="text-green-500"
                strokeWidth="3.8"
                strokeDasharray="15, 100"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="16"
                cx="18"
                cy="18"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold">25%</span>
              <span className="text-sm text-gray-500">Learn more</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm">
              <span>Reading Score</span>
              <span>25%</span>
            </div>
            <Progress value={25} className="h-2" color={"bg-purple-500"} />
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span>Listening Score</span>
              <span>15%</span>
            </div>
            <Progress value={15} className="h-2" color={"bg-yellow-500"} />
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span>Structure Score</span>
              <span>15%</span>
            </div>
            <Progress value={15} className="h-2" color={"bg-green-500"} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 h-auto">
        {/* Header */}
        <Header />

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto">
          <SimulationTest />
          <Overview />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
