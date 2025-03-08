import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import SubHeaderInstruction from "@/components/instruction/SubHeader";
import { Link } from "react-router-dom";

// Komponen Preview Kamera
const CameraPreview = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera(); // Hentikan kamera saat komponen di-unmount
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="w-1/2 flex flex-col bg-gray-100 p-4 rounded-2xl">
      <div className="w-full h-[400px] min-h-[350px] max-h-[400px] bg-gray-300 rounded-2xl flex items-center justify-center">
        <video ref={videoRef} className="w-full h-full object-cover rounded-2xl" autoPlay />
      </div>
    </div>
  );
};

// Komponen Utama
export default function InstructionCamera() {
  const handleStartExam = () => {
    sessionStorage.setItem("startTime", Date.now().toString()); // Simpan waktu mulai
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="h-screen flex flex-col px-10 pt-5 pb-7 gap-6 bg-gray-100">
      <Header pageName={"Simulation Test"} username={user ? user.name : "Guest"} />
      <SubHeaderInstruction title={"Package 1"} />

      <div className="flex flex-col flex-1 px-10 py-5 bg-white rounded-2xl gap-5">
        <h2 className="text-lg font-semibold mb-2 px-10">Preview camera</h2>
        <div className="flex w-full bg-white rounded-2xl p-6 space-x-6">
          <CameraPreview />

          <div className="w-1/2 flex flex-col justify-between bg-gray-50 p-6 rounded-2xl border border-gray-300">
            <div>
              <h3 className="text-lg font-semibold">
                Your Camera is Detected as Disabled, Follow These Steps{" "}
                <span className="text-red-500">❗</span>:
              </h3>
              <ul className="list-decimal pl-4 text-sm mt-2 space-y-4 text-gray-700">
                <li>Enable the Camera: Make sure your camera is turned on before starting the session.</li>
                <li>Check the Device: Ensure your camera is properly connected and functioning.</li>
                <li>Allow Camera Access: Grant camera access in your browser or device settings.</li>
                <li>Verify Internet Connection: Ensure a stable internet connection to avoid camera disruptions.</li>
                <li>
                  Contact Technical Support: If you experience technical issues, contact the support team for assistance.
                </li>
              </ul>
            </div>
            <p className="font-semibold mt-4 text-gray-800">
              By clicking "Start," you confirm that you understand. Ready to start the exam?
            </p>
            <div className="flex justify-end mt-4">
              <Link to={"/paket"} onClick={handleStartExam}>
                <button className="bg-[#2E4C7A] text-white px-6 py-2 rounded-lg hover:bg-[#1D365D]">
                  Start
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
