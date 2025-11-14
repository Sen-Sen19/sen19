import React, { useState } from "react";
import { Minus, Square, X } from "lucide-react";
import { motion } from "framer-motion";

export default function VSCode({ onClose, onMinimize }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 120, y: 100 });
  const [size, setSize] = useState({ width: 900, height: 550 });
  const [prevState, setPrevState] = useState(null);
  const [activeFile, setActiveFile] = useState("Inventory");
  const [modalImage, setModalImage] = useState(null); // For image preview

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

  // Projects with dynamic images
  const projectFiles = {
    Inventory: {
      description:
        "This system is used quarterly to record and track all company items. Each item is scanned using its QR code, and the information is automatically stored in our database. It helps maintain accurate counts and ensures everything is properly documented.",
      images: [
        "img/projects/inventory1.png",
        "img/projects/inventory2.png",
        "img/projects/inventory4.png",
        "img/projects/inventory3.png",
      ],
    },
    "Tube Inspection": {
      description: "Inspect tubes and track their status.",
      images: ["img/projects/tube_inspection4.png", "img/projects/tube_inspection1.png", "img/projects/tube_inspection2.png", "img/projects/tube_inspection5.png", "img/projects/tube_inspection3.png"],
    },
    "Machine Requirements": {
      description: "Calculate and manage machine requirements.",
      images: ["img/projects/mrcs3.png", "img/projects/mrcs1.png", "img/projects/mrcs2.png"],
    },
    "FG Loading": {
      description: "Handle finished goods loading.",
      images: ["img/projects/fg1.png", "img/projects/fg2.png"],
    },
    "IRCS Dashboard": {
      description: "Overview of IRCS metrics.",
      images: ["img/projects/ircs1.png" ,"img/projects/ircs2.png"],
    },
    "Secondary Dashboard": {
      description: "Overview of secondary processes.",
      images: ["img/projects/secondary1.png" ,"img/projects/secondary2.png" ,"img/projects/secondary3.png" ,"img/projects/secondary4.png" ,"img/projects/secondary5.png" ,"img/projects/secondary6.png" ,"img/projects/secondary7.png" ,"img/projects/secondary8.png" ,"img/projects/secondary9.png"],
    },
    "Terminal Comparing": {
      description: "Compare terminal outputs and logs.",
      images: ["img/projects/terminal1.png","img/projects/terminal2.png","img/projects/terminal3.png","img/projects/terminal4.png"],
    },
    "FALP Calendar": {
      description: "View and manage schedules.",
      images: ["img/projects/calendar1.png"],
    },
    "Initial Dashboard": {
      description: "The starting dashboard for operations.",
      images: ["img/projects/initial1.png"],
    },
    SenTemplate: {
      description: "Template for your projects or code snippets.",
      images: ["img/projects/template1.png","img/projects/template2.png"],
    },
  };

  const currentProject = projectFiles[activeFile];

  const menuItems = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

  return (
    <>
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
       {/* Top Bar */}
<div className="flex items-center bg-[#2d2d2d] px-3 py-1.5 border-b border-gray-700 cursor-move select-none">
  
  {/* Left: Icon + Title */}
  <div className="flex items-center gap-2">
    <img
      src="https://img.icons8.com/fluency/48/visual-studio-code-2019.png"
      alt="VS Code Logo"
      className="w-5 h-5"
    />

  </div>

  {/* SIDE MENU (horizontal, next to title) */}
  <div className="flex items-center gap-2 ml-4 text-sm text-gray-300"
>
    {menuItems.map((m) => (
      <span key={m} className="hover:bg-[#3a3a3a] px-2 py-1 rounded cursor-pointer">
        {m}
      </span>
    ))}
  </div>

  {/* Window Controls */}
  <div className="flex items-center gap-2 ml-auto">
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
    <button onClick={onClose} className="hover:bg-red-600 hover:text-white rounded p-1">
      <X size={14} />
    </button>
  </div>
</div>


        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
     
       

          {/* Folders Sidebar */}
          <div className="w-48 bg-[#252526] flex flex-col py-3 border-r border-gray-700 text-gray-400 text-sm">
            <p className="uppercase tracking-wide text-gray-500 text-[10px] mb-2 px-2">FOLDERS</p>
            <ul>
              {Object.keys(projectFiles).map((file) => (
                <li
                  key={file}
                  onClick={() => setActiveFile(file)}
                  className={`px-2 py-1 cursor-pointer rounded ${
                    activeFile === file ? "bg-gray-700 text-white" : "hover:text-white"
                  }`}
                >
                  {file}
                </li>
              ))}
            </ul>
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex flex-col overflow-auto">
            {/* Tabs */}
            <div className="flex bg-[#2d2d2d] border-b border-gray-700 text-xs">
              <div className="px-3 py-2 bg-[#1e1e1e] text-blue-400 border-r border-gray-700 flex items-center gap-2">
                <span className="text-sm text-blue-300">{activeFile}</span>
              </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 bg-[#1e1e1e] font-mono text-sm p-4 text-gray-300 overflow-auto">
              <h2 className="text-xl mb-2">{activeFile} System</h2>
              <p className="mb-4">{currentProject.description}</p>
              <div className="flex flex-wrap gap-4">
                {currentProject.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${activeFile} ${idx + 1}`}
                    className="w-[250px] cursor-pointer rounded-lg shadow-lg hover:scale-105 transition-transform"
                    onClick={() => setModalImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal for image preview */}
      {modalImage && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          {/* Semi-transparent background */}
          <div
            onClick={() => setModalImage(null)}
            className="absolute inset-0 bg-black bg-opacity-80"
          ></div>

          {/* Image container */}
          <div className="relative z-[10000]">
            {/* Close button (always in front) */}
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-[-20px] right-[-20px] bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-red-700 z-[10001]"
            >
              <X size={24} />
            </button>

            {/* Image */}
            <img
              src={modalImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl z-[10000]"
            />
          </div>
        </div>
      )}
    </>
  );
}
