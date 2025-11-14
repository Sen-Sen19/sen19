import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

export default function Azra({ isOpen, onClose, isAzra }) {
  const ref = useRef(null);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, I’m Azra — your virtual assistant 💫" },
    { sender: "bot", text: "Ask me anything or just say hi!" },
  ]);
  const [input, setInput] = useState("");

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = generateResponse(input);
      setMessages((prev) => [...prev, response]);
    }, 400);
  };

  const generateResponse = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("hi") || msg.includes("hello"))
      return { sender: "bot", text: "Hey there 👋" };

    if (msg.includes("name"))
      return { sender: "bot", text: "I'm Azra — your system assistant ⚙️" };

    if (msg.includes("time"))
      return { sender: "bot", text: `It's ${new Date().toLocaleTimeString()}` };

    if (msg.includes("date"))
      return { sender: "bot", text: `Today is ${new Date().toDateString()}` };

    if (msg.includes("creator") || msg.includes("made you"))
      return { sender: "bot", text: "I was crafted by Sen 🧠✨" };

    if (msg.includes("how are you"))
      return { sender: "bot", text: "Feeling electric ⚡ as always!" };

    if (msg.includes("joke"))
      return {
        sender: "bot",
        text: "Why did the web developer go broke? Because he used up all his cache 😅",
      };

    if (msg.includes("weather"))
      return {
        sender: "bot",
        text:
          "I can’t access live weather yet, but I can link you to my smarter self 🌤️",
      };

    // 🔹 Fallback for unknown queries
    return {
      sender: "bot",
      text: (
        <span>
          Hmm, I’m not sure about that 🤔 — maybe try my advanced version{" "}
          <button
            onClick={() =>
              window.open("http://azra-ai.great-site.net/", "_blank")
            }
            className="text-blue-600 underline hover:text-blue-800"
          >
            here
          </button>
          .
        </span>
      ),
    };
  };

  return (
    <div className="fixed inset-0 flex items-end justify-end pb-16 pr-4 z-50">
      <div
        ref={ref}
        className="w-96 max-h-[70vh] overflow-hidden flex flex-col bg-gray-900 text-white border border-gray-700 rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-800/90 rounded-t-2xl">
          <div className="flex items-center space-x-2">
            {isAzra ? (
              <div className="logo-circle w-8 h-8 flex items-center justify-center bg-gray-400 rounded-full">
                {/* Custom Azra Icon SVG */}
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M12 2v2M8 2v2M16 2v2M12 22c4.418 0 8-3.582 8-8V8a8 8 0 10-16 0v6c0 4.418 3.582 8 8 8z" />
                  <circle cx="9" cy="12" r="1"></circle>
                  <circle cx="15" cy="12" r="1"></circle>
                </svg>
              </div>
            ) : (
              <div className="w-8 h-8 flex items-center justify-center bg-gray-400 rounded-full">
                {/* Default Bot Icon */}
                <svg
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M12 2v2M8 2v2M16 2v2M12 22c4.418 0 8-3.582 8-8V8a8 8 0 10-16 0v6c0 4.418 3.582 8 8 8z" />
                  <circle cx="9" cy="12" r="1" />
                  <circle cx="15" cy="12" r="1" />
                </svg>
              </div>
            )}
            <h2 className="font-semibold text-sm">Azra</h2>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-gray-700 px-2 py-1 rounded transition"
          >
            ✕
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-700 rounded-bl-none"
                }`}
              >
                {typeof msg.text === "string" ? msg.text : msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-700 flex items-center bg-gray-800/90">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-full border border-gray-600 bg-gray-700 text-white focus:ring focus:ring-blue-300 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
