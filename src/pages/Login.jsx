import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }
    try {
      const response = await axios.post("http://103.106.72.182:8040/api/login", { email, password });
      const { payload, token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(payload));
        navigate("/");
        window.location.reload();
      } else {
        setError("Login gagal, periksa kembali email dan password Anda");
      }
    } catch (error) {
      console.log(error);
      setError("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg border">
        <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-16">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-[#24437A] hover:bg-[#335A9A] text-white py-3 rounded-lg font-semibold shadow-md transition duration-300">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;