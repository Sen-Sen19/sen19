import React, { useState } from "react";
import { Minus, Square, X, Folder, Image, FileText, FileCode2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FolderApp({ onClose, onMinimize, taskbarHeight = 48 }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 160, y: 120 });
  const [size, setSize] = useState({ width: 820, height: 520 });
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

  const files = [
    { name: "App.jsx", icon: <FileCode2 size={18} className="text-blue-400" /> },
    { name: "Taskbar.jsx", icon: <FileCode2 size={18} className="text-cyan-400" /> },
    { name: "Insenity.jsx", icon: <FileCode2 size={18} className="text-green-400" /> },
    { name: "VSCode.jsx", icon: <FileCode2 size={18} className="text-purple-400" /> },
    { name: "Images", icon: <Image size={18} className="text-pink-400" /> },
    { name: "Documents", icon: <FileText size={18} className="text-yellow-400" /> },
  ];

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
      className={`absolute bg-white border border-gray-300 flex flex-col overflow-hidden select-none
        ${isMaximized ? "rounded-none shadow-none" : "rounded-xl shadow-2xl"}`}
    >
      {/* 🧠 Top Bar */}
      <div className="flex justify-between items-center bg-gray-100 px-3 py-1.5 border-b border-gray-300 cursor-move">
        <div className="flex items-center gap-2">
          <Folder size={16} className="text-yellow-500" />
          <span className="text-sm text-gray-700">File Explorer</span>
        </div>

        <div className="flex items-center gap-2">
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
                  className="absolute text-gray-600 translate-x-[2px] translate-y-[-2px]"
                />
                <Square size={12} className="absolute text-gray-600" />
              </>
            )}
          </button>

          <button onClick={onClose} className="hover:bg-red-600 hover:text-white rounded p-1">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* 📁 Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* 📂 Sidebar */}
        <div className="w-48 bg-gray-50 border-r border-gray-200 p-3 text-sm text-gray-600">
          <p className="uppercase text-[11px] text-gray-500 mb-2 font-medium">
            Quick Access
          </p>
          <ul className="space-y-1">
            <li className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Desktop</li>
            <li className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Documents</li>
            <li className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Downloads</li>
            <li className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Pictures</li>
          </ul>
        </div>

        {/* 📁 File Grid */}
        <div className="flex-1 bg-white p-4 overflow-auto grid grid-cols-5 gap-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg mb-1">
                {file.icon}
              </div>
              <p className="text-[11px] text-gray-700 text-center truncate w-full">{file.name}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
