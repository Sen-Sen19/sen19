import React, { useState, useRef, useEffect } from "react";
import { Minus, Square, X, Gamepad2, ArrowLeft, Info } from "lucide-react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

export default function Games({ onClose, onMinimize, taskbarHeight = 48 }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 160, y: 160 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [prevState, setPrevState] = useState(null);
  const [activeGame, setActiveGame] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const instructionsRef = useRef(null);

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
      instructions:
        "Use A, S, D, W to slide tiles; matching tiles merge into one, a new tile appears after each move, and you lose only when the board is full with no possible merges.",
    },
    {
      name: "car",
      url: "https://sen-sen19.github.io/marcneilsen/car/",
      icon: "Truck",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "checker",
      url: "https://sen-sen19.github.io/marcneilsen/checker/",
      icon: "Box",
      instructions:
        "In this 2-player checkers game, players take turns left-clicking a piece to select it and then left-clicking a valid square to move or capture; pieces move diagonally, must capture when possible, and become kings when they reach the opposite side.",
    },
    {
      name: "color Burst",
      url: "https://sen-sen19.github.io/marcneilsen/colorburst/",
      icon: "Droplet",
      instructions:
        "Tap only colored tiles on the 9×9 board to survive — avoid tapping uncolored tiles; the goal is to last as long as possible before all tiles lose color.",
    },
    {
      name: "dyson",
      url: "https://sen-sen19.github.io/marcneilsen/dyson/",
      icon: "Aperture",
      instructions: "Combine numbers to reach 2048.",
    },

    {
      name: "hitter",
      url: "https://sen-sen19.github.io/marcneilsen/hitter/",
      icon: "Zap",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "minesweeper",
      url: "https://sen-sen19.github.io/marcneilsen/minesweeper/",
      icon: "Bomb",
      instructions: "Combine numbers to reach 2048.",
    },

    {
      name: "pinotiles",
      url: "https://sen-sen19.github.io/marcneilsen/pianotiles/",
      icon: "Grid",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "pixel",
      url: "https://sen-sen19.github.io/marcneilsen/pixel/",
      icon: "Pencil",
      instructions: "Combine numbers to reach 2048.",
    },

    {
      name: "puzzle",
      url: "https://sen-sen19.github.io/marcneilsen/sliding_puzzle/",
      icon: "Puzzle",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "snake",
      url: "https://sen-sen19.github.io/marcneilsen/snake/",
      icon: "Activity",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "typetest",
      url: "https://sen-sen19.github.io/marcneilsen/typetest/",
      icon: "Keyboard",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "ai_derby",
      url: "https://sen-sen19.github.io/marcneilsen/ai_derby/",
      icon: "Cpu",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "astralis",
      url: "https://sen-sen19.github.io/marcneilsen/astralis/",
      icon: "Star",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "burrowed_fate",
      url: "https://sen-sen19.github.io/marcneilsen/burrowed_fate/",
      icon: "Sword",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "map",
      url: "https://sen-sen19.github.io/marcneilsen/pixie/map.html",
      icon: "Map",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "draw",
      url: "https://sen-sen19.github.io/marcneilsen/pixie/draw.html",
      icon: "Pencil",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "flip Bottle",
      url: "https://sen-sen19.github.io/marcneilsen/pixie/",
      icon: "FlaskRound",
      instructions: "Combine numbers to reach 2048.",
    },

    {
      name: "prey_hunter",
      url: "https://sen-sen19.github.io/marcneilsen/prey_hunter/",
      icon: "Target",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "shoot",
      url: "https://sen-sen19.github.io/marcneilsen/shoot/",
      icon: "Zap",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "simulator",
      url: "https://sen-sen19.github.io/marcneilsen/simulator/",
      icon: "Cpu",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "smoke",
      url: "https://sen-sen19.github.io/marcneilsen/smoke_simulator/",
      icon: "Cloud",
      instructions: "Combine numbers to reach 2048.",
    },

    {
      name: "tictactoe",
      url: "https://sen-sen19.github.io/marcneilsen/tictactoe/",
      icon: "X",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "sumo",
      url: "https://sen-sen19.github.io/marcneilsen/sumo/",
      icon: "Weight",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "Snake and Ladder",
      url: "https://sen-sen19.github.io/marcneilsen/snake_ladder/",
      icon: "Route",
      instructions: "Combine numbers to reach 2048.",
    },
    {
      name: "Imagine That",
      url: "http://azra-ai.great-site.net/imaginethat/",
      icon: "Brain",
      openInNewTab: true,
    },

    {
      name: "Word Search",
      url: "http://azra-ai.great-site.net/word_search/",
      icon: "BookOpen",
      openInNewTab: true,
      instructions:
        "Find and select the listed words hidden in the grid (horizontal, vertical, or diagonal). Mark all words to win.",
    },

    {
      name: "arsen",
      url: "https://sen-sen19.github.io/marcneilsen/arsen/",
      icon: "FileCode2",
      instructions: "Combine numbers to reach 2048.",
    },
  ];

  const handleBack = () => {
    setActiveGame(null);
    setShowInstructions(false);
  };

  // Click outside instructions to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        instructionsRef.current &&
        !instructionsRef.current.contains(e.target)
      ) {
        setShowInstructions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <div className="flex justify-between items-center bg-gray-800 px-3 py-1.5 border-b border-gray-700 cursor-move select-none relative">
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
          {activeGame && (
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="ml-2 hover:bg-gray-700 p-1 rounded"
            >
              <Info size={16} />
            </button>
          )}

          {/* Instructions overlay */}
          {showInstructions && activeGame && (
            <div
              ref={instructionsRef}
              className="absolute top-10 left-0 bg-gray-900 border border-gray-700 rounded-lg p-3 w-64 z-50 shadow-lg"
            >
              <h3 className="font-bold mb-1">
                {activeGame.name.replace(/_/g, " ")}
              </h3>
              <p>{activeGame.instructions || "No instructions available."}</p>
            </div>
          )}
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
                  onClick={() => {
                    if (game.openInNewTab) {
                      window.open(game.url, "_blank");
                    } else {
                      setActiveGame(game);
                    }
                  }}
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
