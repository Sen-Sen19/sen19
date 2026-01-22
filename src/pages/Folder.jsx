import React, { useState } from "react";
import { Minus, Square, X, Folder, FileCode2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FolderApp({ onClose, onMinimize, taskbarHeight = 48 }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 160, y: 120 });
  const [size, setSize] = useState({ width: 820, height: 520 });
  const [prevState, setPrevState] = useState(null);
  const [currentFolder, setCurrentFolder] = useState("Desktop");

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

  // Desktop Icons
  const desktopIcons = [
    { name: "Recycle Bin", img: "https://img.icons8.com/fluency/48/filled-trash.png" },
    { name: "Insenity", img: "https://img.icons8.com/fluency/48/internet.png" },
    { name: "Terminal", img: "https://img.icons8.com/fluency/48/console.png" },
    { name: "Notepad", img: "https://img.icons8.com/fluency/48/note.png" },
    { name: "Games", img: "https://img.icons8.com/fluency/48/controller.png" },
    { name: "VSCode", img: "https://img.icons8.com/fluency/48/visual-studio-code-2019.png" },
    { name: "Files", img: "https://img.icons8.com/fluency/48/folder-invoices--v2.png" },
  ];

  // Files grouped by folder
  const folderFiles = {
    Desktop: desktopIcons.map(icon => ({ ...icon, type: "desktop" })),
// Inside your folderFiles
Documents: [
  { name: "Documents", icon: <Folder size={22} className="text-yellow-500" />, type: "folder" },
  { name: "Insenity.jsx", icon: <FileCode2 size={22} className="text-green-500" />, type: "file" },
  {
    name: "Marc_Neilsen_Omabtang.pdf",
    icon: <FileCode2 size={22} className="text-red-500" />,
    type: "pdf",
    path: "/sen19/dist/Marc_Neilsen_Omabtang.pdf", 
  },
],

    Downloads: [
      { name: "Taskbar.jsx", icon: <FileCode2 size={22} className="text-cyan-500" />, type: "file" },
    ],
    Pictures: [
      { name: "Images", icon: <Folder size={22} className="text-yellow-500" />, type: "folder" },
    ],
  };

  const filesToShow = folderFiles[currentFolder] || [];

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
      {/* Top Bar */}
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
                <Square size={12} className="absolute text-gray-600 translate-x-[2px] translate-y-[-2px]" />
                <Square size={12} className="absolute text-gray-600" />
              </>
            )}
          </button>

          <button onClick={onClose} className="hover:bg-red-600 hover:text-white rounded p-1">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50 border-r border-gray-200 p-3 text-sm text-gray-600">
          <p className="uppercase text-[11px] text-gray-500 mb-2 font-medium">Quick Access</p>
          <ul className="space-y-1">
            {["Desktop", "Documents", "Downloads", "Pictures"].map((folder) => (
              <li
                key={folder}
                onClick={() => setCurrentFolder(folder)}
                className={`hover:bg-gray-200 px-2 py-1 rounded cursor-pointer flex items-center gap-1 ${
                  currentFolder === folder ? "bg-gray-200 font-medium" : ""
                }`}
              >
                <Folder size={14} className="text-yellow-500" />
                {folder}
              </li>
            ))}
          </ul>
        </div>

        {/* File Grid */}
        <div className="flex-1 bg-white p-3 overflow-auto grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] gap-2 auto-rows-min">
       {filesToShow.map((file) => (
  <div
    key={file.name}
    onClick={() => {
      if (file.type === "pdf") {
        window.open(file.path, "_blank"); // open PDF in real browser tab
      }
    }}
    className="flex flex-col items-center p-1 hover:bg-gray-100 rounded-lg cursor-pointer transition border border-transparent hover:border-gray-200"
  >
    <div
      className={`w-14 h-14 flex items-center justify-center ${
        file.type === "folder"
          ? "bg-yellow-100 rounded-md"
          : file.type === "desktop"
          ? "bg-white rounded-lg"
          : "bg-gray-50 rounded-lg"
      }`}
    >
      {file.type === "desktop" ? (
        <img src={file.img} alt={file.name} className="w-8 h-8" />
      ) : (
        file.icon
      )}
    </div>
    <p className="text-[12px] text-gray-700 text-center w-full mt-1 line-clamp-2">
      {file.name}
    </p>
  </div>
))}

        </div>
      </div>
    </motion.div>
  );
}
