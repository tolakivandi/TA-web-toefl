import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "@/redux/questionSlice";
import Header from "@/components/Header";
import SubHeaderInstruction from "@/components/instruction/SubHeader";

export default function Reading() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.questions);

  const [time, setTime] = useState(7200); // 2 hours
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [currentQuestion, setCurrentQuestion] = useState(1);

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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(
      minutes % 60
    ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion));
  };
  const [user, setUser] = useState(null);

  
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!data) {
    console.error("Data is null!");
    return <p>Loading...</p>;
  }

  const question = data ? data.questions[currentQuestion - 1] : [];
  
  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className="w-full flex flex-col px-10 pt-5 pb-7 gap-6 min-h-screen bg-gray-100">
      <Header pageName={"Simulation Test"} username={user ? user.name : "Guest"} />
      <SubHeaderInstruction title={`Question ${currentQuestion} of ${data.questions.length} (Package 1)`} />
      
      <main className="flex flex-col px-10 py-5 bg-white rounded-2xl gap-5 shadow-md h-full">
        <div className="flex h-full w-full p-4 bg-gray-100">
          <div className="w-2/3 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">{question?.question}</h2>
            <div className="space-y-4">
              {question?.multiple_choices.map((choice) => (
                <label key={choice.id} className="block p-2 border rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="radio"
                    name="question"
                    value={choice.choice}
                    checked={selectedAnswer === choice.choice}
                    onChange={() => handleAnswerSelection(choice.choice)}
                    className="mr-2"
                  />
                  {choice.choice}
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                onClick={() => setCurrentQuestion((prev) => Math.max(1, prev - 1))}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 bg-[#24437A] text-white rounded"
                onClick={() => setCurrentQuestion((prev) => Math.min(data.questions.length, prev + 1))}
              >
                Next
              </button>
            </div>
          </div>

          <div className="w-1/3 ml-4 p-6 bg-white shadow-lg rounded-lg h-full flex flex-col">
            <div className="flex justify-center items-center bg-green-100 p-2 rounded-lg mb-4">
              <span className="text-green-700 font-semibold text-lg">{formatTime(time)}</span>
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
