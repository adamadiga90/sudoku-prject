import React, { createContext, useContext, useEffect, useState } from "react";

const GameDifficultyContext = createContext();

export function useGameDifficultyContext() {
  return useContext(GameDifficultyContext);
}
const GameProvider = ({ children }) => {
  const [gameDifficulty, setGameDifficulty] = useState(true);
  const [gameData, setGameData] = useState("");
  const [selected, setSelected] = useState("easy");

  async function getGameApi() {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/sudokugenerate?difficulty=${selected}`, // Note the corrected endpoint
        {
          headers: { "X-Api-Key": "ibbML3pr4zY9nHhnK1iKPg==3FRJa25FAHDmFcug" },
        }
      );
      const data = await response.json();
      if (data) {
        setGameData(data);
        console.log(data);
      }
    } catch (e) {
      console.error("Fetch error:", e);
    }
  }
  useEffect(() => {
    getGameApi();
  }, [selected]);
  // useEffect(() => {
  //   getGameApi();
  // }, []);
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
