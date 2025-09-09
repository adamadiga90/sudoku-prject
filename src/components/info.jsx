import React, { useState } from "react";
import { useGameDifficultyContext } from "../gameContext";

const Info = ({ isVisible, setIsVisible }) => {
  const { selected, setSelected, getGameApi } = useGameDifficultyContext();

  function changeDifficulty(e) {
    setSelected(e.target.value);
    setIsVisible(!isVisible);
  }
  return (
    <div className="bg-[#F4CE14] text-[#45474B] font-bold flex justify-center">
      <div>
        <label htmlFor="option-select">Game Difficulty : </label>
        <select
          className="bg-[#00000047] rounded-[5px] ml-[10px]"
          id="option-select"
          value={selected}
          onChange={(e) => changeDifficulty(e)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default Info;
