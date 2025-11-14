import React, { useState, useEffect } from "react";
import { Minus, Square, X, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RecycleBin({ onClose, onMinimize, taskbarHeight = 48 }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 180, y: 150 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [prevState, setPrevState] = useState(null);

  const HEADER_HEIGHT = 40; // header height in pixels

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
      style={{ zIndex: 50 }}
      className={`absolute bg-white overflow-hidden border border-gray-300
        ${isMaximized ? "rounded-none shadow-none" : "rounded-xl shadow-2xl"}`}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center bg-gray-100 border-b px-3 py-1.5 cursor-move"
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="flex items-center space-x-2">
          <Trash2 size={18} className="text-red-500" />
          <span className="font-medium text-sm">Recycle Bin</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={onMinimize} className="hover:bg-gray-200 rounded p-1">
            <Minus size={14} />
          </button>
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
                  className="absolute text-gray-700 translate-x-[2px] translate-y-[-2px]"
                />
                <Square size={12} className="absolute text-gray-700" />
              </>
            )}
          </button>
          <button onClick={onClose} className="hover:bg-red-500 hover:text-white rounded p-1">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div
        className="p-4 text-gray-700 text-sm flex items-center justify-center"
        style={{ height: size.height - HEADER_HEIGHT }}
      >
        <p className="text-center text-gray-500">🧹 The Recycle Bin is empty.</p>
      </div>
    </motion.div>
  );
}
