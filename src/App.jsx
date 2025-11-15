import { useState, useEffect, useRef } from "react";
import Windows from "./pages/Windows";
import Email from "./pages/Email";
import Insenity from "./pages/Insenity";
import Taskbar from "./Taskbar";
import RecycleBin from "./pages/RecycleBin";
import Folder from "./pages/Folder";
import Terminal from "./pages/Terminal";
import Notepad from "./pages/Notepad";
import Games from "./pages/Games";
import VSCode from "./pages/VSCode";
import Azra from "./pages/Azra";

export default function App() {
  const [time, setTime] = useState(new Date());
  const [windows, setWindows] = useState({
    Windows: { open: false, minimized: false, zIndex: 0 },
    Calendar: { open: false, minimized: false, zIndex: 0 },
    Email: { open: false, minimized: false, zIndex: 0 },
    Insenity: { open: false, minimized: false, zIndex: 0 },
    "Recycle Bin": { open: false, minimized: false, zIndex: 0 },
    Files: { open: false, minimized: false, zIndex: 0 },
    Terminal: { open: false, minimized: false, zIndex: 0 },
    Notepad: { open: false, minimized: false, zIndex: 0 },
    Games: { open: false, minimized: false, zIndex: 0 },
    VSCode: { open: false, minimized: false, zIndex: 0 },
    Azra: { open: false, minimized: false, zIndex: 0 },
  });

  const [taskbarApps, setTaskbarApps] = useState([]);
  const windowsRef = useRef(null);
  const windowsButtonRef = useRef(null);
  const hasFullscreen = useRef(false);
  const topZIndex = useRef(1);

  // 🕒 Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🧠 Close Start menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        windowsRef.current &&
        !windowsRef.current.contains(e.target) &&
        windowsButtonRef.current &&
        !windowsButtonRef.current.contains(e.target)
      ) {
        setWindows((prev) => ({
          ...prev,
          Windows: { ...prev.Windows, open: false },
        }));
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  // 🌐 Fullscreen on first click
  const enableFullscreen = () => {
    if (hasFullscreen.current) return;
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    hasFullscreen.current = true;
  };

  // 🪟 Window Control Functions
  const openWindow = (name) => {
    bringToFront(name);
    setWindows((prev) => ({ ...prev, [name]: { ...prev[name], open: true, minimized: false } }));
    const dynamicApps = ["Insenity", "Games", "Recycle Bin", "Terminal", "Notepad", "Azra"];
    if (dynamicApps.includes(name) && !taskbarApps.includes(name)) {
      setTaskbarApps((prev) => [...prev, name]);
    }
  };

  const closeWindow = (name) => {
    setWindows((prev) => ({ ...prev, [name]: { ...prev[name], open: false, minimized: false } }));
    const dynamicApps = ["Insenity", "Games", "Recycle Bin", "Terminal", "Notepad", "Azra"];
    if (dynamicApps.includes(name)) {
      setTaskbarApps((prev) => prev.filter((app) => app !== name));
    }
  };

  const minimizeWindow = (name) => {
    setWindows((prev) => ({ ...prev, [name]: { ...prev[name], minimized: true } }));
  };

  const toggleWindow = (name, forceState = null) => {
    setWindows((prev) => {
      const win = prev[name];
      if (forceState === true) return { ...prev, [name]: { ...win, open: true, minimized: false } };
      if (forceState === false) return { ...prev, [name]: { ...win, minimized: true } };
      if (!win.open) return { ...prev, [name]: { ...win, open: true, minimized: false } };
      if (win.minimized) return { ...prev, [name]: { ...win, minimized: false } };
      return { ...prev, [name]: { ...win, minimized: true } };
    });
    bringToFront(name);
  };

  // 🖱 Bring window to front
  const bringToFront = (name) => {
    setWindows((prev) => ({
      ...prev,
      [name]: { ...prev[name], zIndex: topZIndex.current++ },
    }));
  };

  // 🖥 Desktop Icons
const desktopIcons = [
  { name: "Recycle Bin", img: "https://img.icons8.com/fluency/48/filled-trash.png" },
  { name: "Insenity", img: "https://img.icons8.com/fluency/48/internet.png" },
  { name: "Terminal", img: "https://img.icons8.com/fluency/48/console.png" },
  { name: "Notepad", img: "https://img.icons8.com/fluency/48/note.png" },
  { name: "Games", img: "https://img.icons8.com/fluency/48/controller.png" },
  { name: "VSCode", img: "https://img.icons8.com/fluency/48/visual-studio-code-2019.png" },
  { name: "Files", img: "https://img.icons8.com/fluency/48/folder-invoices--v2.png" },
  // { name: "Azra", img: "https://img.icons8.com/fluency/48/chatbot.png" }, // 💫 Add this
];

  // 🪟 Render windows with z-index & bring-to-front
const renderWindow = (name, Component) =>
windows[name].open && !windows[name].minimized
 ? (
    <div
      key={name}
      style={{ zIndex: windows[name].zIndex }}
      onMouseDown={() => bringToFront(name)}
      className="absolute"
    >
      <Component
        isOpen={windows[name].open && !windows[name].minimized} // important!
        onClose={() => closeWindow(name)}
        onMinimize={() => minimizeWindow(name)}
      />
    </div>
  ) : null;


  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative overflow-hidden select-none"
      style={{
        backgroundImage:
          "url('https://1images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1920&auto=format&fit=crop')",
      }}
      onClick={enableFullscreen}
    >
      <div className="absolute inset-0 bg-black/30" />

      {/* 🖥 Desktop Icons */}
      <div className="absolute top-8 left-8 flex flex-col space-y-6 z-10">
        {desktopIcons.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center cursor-pointer"
            onDoubleClick={() => openWindow(item.name)}
          >
            <img src={item.img} alt={item.name} className="w-12 h-12" />
            <span className="text-sm mt-1 text-white drop-shadow">{item.name}</span>
          </div>
        ))}
      </div>

      {/* 🪟 Floating Windows */}
      <div ref={windowsRef}>
        {renderWindow("Windows", Windows)}
        {renderWindow("Email", Email)}
        {renderWindow("Insenity", Insenity)}
        {renderWindow("Recycle Bin", RecycleBin)}
        {renderWindow("Files", Folder)}
        {renderWindow("Terminal", Terminal)}
        {renderWindow("Notepad", Notepad)}
        {renderWindow("Games", Games)}
        {renderWindow("VSCode", VSCode)}
        {renderWindow("Azra", Azra)}
      </div>

      {/* 🧭 Taskbar */}
 <Taskbar
  time={time}
  setWindowsOpen={(v) =>
    setWindows((prev) => ({ ...prev, Windows: { ...prev.Windows, open: v } }))
  }
  toggleCalendar={(forceState = null) => toggleWindow("Calendar", forceState)}
  isCalendarOpen={windows.Calendar.open}
  isCalendarMinimized={windows.Calendar.minimized}
  setEmailOpen={(v) => setWindows((prev) => ({ ...prev, Email: { ...prev.Email, open: v } }))}
  windowsOpen={windows.Windows.open}

  // ✅ FIX HERE — forward forceState argument properly
  isInsenityOpen={windows.Insenity.open}
  isInsenityMinimized={windows.Insenity.minimized}
  toggleInsenity={(forceState = null) => toggleWindow("Insenity", forceState)}

  taskbarApps={taskbarApps}
  windowsButtonRef={windowsButtonRef}

  isVSCodeOpen={windows.VSCode.open}
  isVSCodeMinimized={windows.VSCode.minimized}
  toggleVSCode={(forceState = null) => toggleWindow("VSCode", forceState)}

  isFolderOpen={windows.Files.open}
  isFolderMinimized={windows.Files.minimized}
  openFolder={(forceState = null) => toggleWindow("Files", forceState)}

  isGamesOpen={windows.Games.open}
  isGamesMinimized={windows.Games.minimized}
  toggleGames={(forceState = null) => toggleWindow("Games", forceState)}

  isRecycleBinOpen={windows["Recycle Bin"].open}
  isRecycleBinMinimized={windows["Recycle Bin"].minimized}
  toggleRecycleBin={(forceState = null) => toggleWindow("Recycle Bin", forceState)}

  isTerminalOpen={windows.Terminal.open}
  isTerminalMinimized={windows.Terminal.minimized}
  toggleTerminal={(forceState = null) => toggleWindow("Terminal", forceState)}

  isNotepadOpen={windows.Notepad.open}
  isNotepadMinimized={windows.Notepad.minimized}
  toggleNotepad={(forceState = null) => toggleWindow("Notepad", forceState)}

  isAzraOpen={windows.Azra.open}
  isAzraMinimized={windows.Azra.minimized}
  toggleAzra={(forceState = null) => toggleWindow("Azra", forceState)}

  toggleWindow={toggleWindow}
/>

    </div>
  );
}
