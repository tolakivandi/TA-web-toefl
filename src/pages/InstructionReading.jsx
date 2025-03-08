import ButtonPrimary from "@/components/ButtonPrimary";
import Header from "@/components/Header";
import SubHeaderInstruction from "@/components/instruction/SubHeader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function InstructionReading() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <>
      <div className="w-full flex flex-col px-10 pt-5 pb-7 gap-6">
      <Header pageName={"Simulation Test"} username={user ? user.name : "Guest"} />
      <SubHeaderInstruction title={"Package 1"} />
        <div className="flex flex-col px-10 py-5 bg-white rounded-2xl gap-5">
          <h1 className="text-2xl font-bold">
            Instruction <span className="text-red-600 font-extrabold">!</span>
          </h1>
          <p className="">
            Welcome to the Reading TOEFL exercise. Here’s what you need to know:
          </p>
          <ul className="list-decimal pl-5 flex flex-col gap-3">
            <li className="">
              You will be presented with reading passages. Each passage may be
              used for multiple questions.
            </li>
            <li className="">
              Make sure to read the passages carefully and thoroughly.
            </li>
            <li className="">
              Focus on understanding the main ideas, supporting details, and
              specific information that may help you answer the questions.
            </li>
            <li className="">
              Take your time to read and comprehend the passage before
              attempting to answer the questions.
            </li>
            <li className="">
              There is no time limit for reading each passage, but manage your
              time wisely to ensure you can complete all questions.
            </li>
            <li className="">
              Answer the questions based on the information provided in the
              passage.
            </li>
            <li className="">
              During the exam, your device's camera will automatically activate
              to monitor the exam. While you are taking the exam the camera will
              always be active and monitoring your activities during the exam,
              if you are detected speaking with other, participant, you will be
              disqualified. If a violation is detected : The system will
              automatically provide violation notifications. Your exam questions
              will be submitted immediately. The final score will appear based
              on the answers that have been filled in. Make sure you maintain
              your integrity during the exam.
            </li>
          </ul>
          <p className="font-bold">
            By clicking “Next,” you confirm that you understand and are ready to
            take the exam.
          </p>
          <div className="flex justify-end">
            <Link to={"/instruction/camera"}>
              <ButtonPrimary value={"next"} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
