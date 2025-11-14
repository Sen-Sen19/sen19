import React, { useState } from "react";
import { Minus, Square, X, FileCode2, Folder, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function VSCode({ onClose, onMinimize }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 120, y: 100 });
  const [size, setSize] = useState({ width: 900, height: 550 });
  const [prevState, setPrevState] = useState(null);

  const toggleMaximize = () => {
    if (!isMaximized) {
      setPrevState({ position, size });
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight });
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
      className="absolute bg-[#1e1e1e] text-gray-200 rounded-xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col"
    >
      {/* 🧠 Top Bar */}
      <div className="flex justify-between items-center bg-[#2d2d2d] px-3 py-1.5 border-b border-gray-700 cursor-move select-none">
        <div className="flex items-center gap-2">
          <FileCode2 size={16} className="text-blue-400" />
          <span className="text-sm text-gray-300">Visual Studio Code</span>
        </div>
        <div className="flex items-center gap-2">
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
            className="hover:bg-red-600 hover:text-white rounded p-1"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* 🧭 Editor Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* 📁 Sidebar */}
        <div className="w-12 bg-[#252526] flex flex-col items-center py-3 border-r border-gray-700">
          <Folder size={18} className="text-gray-400 hover:text-white mb-4 cursor-pointer" />
          <FileCode2 size={18} className="text-gray-400 hover:text-white mb-4 cursor-pointer" />
          <Terminal size={18} className="text-gray-400 hover:text-white cursor-pointer" />
        </div>

        {/* 🗂️ File Explorer + Editor */}
        <div className="flex flex-1">
          {/* Explorer */}
          <div className="w-48 bg-[#1e1e1e] border-r border-gray-700 p-2 text-xs text-gray-400">
            <p className="uppercase tracking-wide text-gray-500 text-[10px] mb-2">
              Explorer
            </p>
            <ul>
              <li className="hover:text-white cursor-pointer">App.jsx</li>
              <li className="hover:text-white cursor-pointer">Taskbar.jsx</li>
              <li className="hover:text-white cursor-pointer">Insenity.jsx</li>
              <li className="hover:text-white cursor-pointer">Terminal.jsx</li>
              <li className="hover:text-white cursor-pointer">VSCode.jsx</li>
            </ul>
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <div className="flex bg-[#2d2d2d] border-b border-gray-700 text-xs">
              <div className="px-3 py-2 bg-[#1e1e1e] text-blue-400 border-r border-gray-700 flex items-center gap-2">
                <FileCode2 size={12} /> App.jsx
              </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 bg-[#1e1e1e] font-mono text-sm p-4 text-gray-300 overflow-auto">
              <pre>
{`import React from "react";

export default function App() {
  return (
    <div>
      <h1>Hello from VSCode simulation 👋</h1>
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
