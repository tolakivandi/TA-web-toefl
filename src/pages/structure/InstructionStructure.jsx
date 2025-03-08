import { Link } from "react-router-dom";
import ButtonPrimary from "@/components/ButtonPrimary";
import SubHeaderInstruction from "@/components/instruction/SubHeader";
import Header from "@/components/Header";

export default function InstructionListening() {
  return (
    <div className="w-full flex flex-col px-10 pt-5 pb-7 gap-6">
      <Header pageName={"Simulation Test"} username={"Tolak Ivandi Yudistiawan"} />
      <SubHeaderInstruction title={"Package 1"} />
      <div className="flex flex-col px-10 py-5 bg-white rounded-2xl gap-5">
        <h1 className="text-2xl font-bold">
          Instruction <span className="text-red-600 font-extrabold">!</span>
        </h1>
        <p className="">
          Welcome to the Structure TOEFL exercise. Here’s what you need to know:
        </p>
        <ul className="list-decimal pl-5 flex flex-col gap-3">
          <li className="">
            You will be presented with several questions that test your understanding of English grammar and sentence structure.
          </li>
          <li className="">
            Carefully read each question and select the correct answer.
          </li>
          <li className="">
            Make sure to review the questions thoroughly and choose the option that best completes the sentence or answers the question.
          </li>
          <li className="">
            Take your time to read each question and all the answer choices before making your selection.
          </li>
          <li className="">
            There is no time limit for this section, but manage your time wisely to ensure you can complete all questions.
          </li>
          <li className="">
            <span className="text-red-600 font-semibold">During the exam, your device's camera will automatically activate to monitor the exam.</span>
            <br />➜ While you are taking the exam, the camera will always be active and monitoring your activities. If you are detected speaking with another participant, you will be disqualified.
            <br />➜ <span className="font-semibold">If a violation is detected :</span>
            <ul className="list-disc pl-5">
              <li>The system will automatically provide violation notifications.</li>
              <li>Your exam questions will be submitted immediately.</li>
              <li>The final score will appear based on the answers that have been filled in.</li>
            </ul>
            <br />➜ Make sure you maintain your integrity during the exam.
          </li>
        </ul>
        <p className="font-bold">
          <span className="font-extrabold">By clicking “Next,” you confirm that you understand and are ready to take the exam.</span>
        </p>
        <div className="flex justify-end">
          <Link to={"/instruction/"}>
            <ButtonPrimary value={"next"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
