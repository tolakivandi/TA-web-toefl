import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "../redux/questionSlice";

function Questions() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h2>Packet ID: {data.id}</h2>
      <h3>No Packet: {data.no_packet}</h3>
      <ul>
        {data.questions.map((q) => (
          <li key={q.id}>
            <h4>{q.question}</h4>
            <ul>
              {q.multiple_choices.map((choice) => (
                <li key={choice.id}>{choice.choice}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;
