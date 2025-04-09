import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "@/redux/questionSlice";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SubHeaderInstruction from "@/components/instruction/SubHeader";
import axios from "axios";

export default function TestTOEFL() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.questions);

  const [time, setTime] = useState(7200); // 2 hours
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const audioRef = useRef(null); // Gunakan useRef untuk audio

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [time]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const question = data?.questions?.[currentQuestion - 1];
    
    if (question?.type_question === "Listening" && question?.nested_question) {
      const audio = new Audio(`http://103.106.72.182:8040/storage/${question.nested_question}`);
      audioRef.current = audio;
      audio.play();
    }
  }, [currentQuestion, data]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(
      minutes % 60
    ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleAnswerSelection = (questionId, answer) => {
    if (!questionId) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion));
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.keys(selectedAnswers).map((questionId) => ({
      question_id: questionId,
      bookmark: false,
      answer_user: selectedAnswers[questionId] || "-",
    }));

    try {
      await axios.post("http://103.106.72.182:8040/api/submit-answer/2", {
        answers: formattedAnswers,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await axios.post("http://103.106.72.182:8040/api/submit-answers/2", {} ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/skor");
    } catch (err) {
      alert("Failed to submit answers. Please try again.");
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || !data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
    return <p>No questions available</p>;
  }

  const question = data?.questions?.[currentQuestion - 1] || {};
  const choices = question?.multiple_choices || [];
  const isLastQuestion = currentQuestion === data.questions.length;

  return (
    <div className="w-full flex flex-col px-10 pt-5 pb-7 gap-6 min-h-screen bg-gray-100">
      <Header pageName={"Simulation Test"} username={user ? user.name : "Guest"} />
      <SubHeaderInstruction title={`Question ${currentQuestion} of ${data.questions.length} (Package 1)`} />
      
      <main className="flex flex-col px-10 py-5 bg-white rounded-2xl gap-5 shadow-md h-full">
        <div className="flex h-full p-4 bg-gray-100">
          <div className="w-2/3 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">{question?.question || "No question available"}</h2>

            {/* Jika soal Listening, tampilkan indikator audio */}
            {question.type_question === "Listening" && question.nested_question && (
              <div className="mb-4 text-blue-700 font-semibold">
                Audio is playing...
              </div>
            )}

            {/* Jika soal Reading, tampilkan teks soal */}
            {question.type_question === "Reading" && question.nested_question && (
              <div className="p-4 bg-gray-200 rounded-md mb-4">
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {question.nested_question}
                </p>
              </div>
            )}

            {/* Pilihan jawaban */}
            <div className="space-y-4">
              {choices.length > 0 ? (
                choices.map((choice, index) => (
                  <label key={index} className="block p-2 border rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="question"
                      value={choice.choice}
                      checked={selectedAnswers[question?.id] === choice.choice}
                      onChange={() => handleAnswerSelection(question?.id, choice.choice)}
                      className="mr-2"
                    />
                    {choice.choice}
                  </label>
                ))
              ) : (
                <p>No choices available</p>
              )}
            </div>

            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                onClick={() => setCurrentQuestion((prev) => Math.max(1, prev - 1))}
              >
                Previous
              </button>
              <button
                className={`px-4 py-2 text-white rounded ${isLastQuestion ? 'bg-green-600' : 'bg-[#2b5e5e]'}`}
                onClick={() => {
                  if (isLastQuestion) {
                    handleSubmit();
                  } else {
                    setCurrentQuestion((prev) => prev + 1);
                  }
                }}
              >
                {isLastQuestion ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        <div className="w-1/3 ml-4 p-6 bg-white shadow-lg rounded-lg h-full flex flex-col">
            <div className="flex justify-center items-center bg-[#2b5e5e] p-2 rounded-lg mb-4">
              <span className="text-white font-semibold text-lg">{formatTime(time)}</span>
            </div>
            <div className="grid grid-cols-6 gap-2 overflow-y-auto h-full max-h-[400px]">
              {data.questions.map((_, i) => (
                <button
                  key={i}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold ${answeredQuestions.has(i + 1) ? 'bg-[#43A048]' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => setCurrentQuestion(i + 1)}
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
}
