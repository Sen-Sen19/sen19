import React, { useState } from "react";
import { Minus, Square, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Notepad({ onClose, onMinimize, taskbarHeight = 48 }) {
  const [text, setText] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 120, y: 120 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [prevState, setPrevState] = useState(null);

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
      style={{ zIndex: 55 }}
      className={`absolute bg-white border border-gray-300 overflow-hidden flex flex-col
        ${isMaximized ? "rounded-none shadow-none" : "rounded-xl shadow-2xl"}`}
    >
      {/* 🧭 Top Bar */}
      <div className="flex justify-between items-center bg-gray-100 px-3 py-1.5 border-b border-gray-200 cursor-move select-none">
        <span className="text-sm font-medium text-gray-800">Notepad</span>
        <div className="flex items-center space-x-2">
          <button onClick={onMinimize} className="hover:bg-gray-200 rounded p-1">
            <Minus size={14} />
          </button>

          {/* 🔲 Maximize / Restore */}
          <button
            onClick={toggleMaximize}
            className="hover:bg-gray-200 rounded p-1 relative w-5 h-5 flex items-center justify-center"
          >
            {!isMaximized ? (
              <Square size={14} />
            ) : (
              <>
                <Square
                  size={12}
                  className="absolute text-gray-600 translate-x-[2px] translate-y-[-2px]"
                />
                <Square size={12} className="absolute text-gray-600" />
              </>
            )}
          </button>

          <button onClick={onClose} className="hover:bg-red-500 hover:text-white rounded p-1">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* 📄 Notepad Body */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-3 outline-none resize-none text-sm font-mono text-gray-800"
        placeholder="Start typing..."
      />
    </motion.div>
  );
}
