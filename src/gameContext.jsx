import React, { createContext, useContext, useEffect, useState } from "react";

const GameDifficultyContext = createContext();

export function useGameDifficultyContext() {
  return useContext(GameDifficultyContext);
}
const GameProvider = ({ children }) => {
  const [gameDifficulty, setGameDifficulty] = useState(true);
  const [gameData, setGameData] = useState("");
  const [selected, setSelected] = useState("Medium");

  async function getGameApi() {
    try {
      const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
      const data = await response.json();
      if (data) {
        setGameData(data.newboard.grids[0]);
      }
    } catch (e) {
      console.log(e);
    }
  }
  if (gameData.difficulty !== selected) {
    getGameApi();
  }
  useEffect(() => {
    getGameApi();
  }, []);
  const values = {
    gameData,
    gameDifficulty,
    setGameDifficulty,
    getGameApi,
    selected,
    setSelected,
  };
  return (
    <GameDifficultyContext.Provider value={values}>
      {children}
    </GameDifficultyContext.Provider>
  );
};

export default GameProvider;
