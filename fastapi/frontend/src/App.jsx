import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Login from "./Login";
import chatbotImg from "./assets/chatbotimg.jpg";

const addonsList = [
  { label: "REASONING", value: "Give a detailed reasoning." },
  { label: "INCLUDE EXAMPLE", value: "Include an example." },
  { label: "INCLUDE SOURCE", value: "Include a credible source." },
  { label: "BULLET POINTS", value: "Format the answer in bullet points." },
  { label: "SUMMARY", value: "Provide a summary at the end." },
];

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/chats/${userId}`);
      setHistoryData(res.data.history);
      setShowHistory(true);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user_id");
    if (storedUser) {
      setUserId(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const toggleAddon = (value) => {
    setSelectedAddons((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSearch = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    const enhancedInput = `${input}\n${selectedAddons.join(" ")}`;

    try {
      const result = await axios.post("http://127.0.0.1:8000/api/gemini", {
        prompt: enhancedInput,
        user_id: userId,
      });
      const apiResponse = result.data.response || "No response received.";
      setResponse(apiResponse);
    } catch (error) {
      setResponse("Error getting response.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Login
        onLogin={(id) => {
          setUserId(id);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen w-full flex items-center justify-center">
      <div className="w-[90%] h-[90vh] bg-gray-800 rounded-2xl flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-[30%] p-6 flex flex-col gap-8 text-white">
          <h1 className="text-3xl font-bold text-center">CHATBOT AI</h1>
          <div className="flex-1 flex flex-col gap-4">
  <h2 className="text-xl text-gray-300 text-center">Customize Your Answer Output</h2>
  {addonsList.map((addon) => {
    const isSelected = selectedAddons.includes(addon.value);
    return (
      <button
        key={addon.label}
        onClick={() => toggleAddon(addon.value)}
        className={`w-full rounded-full p-2 font-semibold transition-all duration-300
          ${isSelected 
            ? "bg-blue-900 text-white shadow-inner border border-blue-400" 
            : "bg-blue-600 hover:bg-blue-700 text-white"}
        `}
      >
        {addon.label}
      </button>
    );
  })}

  <button
    onClick={fetchHistory}
    className="bg-gray-700 w-full text-white rounded-full p-2 font-semibold mt-4 hover:bg-gray-600"
  >
    Show History
  </button>

  <button
    onClick={() => {
      localStorage.removeItem("user_id");
      setUserId(null);
      setIsAuthenticated(false);
    }}
    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4"
  >
    Logout
  </button>
</div>

        </div>

        {/* Right Panel */}
        <div className="w-[70%] flex flex-col justify-between p-4">
          <div className="h-[90%] bg-gray-800 rounded-xl overflow-y-auto p-6 text-white">
  {loading ? (
    <p className="text-gray-400 text-lg animate-pulse">Thinking...</p>
  ) : response ? (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-gray-700 p-4 rounded-lg shadow-md">
        <p className="text-sm text-gray-400">You asked:</p>
        <p className="text-white font-medium">{input}</p>
      </div>
      <div className="bg-gray-700 p-6 rounded-lg text-[20px] leading-7.5 shadow-md prose prose-invert max-w-none">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <img
        src={chatbotImg}
        alt="chatbot"
        className="w-2/3 max-w-md rounded-xl"
      />
    </div>
  )}
</div>


          <div className="mt-4 bg-gray-700 h-[10%] rounded-full flex items-center px-4 shadow-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the chatbot anything..."
              className="w-full p-2 rounded-full bg-gray-800 text-white outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch} className="ml-2">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {showHistory && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-[80%] max-h-[80%] overflow-y-auto p-6 rounded-xl shadow-xl text-black">
            <h2 className="text-2xl font-bold mb-4">Chat History</h2>
            <button
              onClick={() => setShowHistory(false)}
              className="absolute top-4 right-6 text-red-500 font-bold text-xl"
            >
              ✕
            </button>
            {historyData.length === 0 ? (
              <p>No history found.</p>
            ) : (
              <ul className="space-y-4">
                {historyData.map((item, index) => (
                  <li key={index} className="border-b pb-2">
                    <p className="font-semibold">Prompt:</p>
                    <p>{item.prompt}</p>
                    <p className="font-semibold mt-2">Response:</p>
                    <ReactMarkdown>{item.response}</ReactMarkdown>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;