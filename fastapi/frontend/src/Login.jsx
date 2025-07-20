import React, { useState } from "react";
import axios from "axios";
import robotLoginImg from "./assets/login.jpg"; // Import the image

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/login", {
        user_id: userId,
        password: password,
      });

      if (rememberMe) {
        localStorage.setItem("user_id", userId);
      }
      onLogin(userId);
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.detail === "User not found"
      ) {
        try {
          await axios.post("http://127.0.0.1:8000/api/register", {
            user_id: userId,
            password: password,
          });

          await axios.post("http://127.0.0.1:8000/api/login", {
            user_id: userId,
            password: password,
          });

          if (rememberMe) {
            localStorage.setItem("user_id", userId);
          }
          onLogin(userId);
        } catch (registerError) {
          setError("Registration failed.");
          console.error(registerError);
        }
      } else {
        setError("Invalid credentials.");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={robotLoginImg} // Use the imported image
            alt="AI-Powered Assistant"
            className="w-full h-64 md:h-auto object-cover"
          />
          <div className="p-6 text-center text-white">
            <h2 className="text-2xl font-bold">AI-Powered Assistant</h2>
            <p className="text-gray-400">Experience the next generation of intelligent conversation</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-6">Welcome Back</h1>
          <p className="text-gray-400 mb-6">Sign in to continue</p>
          <input
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-400 mb-2">{error}</p>}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-400 hover:underline">Forgot Password?</a>
          </div>
          <button
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <div className="text-center mt-4 text-gray-400">Or continue with</div>
          <div className="flex justify-center gap-4 mt-4">
            <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">
              <span className="text-white">G</span>
            </button>
            <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">
              <span className="text-white">🍎</span>
            </button>
            <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">
              <span className="text-white">f</span>
            </button>
          </div>
          <p className="text-center mt-6 text-gray-400">
            Don't have an account? <a href="#" className="text-blue-400 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;