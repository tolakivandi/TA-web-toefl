import { UserCircle } from "lucide-react";
import HeaderListening from "../../components/instruction/HeaderListening";
import Card from "@/components/Card";
import Button from "@/components/Button";
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
          Welcome to the Listening TOEFL exercise. Here’s what you need to know:
        </p>
        <ul className="list-decimal pl-5 flex flex-col gap-3">
          <li className="">
            You will listen to several audio messages containing conversations or academic lectures. Make sure to listen attentively.
          </li>
          <li className="">
            Each audio message will be played once within a specified duration. You cannot replay the audio message.
          </li>
          <li className="">
            Ensure you are in a quiet environment free from distractions while listening to the audio messages.
          </li>
          <li className="">
            You may take notes on important points while listening to help answer the questions later.
          </li>
          <li className="">
            After the audio message finishes playing, you will be directed to the question page to answer questions based on the audio message.
          </li>
          <li className="">
            There is a limited amount of time to answer each question. Make sure to answer accurately and efficiently.
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
