import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsStopwatchFill } from "react-icons/bs";

const Listening = () => {
  const [time, setTime] = useState(59 * 60 + 27);
  const [progress, setProgress] = useState(30);
  const currentQuestion = 41;
  const totalQuestions = 43;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col px-2 pt-5 pb-7 gap-6 min-h-screen">
      <div className="flex justify-between items-center w-full bg-gray-200 p-4 rounded-lg shadow-md">
        <h1 className="text-lg font-bold">Simulation Test</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <FaUserCircle size={24} className="text-gray-700" />
          <span className="font-medium">Tolak Ivandi Yudistiawan</span>
        </div>
      </div>
      <div className="w-full bg-white p-4 text-center font-semibold border rounded-lg shadow-md">Package 1</div>
      <main className="flex flex-col px-2 py-5 bg-white rounded-2xl gap-5 shadow-md h-full">
        <div className="flex h-full w-full p-4 bg-gray-100">
          <div className="w-2/3 bg-white p-6 shadow-lg rounded-lg flex flex-col justify-between">
            <div>
              <div className="bg-gray-200 p-3 rounded-md text-gray-700 text-sm">
                Listen to a lecture about the poet Sylvia Plath to answer questions number {currentQuestion}-{totalQuestions}. Take notes as you listen. Then answer the questions correctly.
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-300 h-4 rounded-md overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-700 text-white px-6 py-2 rounded-md text-lg font-medium">Next</button>
            </div>
          </div>
          <div className="w-1/3 ml-2 p-6 bg-white shadow-lg rounded-lg h-full flex flex-col">
            <div className="flex justify-center items-center bg-green-100 p-2 rounded-lg mb-4 gap-2">
              <BsStopwatchFill className="text-green-700 text-lg" />
              <span className="text-green-700 font-semibold text-lg">{formatTime(time)}</span>
            </div>
            <div className="grid grid-cols-6 gap-2 overflow-y-auto h-full max-h-[400px]">
              {Array.from({ length: totalQuestions }, (_, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-lg text-sm font-semibold bg-gray-200 hover:bg-gray-300"
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Listening;
