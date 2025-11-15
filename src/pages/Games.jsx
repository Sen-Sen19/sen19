import React, { useState } from "react";
import { Minus, Square, X, Gamepad2, ArrowLeft } from "lucide-react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

export default function Games({ onClose, onMinimize, taskbarHeight = 48 }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 160, y: 160 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [prevState, setPrevState] = useState(null);

  const [activeGame, setActiveGame] = useState(null); // selected game

  const toggleMaximize = () => {
    if (!isMaximized) {
      setPrevState({ position, size });
      setPosition({ x: 0, y: 0 });
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - taskbarHeight,
      });
    } else if (prevState) {
      setPosition(prevState.position);
      setSize(prevState.size);
    }
    setIsMaximized(!isMaximized);
  };

  const games = [
    {
      name: "2048",
      url: "https://sen-sen19.github.io/marcneilsen/2048/",
      icon: "Grid",
    },
    {
      name: "car",
      url: "https://sen-sen19.github.io/marcneilsen/car/",
      icon: "Truck",
    },
    {
      name: "checker",
      url: "https://sen-sen19.github.io/marcneilsen/checker/",
      icon: "Box",
    },
    {
      name: "color Burst",
      url: "https://sen-sen19.github.io/marcneilsen/colorburst/",
      icon: "Droplet",
    },

    {
      name: "dyson",
      url: "https://sen-sen19.github.io/marcneilsen/dyson/",
      icon: "Aperture",
    },

    {
      name: "hitter",
      url: "https://sen-sen19.github.io/marcneilsen/minesweeper/",
      icon: "Zap",
    },
    {
      name: "minesweeper",
      url: "https://sen-sen19.github.io/marcneilsen/minesweeper/",
      icon: "Bomb",
    },

    {
      name: "pinotiles",
      url: "https://sen-sen19.github.io/marcneilsen/pianotiles/",
      icon: "Grid",
    },
    {
      name: "pixel",
      url: "https://sen-sen19.github.io/marcneilsen/pixel/",
      icon: "Pencil",
    },

    {
      name: "puzzle",
      url: "https://sen-sen19.github.io/marcneilsen/sliding_puzzle/",
      icon: "Puzzle",
    },
    {
      name: "snake",
      url: "https://sen-sen19.github.io/marcneilsen/snake/",
      icon: "Activity",
    },
    {
      name: "typetest",
      url: "https://sen-sen19.github.io/marcneilsen/typetest/",
      icon: "Keyboard",
    },
    {
      name: "ai_derby",
      url: "https://sen-sen19.github.io/marcneilsen/ai_derby/",
      icon: "Cpu",
    },
    {
      name: "astralis",
      url: "https://sen-sen19.github.io/marcneilsen/astralis/",
      icon: "Star",
    },
    {
      name: "burrowed_fate",
      url: "https://sen-sen19.github.io/marcneilsen/burrowed_fate/",
      icon: "Sword",
    },
    {
      name: "map",
      url: "https://sen-sen19.github.io/marcneilsen/pixie/map.html",
      icon: "Map",
    },
    {
      name: "draw",
      url: "https://sen-sen19.github.io/marcneilsen/pixie/draw.html",
      icon: "Pencil",
    },
    {
      name: "flip Bottle",
      url: "https://sen-sen19.github.io/marcneilsen/pixie/",
      icon: "FlaskRound",
    },

    {
      name: "prey_hunter",
      url: "https://sen-sen19.github.io/marcneilsen/prey_hunter/",
      icon: "Target",
    },
    {
      name: "shoot",
      url: "https://sen-sen19.github.io/marcneilsen/shoot/",
      icon: "Zap",
    },
    {
      name: "simulator",
      url: "https://sen-sen19.github.io/marcneilsen/simulator/",
      icon: "Cpu",
    },
    {
      name: "smoke",
      url: "https://sen-sen19.github.io/marcneilsen/smoke_simulator/",
      icon: "Cloud",
    },

    {
      name: "tictactoe",
      url: "https://sen-sen19.github.io/marcneilsen/tictactoe/",
      icon: "X",
    },
    {
      name: "arsen",
      url: "https://sen-sen19.github.io/marcneilsen/arsen/",
      icon: "FileCode2",
    },
  ];

  const handleBack = () => setActiveGame(null);

  return (
    <motion.div
      drag={!isMaximized && !activeGame}
      dragMomentum={false}
      animate={{
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      style={{ zIndex: 55 }}
      className={`absolute bg-gradient-to-b from-gray-900 to-gray-800 text-white border border-gray-700 flex flex-col overflow-hidden
        ${isMaximized ? "rounded-none shadow-none" : "rounded-xl shadow-2xl"}`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-gray-800 px-3 py-1.5 border-b border-gray-700 cursor-move select-none">
        <div className="flex items-center gap-2">
          {activeGame && (
            <button
              onClick={handleBack}
              className="hover:bg-gray-700 p-1 rounded"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <Gamepad2 size={16} className="text-purple-400" />
          <span className="text-sm font-medium text-gray-100">
            {activeGame ? activeGame.name.replace(/_/g, " ") : "Games Center"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onMinimize}
            className="hover:bg-gray-700 rounded p-1"
          >
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
          <button
            onClick={onClose}
            className="hover:bg-red-600 hover:text-white rounded p-1"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {!activeGame ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {games.map((game) => {
              const Icon =
                game.icon && Icons[game.icon] ? Icons[game.icon] : Gamepad2;
              return (
                <div
                  key={game.name}
                  onClick={() => game.url && setActiveGame(game)}
                  className={`cursor-pointer bg-gray-800 hover:bg-purple-700 transition rounded-lg flex flex-col items-center justify-center p-4 shadow-md ${
                    !game.url ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Icon size={32} className="mb-2" />
                  <span className="text-sm text-center capitalize">
                    {game.name.replace(/_/g, " ")}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <iframe
            src={activeGame.url}
            title={activeGame.name}
            width="100%"
            height="100%"
            className="border-0 rounded-lg"
          />
        )}
      </div>
    </motion.div>
  );
}
