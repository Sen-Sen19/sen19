import { useState, useRef, useEffect, useMemo } from "react";

export default function Windows({ isOpen = true, onClose, openWindow }) {
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(isOpen);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => setOpen(isOpen), [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // 🧩 Pinned apps
  const pinnedApps = useMemo(
    () => [
      { name: "Edge", img: "https://img.icons8.com/color/48/ms-edge-new.png" },
      { name: "VSCode", img: "https://img.icons8.com/color/48/visual-studio-code-2019.png" },
      { name: "Files", img: "https://img.icons8.com/fluency/48/folder-invoices.png" },
      { name: "Terminal", img: "https://img.icons8.com/fluency/48/console.png" },
      { name: "Notepad", img: "https://img.icons8.com/fluency/48/note.png" },
      { name: "Games", img: "https://img.icons8.com/fluency/48/controller.png" },
      { name: "Insenity", img: "https://img.icons8.com/color/48/brain.png" },
      { name: "Spotify", img: "https://img.icons8.com/fluency/48/spotify.png" },
      { name: "Chrome", img: "https://img.icons8.com/color/48/chrome--v1.png" },
      { name: "Settings", img: "https://img.icons8.com/ios-glyphs/48/settings.png" },
    ],
    []
  );

  // 🕑 Recent apps
  const recentApps = useMemo(() => {
    const items = [
      { name: "Photos", img: "https://img.icons8.com/fluency/48/picture.png" },
      { name: "Documents", img: "https://img.icons8.com/color/48/ms-word.png" },
      { name: "VSCode", img: "https://img.icons8.com/color/48/visual-studio-code-2019.png" },
      { name: "Report.docx", img: "https://img.icons8.com/color/48/ms-word.png" },
      { name: "Project.zip", img: "https://img.icons8.com/color/48/zip.png" },
    ];
    return items.sort(() => Math.random() - 0.5);
  }, []);

  // 🧠 Filter apps by search
  const filteredPinned = useMemo(() => {
    if (!searchQuery) return pinnedApps;
    return pinnedApps.filter((app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, pinnedApps]);

  const handleAppClick = (appName) => {
    if (openWindow) openWindow(appName);
    setOpen(false);
    onClose?.();
  };

  const renderGrid = (items) =>
    items.map((item) => (
      <div
        key={item.name}
        onClick={() => handleAppClick(item.name)}
        className="flex flex-col items-center cursor-pointer hover:bg-gray-200/50 rounded-lg p-3 w-20 h-20 transition"
      >
        <img src={item.img} alt={item.name} className="w-10 h-10" />
        <span className="text-xs mt-1 text-gray-700 text-center">{item.name}</span>
      </div>
    ));

  return (
    <>
      {/* Button ref (for click detection in App.jsx) */}
      <div ref={buttonRef} />

      {/* ⚙️ Start Menu Panel */}
      <div
        ref={panelRef}
        className={`fixed bottom-[4.5rem] left-1/2 -translate-x-1/2 w-[36rem] max-h-[70vh] bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 z-50 transition-all duration-300
        ${open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95 pointer-events-none"}`}
      >
        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search for apps or files"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-full border border-gray-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500"
        />

        {/* 📌 Pinned Apps */}
        <section className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Pinned</h3>
          <div className="grid grid-cols-6 gap-4 justify-items-center">
            {filteredPinned.length > 0 ? (
              renderGrid(filteredPinned)
            ) : (
              <p className="text-gray-500 text-sm col-span-6">No results found</p>
            )}
          </div>
        </section>

        {/* 🕒 Recent */}
        {!searchQuery && (
          <section className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Recent</h3>
            <div className="grid grid-cols-6 gap-4 justify-items-center">
              {renderGrid(recentApps)}
            </div>
          </section>
        )}

        {/* 👤 Footer */}
        <div className="border-t border-gray-300 pt-3 flex justify-between items-center text-gray-700">
          <div className="flex items-center space-x-2">
            <img
              src="../../img/logo.png"
              alt="user"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <span className="font-medium text-sm">Sen</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-1 rounded-full hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
