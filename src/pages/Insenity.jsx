import React, { useState, useEffect } from "react";
import { Minus, Square, X, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Insenity({ onClose, onMinimize, taskbarHeight = 48 }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 850, height: 520 });
  const [prevState, setPrevState] = useState(null);

  const [activeTab, setActiveTab] = useState("facebook");
  const [searchQuery, setSearchQuery] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const tabs = [
    { name: "Facebook", url: "https://www.facebook.com" },
    { name: "GitHub", url: "https://github.com/sen-sen19" },
    { name: "Portfolio", url: "https://sen-sen19.github.io/neilsen_omabtang/" },

  ];

  useEffect(() => {
    // Auto-update URL input when switching tabs (except Insenity)
    if (activeTab !== "google") {
      const tabUrl = tabs.find(t => t.name.toLowerCase() === activeTab)?.url || "";
      setUrlInput(tabUrl);
    } else {
      setUrlInput("");
    }
  }, [activeTab]);

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

  const handleSearch = () => {
    if (searchQuery) {
      const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
      window.open(searchUrl, "_blank");
      setSearchQuery("");
    }
  };

  const handleUrlGo = () => {
    if (urlInput) {
      window.open(urlInput, "_blank");
      setUrlInput("");
    }
  };

  const redirectToGitHub = () => {
    window.open("https://github.com/sen-sen19", "_blank");
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      animate={{ x: position.x, y: position.y, width: size.width, height: size.height }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      style={{ zIndex: 50 }}
      className={`absolute bg-white border border-gray-300 overflow-hidden flex flex-col ${
        isMaximized ? "rounded-none shadow-none" : "rounded-md shadow-md"
      }`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-gray-50 border-b border-gray-300 px-3 py-1 cursor-move">
        <div className="flex items-center space-x-2">
          <Globe size={16} className="text-blue-500" />
          <span className="font-medium text-sm text-gray-700">Insenity Browser</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={onMinimize} className="hover:bg-gray-100 rounded p-1">
            <Minus size={14} className="text-gray-600" />
          </button>
          <button
            onClick={toggleMaximize}
            className="hover:bg-gray-100 rounded p-1 relative w-5 h-5 flex items-center justify-center"
          >
            {!isMaximized ? (
              <Square size={14} className="text-gray-600" />
            ) : (
              <Square size={12} className="absolute text-gray-600 translate-x-[2px] translate-y-[-2px]" />
            )}
          </button>
          <button onClick={onClose} className="hover:bg-red-500 hover:text-white rounded p-1">
            <X size={14} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 border-b border-gray-200 px-3 py-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.name.toLowerCase()
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            } rounded-md`}
            onClick={() => setActiveTab(tab.name.toLowerCase())}
          >
            {tab.name}
          </button>
        ))}
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "google" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("google")}
        >
          Insenity Search
        </button>
      </div>

      {/* URL Bar (for tabs) */}
      {activeTab !== "google" && (
        <div className="flex items-center px-3 py-2 border-b border-gray-200 bg-gray-50">
          <input
            type="text"
            placeholder="Enter URL..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUrlGo()}
            className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleUrlGo}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition text-sm"
          >
            Go
          </button>
        </div>
      )}

      {/* Insenity Search Page */}
      {activeTab === "google" && (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
          <h1 className="text-7xl font-extrabold text-blue-600 mb-10 select-none">Insenity</h1>
          <div className="flex w-full max-w-lg shadow-lg rounded-full overflow-hidden border border-gray-200 bg-white">
            <input
              type="text"
              placeholder="Search Insenity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-full"
            />
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all rounded-r-full"
            >
              Search
            </button>
          </div>
          <p className="mt-6 text-gray-500 text-sm">
            Type your query and hit enter or click search
          </p>
        </div>
      )}

      {/* Page Content */}
      <div className="flex-1 p-6 text-gray-700 overflow-auto">
        {activeTab === "github" ? (
          <div className="w-full">
          <img
  src="img/projects/github3.png"
  alt="GitHub Part 1"
  onClick={redirectToGitHub}
  className="w-full h-auto object-cover cursor-pointer"
/>
<img
  src="img/projects/github4.png"
  alt="GitHub Part 2"
  onClick={redirectToGitHub}
  className="w-full h-auto object-cover cursor-pointer"
/>

          </div>
        ) : activeTab !== "google" ? (
          <iframe
            src={urlInput}
            width="100%"
            height="100%"
            className="border-0 rounded-lg"
            title="Browser Content"
          />
        ) : null}
      </div>
    </motion.div>
  );
}
