import axios from "axios";
import { useState, useEffect } from "react";

const fetchUserScore = async () => {
  try {
    const response = await axios.get("http://103.106.72.182:8040/api/get-score/5", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching user score:", error);
    return null;
  }
};

const ExamResults = () => {
  const [scoreData, setScoreData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchUserScore();
      if (data) {
        setScoreData(data);
      }
    };
    getData();
  }, []);

  if (!scoreData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Exam Results</h1>
      <div className="flex gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg text-center shadow-md">
          <p className="font-bold">Correct</p>
          <p className="text-2xl">{scoreData.correct_question_all}</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg text-center shadow-md">
          <p className="font-bold">Incorrect</p>
          <p className="text-2xl">{scoreData.total_question_all - scoreData.correct_question_all}</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg text-center shadow-md">
          <p className="font-bold">Score</p>
          <p className="text-2xl">{scoreData.score_toefl}</p>
        </div>
      </div>
      <button className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-md text-lg font-medium">
        Back to Dashboard
      </button>
    </div>
  );
};

export default ExamResults;
