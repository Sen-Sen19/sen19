// Taskbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaChevronUp } from "react-icons/fa";
import Weather from "./pages/Weather";
import Calendar from "./pages/Calendar";
import ContactMe from "./pages/Email";
export default function Taskbar({
  time,
  setWindowsOpen,
  windowsOpen,
  isInsenityOpen,
  isInsenityMinimized,
  toggleInsenity,
  taskbarApps,
  windowsButtonRef,
  isVSCodeOpen,
  isVSCodeMinimized,
  toggleVSCode,
  isFolderOpen,
  isFolderMinimized,
  openFolder,
  isGamesOpen,
  isGamesMinimized,
  toggleGames,
  isRecycleBinOpen,
  isRecycleBinMinimized,
  toggleRecycleBin,
  isTerminalOpen,
  isTerminalMinimized,
  toggleTerminal,
  isNotepadOpen,
  isNotepadMinimized,
  toggleNotepad,
  // ⬇️ Add these lines
  isAzraOpen,
  isAzraMinimized,
  toggleAzra,
}) {

  const [showCalendar, setShowCalendar] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [showTrayModal, setShowTrayModal] = useState(false);

  const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formattedDate = time.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  const centerIcons = [
    { name: "Azra Chatbot", img: null, isAzra: true },
    { name: "Contact Me", img: "https://img.icons8.com/fluency/48/email-open.png" },
  ];

  const pinnedApps = [
    { name: "VSCode", img: "https://img.icons8.com/fluency/32/visual-studio-code-2019.png", isOpen: isVSCodeOpen, isMinimized: isVSCodeMinimized, toggle: toggleVSCode },
    { name: "Files", img: "https://img.icons8.com/fluency/32/folder-invoices--v2.png", isOpen: isFolderOpen, isMinimized: isFolderMinimized, toggle: openFolder },
  ];

  const dynamicApps = [
    { name: "Insenity", img: "https://img.icons8.com/fluency/32/internet.png", isOpen: isInsenityOpen, isMinimized: isInsenityMinimized, toggle: toggleInsenity },
    { name: "Games", img: "https://img.icons8.com/fluency/32/controller.png", isOpen: isGamesOpen, isMinimized: isGamesMinimized, toggle: toggleGames },
    { name: "Recycle Bin", img: "https://img.icons8.com/fluency/32/filled-trash.png", isOpen: isRecycleBinOpen, isMinimized: isRecycleBinMinimized, toggle: toggleRecycleBin },
    { name: "Terminal", img: "https://img.icons8.com/fluency/32/console.png", isOpen: isTerminalOpen, isMinimized: isTerminalMinimized, toggle: toggleTerminal },
    { name: "Notepad", img: "https://img.icons8.com/fluency/32/note.png", isOpen: isNotepadOpen, isMinimized: isNotepadMinimized, toggle: toggleNotepad },
  ];

  const renderAppButton = ({ name, img, isOpen, isMinimized, toggle }) => (
    <button
      key={name}
      onClick={() => {
        if (isOpen && !isMinimized) toggle(false);
        else if (isOpen && isMinimized) toggle(true);
        else toggle();
      }}
      className={`relative p-2 rounded-md transition-all duration-200 ${
        isOpen && !isMinimized ? "bg-gray-300 shadow-[0_0_6px_rgba(100,100,100,0.5)]" : "hover:bg-gray-200/60"
      }`}
      title={name}
    >
      <img src={img} alt={name} className="w-7 h-7" />
      <span
        className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[3px] rounded-full transition-all ${
          isOpen && !isMinimized
            ? "bg-gray-800"
            : isMinimized
            ? "bg-gray-400 opacity-70"
            : "bg-transparent"
        }`}
      />
    </button>
  );

const openAzraChatbot = () => toggleAzra();


  const trayRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (trayRef.current && !trayRef.current.contains(event.target)) setShowTrayModal(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full h-12 bg-white/95 backdrop-blur-md flex items-center justify-between px-4 shadow-inner border-t border-gray-300 z-30 select-none">
      <Weather />
      <Calendar isOpen={showCalendar} onClose={() => setShowCalendar(false)} />
      <ContactMe isOpen={isEmailOpen} onClose={() => setIsEmailOpen(false)} />

      <div className="flex items-center space-x-3 mx-auto">
        {/* Windows Button */}
        <div
          ref={windowsButtonRef}
          className="p-1 cursor-pointer rounded transition hover:scale-105"
          onClick={(e) => {
            e.stopPropagation();
            setWindowsOpen((prev) => !prev);
            setShowCalendar(false);
            setIsEmailOpen(false);
          }}
        >
          <div className="w-7 h-7 grid grid-cols-2 grid-rows-2 gap-[1px] rounded-sm overflow-hidden shadow-md">
            <div className="bg-gradient-to-br from-[#00A4EF] to-[#59b2ff]" />
            <div className="bg-gradient-to-br from-[#0078D4] to-[#0089ff]" />
            <div className="bg-gradient-to-br from-[#0078D4] to-[#0089ff]" />
            <div className="bg-gradient-to-br from-[#00A4EF] to-[#006ecd]" />
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <FaSearch className="text-lg" />
          </span>
          <input type="text" placeholder="Search" className="h-8 pl-10 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-50" />
        </div>

        {/* Center icons */}
        <div className="flex items-center space-x-3 ml-3">
          {centerIcons.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-lg p-1 w-12 h-12 transition"
              onClick={(e) => {
                e.stopPropagation();
                if (item.isAzra) openAzraChatbot();
                if (item.name === "Contact Me") {
                  setIsEmailOpen((prev) => !prev);
                  setWindowsOpen(false);
                  setShowCalendar(false);
                }
              }}
            >
              {item.isAzra ? (
                <div className="w-8 h-8 flex items-center justify-center bg-gray-400 rounded-full">
                  <svg fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 2v2M8 2v2M16 2v2M12 22c4.418 0 8-3.582 8-8V8a8 8 0 10-16 0v6c0 4.418 3.582 8 8 8z" />
                    <circle cx="9" cy="12" r="1" />
                    <circle cx="15" cy="12" r="1" />
                  </svg>
                </div>
              ) : (
                <img src={item.img} alt={item.name} className="w-8 h-8" />
              )}
            </div>
          ))}
        </div>

        {/* Taskbar apps */}
        <div className="flex items-center space-x-1 ml-4">
          {pinnedApps.map(renderAppButton)}
          {dynamicApps.filter((app) => taskbarApps.includes(app.name)).map(renderAppButton)}
        </div>
      </div>

      {/* Right Tray */}
      <div className="flex items-center space-x-2 text-gray-700 text-sm font-normal relative">
        <div className="relative" ref={trayRef}>
          <button onClick={() => setShowTrayModal(!showTrayModal)} className="p-1 hover:bg-gray-200 rounded-md">
            <FaChevronUp className="text-gray-600 text-xs" />
          </button>
          {showTrayModal && (
            <div className="absolute bottom-12 right-0 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-3 grid grid-cols-4 gap-3 w-52 z-50">
              {[{ name: "Chat", src: "https://img.icons8.com/fluency/48/email-open.png" }, { name: "Bluetooth", src: "https://img.icons8.com/fluency/24/bluetooth.png" }, { name: "Discord", src: "https://img.icons8.com/color/24/discord-logo.png" }, { name: "XAMPP", src: "../../img/xampp.png" }, { name: "Steam", src: "https://img.icons8.com/color/48/steam.png" }, { name: "VPN", src: "https://img.icons8.com/ios/24/vpn.png" }].map((icon) => (
                <div key={icon.name} className="flex items-center justify-center rounded-lg hover:bg-gray-200/50 cursor-pointer transition" title={icon.name}>
                  <img src={icon.src} alt={icon.name} className="w-5 h-5" />
                </div>
              ))}
            </div>
          )}
        </div>

        <img src="https://img.icons8.com/ios/24/wired-network-connection.png" alt="Network" className="w-5 h-5 opacity-80" />
        <img src="https://img.icons8.com/ios/24/medium-volume.png" alt="Sound" className="w-5 h-5 opacity-80" />

        <div className="flex flex-col items-center ml-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowCalendar((prev) => !prev); }}>
          <span className="text-xs font-normal">{formattedTime}</span>
          <span className="text-[12px] font-normal">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
