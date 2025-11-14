import React, { useState } from "react";
import { Minus, Square, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Terminal({ onClose, onMinimize, taskbarHeight = 48 }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(["Welcome to SenOS Terminal."]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [prevState, setPrevState] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setOutput((prev) => [...prev, `C:\\> ${input}`]);
      setInput("");
    }
  };

  const toggleMaximize = () => {
    if (!isMaximized) {
      // Save previous state
      setPrevState({ position, size });

      // Maximize: fill viewport but leave space for taskbar
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - taskbarHeight });
    } else if (prevState) {
      // Restore previous state
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
      {/* 🧭 Top Bar */}
      <div className="flex justify-between items-center bg-gray-800 text-white px-3 py-1.5 cursor-move select-none">
        <span className="font-medium text-sm">Terminal</span>
        <div className="flex items-center space-x-2">
          <button onClick={onMinimize} className="hover:bg-gray-700 rounded p-1">
            <Minus size={14} />
          </button>

          {/* 🔲 Maximize / Restore */}
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

          <button
            onClick={onClose}
            className="hover:bg-red-500 hover:text-white rounded p-1"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* 🖥️ Terminal Body */}
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
