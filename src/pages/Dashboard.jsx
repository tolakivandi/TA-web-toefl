// Sidebar Component
import React, { useEffect, useState } from "react";
import { User, BookOpen, ChevronDown } from "lucide-react";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import Progress from "../components/Progress";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import gambar1 from "../assets/images/gambar1.png";
import gambar2 from "../assets/images/gambar2.png";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { History } from "lucide-react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { fetchPacket } from "../redux/questionSlice";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus data user
    navigate("/login"); // Arahkan ke halaman login
  };
  return (
    <div className="w-64 bg-white text-black p-4">
      <h1 className="text-2xl font-bold mb-8">AppName</h1>
      <ul>
        <li>
          <button className="flex items-center w-full p-2 text-left rounded hover:bg-[#e5e7eb]">
            <span className="mr-2 text-lg"><Home size={20}/></span> Home
          </button>
        </li>
        <li>
          <button className="flex items-center w-full p-2 text-left rounded hover:bg-[#e5e7eb]">
            <span className="mr-2 text-lg"><History size={20} /></span> History
            </button>
        </li>
        <li>
        <button onClick={handleLogout} className="flex items-center w-full p-2 text-left rounded hover:bg-[#e5e7eb]">
          <span className="mr-2 text-lg"><RiLogoutBoxLine size={20} /></span> Logout
          </button>
        </li> 
      </ul>
    </div>
  );
};


// Header Component
const Header = ({user}) => {
  return (
    <div className="bg-gray-100 flex">
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex justify-end mr-6 mb-2 items-center space-x-2">
          <User className="w-6 h-6" />
          <span className="text-sm font-medium">{user ? user.name : "Guest"}</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="bg-gradient-to-t from-[#2b5e5e] to-[#a0e0df] p-4 rounded-2xl shadow flex items-center justify-between mb-6">
          <img src={gambar2} alt="" />
          <div className="text-center text-white">
            <h2 className="text-2xl font-semibold">Hi, {user ? user.name : "User"}</h2>
            <p className="text-xl">{user ? user.id : "-"}</p>
            <h3 className="text-lg">TOEFL Application for Student to Improve Their Knowledge in English</h3>
          </div>
          <img src={gambar1} alt="" className="h-38" />
        </div>
      </div>
    </div>
  );
};

const SimulationTest = () => {
  const dispatch = useDispatch();

  const { packet, loading, error } = useSelector((state) => state.packet);
  
  useEffect(() => {
    dispatch(fetchPacket());
  }, [dispatch]);


  return (
    <Card className="col-span-2 h-full">
      <CardContent className={`flex flex-col items-start`}>
        <h3 className="text-xl font-bold mb-4">Simulation Test</h3>
        <p className="text-sm text-gray-500 mb-6">
          Try the TOEFL simulation to test your understanding
        </p>

        {loading && <p>Loading packets...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="space-y-4 w-full">
          {packet?.map((packet) => (
            <div
              key={packet.id}
              className="border p-4 rounded-lg shadow hover:shadow-md bg-white flex items-center justify-between"
            >
              <div>
                <h4 className="text-lg font-semibold">{packet.name_packet}</h4>
                <p className="text-sm text-gray-500">
                  Type: {packet.type_packet} • Soal: {packet.question_count} • Akurasi: {packet.akurasi}%
                </p>
              </div>
              <Link to={`/instruction/${packet.type_packet}`}>
                <Button className="bg-[#4a8787] hover:bg-[#3a6e6e] text-white px-4 py-2 rounded">
                  Start
                </Button>
              </Link>
            </div>
          ))}
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Header */}
        <Header user={user}/>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {/* Simulation Test - diperlebar */}
          <div className="col-span-2 w-full">
            <SimulationTest />
          </div>

          {/* Overview - tetap penuh di sebelah kanan */}
          <div className="w-full">
            <Overview />
          </div>
        </div>
      </div>
    </div>
  );
};



export default Dashboard; Sidebar;
