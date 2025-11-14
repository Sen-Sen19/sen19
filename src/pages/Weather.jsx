import { useState, useEffect, useRef } from "react";

const PH_CITIES = [
  "Manila",
  "Quezon City",
  "Cebu",
  "Davao",
  "Lipa",
  "Laguna",
  "Batangas",
  "Tagaytay",
  "Baguio",
  "Iloilo",
  "Cagayan de Oro",
];

const WEATHER_DATA = {
  Manila: { temp_c: 33, humidity: 60, wind_kph: 10, condition: { text: "Sunny", icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png" } },
  "Quezon City": { temp_c: 31, humidity: 65, wind_kph: 8, condition: { text: "Partly Cloudy", icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png" } },
  Cebu: { temp_c: 30, humidity: 70, wind_kph: 12, condition: { text: "Cloudy", icon: "https://cdn.weatherapi.com/weather/64x64/day/119.png" } },
  Davao: { temp_c: 32, humidity: 80, wind_kph: 15, condition: { text: "Thunderstorms", icon: "https://cdn.weatherapi.com/weather/64x64/day/386.png" } },
  Lipa: { temp_c: 28, humidity: 85, wind_kph: 10, condition: { text: "Rainy", icon: "https://cdn.weatherapi.com/weather/64x64/day/308.png" } },
  Laguna: { temp_c: 29, humidity: 77, wind_kph: 9, condition: { text: "Drizzle", icon: "https://cdn.weatherapi.com/weather/64x64/day/266.png" } },
  Batangas: { temp_c: 30, humidity: 73, wind_kph: 10, condition: { text: "Windy", icon: "https://cdn.weatherapi.com/weather/64x64/day/299.png" } },
  Tagaytay: { temp_c: 24, humidity: 90, wind_kph: 12, condition: { text: "Foggy", icon: "https://cdn.weatherapi.com/weather/64x64/day/143.png" } },
  Baguio: { temp_c: 22, humidity: 88, wind_kph: 14, condition: { text: "Cool & Breezy", icon: "https://cdn.weatherapi.com/weather/64x64/day/119.png" } },
  Iloilo: { temp_c: 31, humidity: 75, wind_kph: 11, condition: { text: "Humid", icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png" } },
  "Cagayan de Oro": { temp_c: 30, humidity: 82, wind_kph: 9, condition: { text: "Scattered Clouds", icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png" } },
};

// Generate mock 7-day forecast
const generateForecast = () => {
  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split("T")[0],
      day: {
        maxtemp_c: 28 + Math.floor(Math.random() * 5),
        mintemp_c: 20 + Math.floor(Math.random() * 4),
        condition: {
          text: "Partly Cloudy",
          icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png",
        },
      },
    };
  });
};

// News data (your same structure)
const NEWS_CATEGORIES = {
  Trending: [
    {
      title: "AI Revolutionizing Creative Industries Worldwide",
      source: "Tech Insider",
      url: "#",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=60",
    },
    {
     title: "Philippines Launches First Smart City Initiative",
      source: "Inquirer Tech",
      url: "#",
      img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
    },
 {
  title: "Global Climate Change Threatens Coastal Cities",
  source: "Earth News",
  url: "#",
  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
}
,
  ],
Tech: [
{
  title: "New Electric Vehicle Breaks Range Record",
  source: "Auto World",
  url: "#",
  img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
},


,
{
  title: "Apple M4 Chip Outperforms Competitors by 40%",
  source: "The Verge",
  url: "#",
  img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
},

{
  title: "New Neural Accelerator Cuts AI Inference Energy Use by 70%",
  source: "TechCrunch",
  url: "#",
  img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
}
,

{
    title: "Google Announces Quantum Leap in AI Models",
    source: "TechCrunch",
    url: "#",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },
],


  Science: [
    {
      title: "Scientists Discover Microbial Life on Mars-Like Planet",
      source: "Science Today",
      url: "#",
      img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=60",
    },
    {
      title: "NASA Confirms New Habitable Exoplanet Discovery",
      source: "Space.com",
      url: "#",
      img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=600&q=60",
    },
    {
      title: "AI Helps Decode Deep Sea Microorganisms",
      source: "Nature Journal",
      url: "#",
  img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],

  World: [
    {
      title: "Global Markets Recover After Economic Dip",
      source: "Finance Daily",
      url: "#",
      img: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=600&q=60",
    },
    {
      title: "UN Holds Emergency Climate Summit in Geneva",
      source: "BBC World",
      url: "#",
      img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=600&q=60",
    },
  ],
};



export default function Weather() {
  const [city, setCity] = useState("Manila");
  const [weather, setWeather] = useState(WEATHER_DATA["Manila"]);
  const [forecast, setForecast] = useState(generateForecast());
  const [panelOpen, setPanelOpen] = useState(false);

  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setWeather(WEATHER_DATA[city]);
    setForecast(generateForecast());
  }, [city]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Weather Button */}
      <div
        ref={buttonRef}
        className="flex items-center space-x-2 cursor-pointer relative z-50"
        onClick={() => setPanelOpen(!panelOpen)}
      >
        <img src={weather.condition.icon} alt={weather.condition.text} className="w-5 h-5" />
        <div className="flex flex-col text-xs">
          <span className="font-medium">{weather.temp_c}°C</span>
          <span className="truncate w-24">{weather.condition.text}</span>
        </div>

        {/* Glass Panel */}
        <div
          ref={panelRef}
          className={`absolute bottom-12 left-0 w-[950px] h-[100vh]
          bg-white/80 backdrop-blur-3xl backdrop-saturate-150
          rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
          border border-white/30
          p-6 transition-all duration-300 ease-in-out overflow-y-auto
          ${
            panelOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-4 opacity-0 pointer-events-none"
          }`}
        >
<h2 className="text-xl font-semibold mb-4">
            🪟 News & Weather Dashboard
          </h2>

          <div className="grid grid-cols-3 gap-6">
            {/* WEATHER COLUMN */}
            <div className="col-span-1 space-y-4">
              <div className="p-4 bg-white/60 rounded-lg shadow-sm">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {PH_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <div className="flex items-center space-x-3">
                  <img
                    src={weather.condition.icon}
                    alt={weather.condition.text}
                    className="w-12 h-12"
                  />
                  <div>
                    <p className="font-semibold">{city}</p>
                    <p>
                      {Math.round(weather.temp_c)}°C — {weather.condition.text}
                    </p>
                    <p className="text-xs text-gray-500">
                      Humidity: {weather.humidity}% | Wind: {weather.wind_kph} kph
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini Weather Widgets */}
              <div className="grid grid-cols-2 gap-3">
                {["Cebu", "Davao", "Tagaytay", "Baguio"].map((loc, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white/50 rounded-lg shadow flex flex-col items-center text-center hover:scale-[1.03] transition-transform"
                  >
                    <p className="font-semibold text-sm">{loc}</p>
                    <img
                      src="https://cdn.weatherapi.com/weather/64x64/day/113.png"
                      alt="Sunny"
                      className="w-10 h-10"
                    />
                    <p className="text-xs text-gray-600">30°C / 24°C</p>
                  </div>
                ))}
              </div>

              {/* 7-Day Forecast */}
              <div className="mt-4">
                <h3 className="font-semibold mb-2 text-sm">7-Day Forecast</h3>
                <div className="space-y-2">
                  {forecast.map((day) => {
                    const date = new Date(day.date);
                    const dayName = date.toLocaleDateString("en-US", {
                      weekday: "short",
                    });
                    return (
                      <div
                        key={day.date}
                        className="flex justify-between items-center p-2 border rounded bg-white/40"
                      >
                        <span className="text-xs w-12">{dayName}</span>
                        <img
                          src={day.day.condition.icon}
                          alt={day.day.condition.text}
                          className="w-6 h-6"
                        />
                        <span className="text-xs">
                          {Math.round(day.day.maxtemp_c)}° /{" "}
                          {Math.round(day.day.mintemp_c)}°
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* NEWS SECTION */}
            <div className="col-span-2 space-y-8">
              {Object.entries(NEWS_CATEGORIES).map(([category, articles]) => (
                <div key={category}>
                  <h3 className="font-semibold text-lg mb-3">{category}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {articles.map((a, i) => (
                      <a
                        key={i}
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex bg-white/60 rounded-lg shadow-sm hover:bg-white/80 transition-all"
                      >
                        <img
                          src={a.img}
                          alt={a.title}
                          className="w-24 h-24 rounded-l-lg object-cover"
                        />
                        <div className="p-3 flex flex-col justify-between">
                          <p className="text-sm font-medium line-clamp-2">
                            {a.title}
                          </p>
                          <p className="text-xs text-gray-500">{a.source}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
