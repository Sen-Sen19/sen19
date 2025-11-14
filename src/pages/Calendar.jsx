import { useState, useEffect, useRef } from "react";

export default function Calendar({ isOpen, onClose }) {
  const ref = useRef(null);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  };
const notifications = [
  { icon: "🎂", title: "Birthday", desc: "February 2000" },
  { icon: "🎓", title: "College Graduation", desc: "June 2022 — BS Computer Science" },
  { icon: "💡", title: "Encoder (CardBank)", desc: "Jan 2023 - April 2023" },
  { icon: "✨", title: "IT Support & Programmer (Iomni Precision INC)", desc: "June 2023 - November 2023" },
  { icon: "✨", title: "JR Programmer (Theoretics INC)", desc: "November 2023 - May 2024" },
  { icon: "📌", title: "IT System Developer (Furukawalwa Automotive System)", desc: "May 2024 - Present" },
];


  return (
    <div className="fixed inset-0 flex items-end justify-end pb-16 pr-4 z-50">
      <div ref={ref} className="flex flex-col space-y-4 items-end">
        
        {/* Notifications Panel */}
        <div className="w-96 max-h-[50vh] overflow-y-auto p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-2xl text-black">
          <h3 className="text-sm font-semibold mb-3">Notifications</h3>
<ul className="space-y-2 text-sm">
  {notifications.map((n, i) => (
    <li
      key={i}
      className="flex items-start space-x-3 p-3 rounded-lg bg-white/90 hover:bg-white/90 transition shadow-inner"
    >
      {/* Icon */}
      <span className="text-xl">{n.icon}</span>
      
      {/* Text */}
      <div className="flex flex-col">
        <div className="font-semibold">{n.title}</div>
        <div className="text-xs opacity-80">{n.desc}</div>
      </div>
    </li>
  ))}
</ul>

        </div>

        {/* Calendar Panel */}
     <div className="w-96 max-h-[90vh] overflow-y-auto p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-2xl text-black">

          <div className="flex justify-between items-center mb-3">
            <button onClick={prevMonth} className="px-2 py-1 rounded hover:bg-white/70">‹</button>
            <h2 className="text-lg font-semibold">{monthNames[currentMonth]} {currentYear}</h2>
            <button onClick={nextMonth} className="px-2 py-1 rounded hover:bg-white/70">›</button>
          </div>

          <div className="grid grid-cols-7 text-center text-xs font-semibold mb-1 text-black/60">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 text-center gap-y-1">
            {days.map((day, i) => (
              <div
                key={i}
                className={`h-8 flex items-center justify-center rounded-md transition-all
                  ${day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear()
                    ? "bg-blue-500 text-white font-semibold"
                    : day
                    ? "hover:bg-white/70 cursor-pointer"
                    : ""}`}
              >
                {day || ""}
              </div>
            ))}
          </div>

          <div className="mt-3 text-center text-xs text-black/70">{today.toDateString()}</div>
        </div>
      </div>
    </div>
  );
}
