import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if(!email.includes("@")){return alert("Enter a valid email")}
      if(password.length<8){
        return alert("Password must be 8 character long")
      }
      const res = await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true });
      setUser(res.data);
      navigate("/Electronic");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="p-4  flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500">
        <h1 className="text-lg md:text-3xl pl-20 font-extrabold">
          <Link to="/">Find Your Lost Things</Link>
        </h1>
        <Link to="/register" className="text-white pr-20 hover:underline">Register</Link>
      </header>
      <main className="flex-1 flex justify-center items-center">
        <div className="w-full md:w-1/3 p-4 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Log in to your account</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none"
            type="email"
            placeholder="Enter your Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none"
            type="password"
            minLength={8}
            placeholder="Enter your Password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-sm mt-2">Something went wrong</p>}
          <div className="justify-center flex mt-4">
            <p>New here?</p>
            <Link to="/register" className="ml-2 text-blue-500 hover:underline">Register</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
