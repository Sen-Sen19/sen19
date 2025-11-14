import React, { useState } from "react";
import { Minus, Square, X, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Games({ onClose, onMinimize, taskbarHeight = 48 }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 160, y: 160 });
  const [size, setSize] = useState({ width: 500, height: 350 });
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
      className={`absolute bg-gradient-to-b from-gray-900 to-gray-800 text-white border border-gray-700 flex flex-col overflow-hidden
        ${isMaximized ? "rounded-none shadow-none" : "rounded-xl shadow-2xl"}`}
    >
      {/* 🎮 Top Bar */}
      <div className="flex justify-between items-center bg-gray-800 px-3 py-1.5 border-b border-gray-700 cursor-move select-none">
        <div className="flex items-center gap-2">
          <Gamepad2 size={16} className="text-purple-400" />
          <span className="text-sm font-medium text-gray-100">Games Center</span>
        </div>
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

          <button onClick={onClose} className="hover:bg-red-600 hover:text-white rounded p-1">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* 🕹️ Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center select-none">
        <div className="text-5xl mb-3 animate-pulse">🎮</div>
        <p className="text-gray-400 text-sm">Game Center Coming Soon...</p>
      </div>
    </motion.div>
  );
}
