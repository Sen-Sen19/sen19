import React, { useState } from "react";
import { Minus, Square, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Terminal({ onClose, onMinimize, taskbarHeight = 48 }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(["Welcome to SenOS Terminal. Type /commands to see available commands."]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [prevState, setPrevState] = useState(null);

  // Commands and their outputs
  const commands = {
    about: "Hi, I'm Sen, a web developer passionate about creating interactive and futuristic portfolio experiences.",
    skills: "Skills: React, Vite, TailwindCSS, Framer Motion, AI/ML with JS, HTML/CSS, PHP & SQL.",
    projects: "Projects: Jumping Slime AI, Windows 11 Portfolio, Tic Tac Toe AI, Falling Sand Simulator, and more.",
    contact: "Contact: sen@example.com or connect with me on GitHub: https://github.com/Sen-Sen19",
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const command = input.trim().toLowerCase();
      setOutput(prev => [...prev, `C:\\> ${input}`]);

      if (command === "/commands") {
        setOutput(prev => [
          ...prev,
          "Available commands:",
          "about      - Learn about me",
          "skills     - See my skills",
          "projects   - View my projects",
          "contact    - Get in touch"
        ]);
      } else if (commands[command]) {
        setOutput(prev => [...prev, commands[command]]);
      } else if (command) {
        setOutput(prev => [...prev, `Command not found: ${command}`]);
      }

      setInput("");
    }
  };

  const toggleMaximize = () => {
    if (!isMaximized) {
      setPrevState({ position, size });
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - taskbarHeight });
    } else if (prevState) {
      setPosition(prevState.position);
      setSize(prevState.size);
    }
    setIsMaximized(!isMaximized);
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      animate={{
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      style={{ zIndex: 60 }}
      className={`absolute bg-black text-green-400 border border-gray-700 overflow-hidden flex flex-col
        ${isMaximized ? "rounded-none shadow-none" : "rounded-xl shadow-2xl"}`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-gray-800 text-white px-3 py-1.5 cursor-move select-none">
        <span className="font-medium text-sm">Terminal</span>
        <div className="flex items-center space-x-2">
          <button onClick={onMinimize} className="hover:bg-gray-700 rounded p-1">
            <Minus size={14} />
          </button>
          <button
            onClick={toggleMaximize}
            className="hover:bg-gray-700 rounded p-1 relative w-5 h-5 flex items-center justify-center"
          >
            {!isMaximized ? (
              <Square size={14} />
            ) : (
              <>
                <Square
                  size={12}
                  className="absolute text-gray-300 translate-x-[2px] translate-y-[-2px]"
                />
                <Square size={12} className="absolute text-gray-300" />
              </>
            )}
          </button>
          <button onClick={onClose} className="hover:bg-red-500 hover:text-white rounded p-1">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 font-mono text-sm p-3 overflow-auto">
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div className="flex">
          <span className="px-1">C:\&gt;</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent flex-1 outline-none text-green-400"
            autoFocus
          />
        </div>
      </div>
    </motion.div>
  );
}
