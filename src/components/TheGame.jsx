import React, { useContext, useEffect, useState } from "react";
import { useGameDifficultyContext } from "../gameContext";

const TheGame = () => {
  const { gameData } = useGameDifficultyContext();
  const [gameArray, setGameArray] = useState([]);
  const [number, setNumber] = useState("");
  const [theBox, setTheBox] = useState([]);
  const [preGameArray, setPreGameArray] = useState([]);
  const [solution, setSolution] = useState([]);
  const [mistake, setMistake] = useState(0);

  function setTheGame() {
    if (gameData ?? gameData.value.length > 0) {
      setSolution(gameData.solution);
      setPreGameArray(gameData.value);
      let newGameArray = gameData.value.map((array) =>
        array.map((item) => (item === 0 ? "" : item))
      );
      setGameArray(newGameArray);
    }
  }
  // function checkMistakes(number) {
  //   if (solution[theBox[0]][theBox[1]] !== number) {
  //     console.log(`Error: ${solution[theBox[0]][theBox[1]]}`);
  //     let newGameArray = gameArray.map((bigItem, bigIndex) =>
  //       bigIndex === theBox[0]
  //         ? bigItem.map((item, index) =>
  //             index !== theBox[2] ? `${item}` : item
  //           )
  //         : bigItem
  //     );
  //     // setGameArray(newGameArray);
  //   }
  // }
  useEffect(() => {
    setTheGame();
    console.log("Hello");
  }, [gameData]);
  function checkMistakes(number) {
    setMistake((prevMistake) => prevMistake + 1);
    return [number];
  }
  function handleNumberClick(theNumber) {
    if (theBox.length === 2) {
      setGameArray((prevGame) =>
        prevGame.map((box, boxId) =>
          boxId === theBox[0]
            ? box.map((item, itemId) =>
                itemId === theBox[1]
                  ? solution[theBox[0]][theBox[1]] !== theNumber
                    ? checkMistakes(theNumber)
                    : `${theNumber}`
                  : item
              )
            : box
        )
      );
      setTheBox([]);
    }
  }
  function handleBoxClick(box, arrayIndex, index) {
    if (preGameArray[arrayIndex][index] === 0) {
      setTheBox([arrayIndex, index]);
    }
  }
  function handleRestGame() {
    setMistake(0);
    setTheGame();
  }
  console.log(gameArray);
  if (mistake > 2) {
    return (
      <div className="bg-[#495E57] h-[100vh] flex-col text-[#F4CE14] font-bold text-[40px] flex items-center p-[20px] pt-[50px]">
        <span>You Lost...</span>
        <span
          onClick={handleRestGame}
          className="bg-[#F4CE14] text-[#495E57] mt-[40px] p-[10px] rounded-[5px]"
        >
          Try Again
        </span>
      </div>
    );
  }
  return (
    <div className="h-[500px] mt-[20px] flex flex-col h-[100vh] items-center ">
      <div className="font-bold text-2xl mb-[10px]">
        Mistakes :
        <span className="bg-red-700 text-white p-1 rounded-[5px]">
          {mistake}
        </span>
      </div>
      <div className="border-[2px]  border-black border-solid relative">
        <span className="absolute w-full bg-black h-[5px] bottom-[33%]"></span>
        <span className="absolute w-full bg-black h-[5px] bottom-[66%]"></span>
        <span className="absolute w-[5px] bg-black h-full left-[66%]"></span>
        <span className="absolute w-[5px] bg-black h-full left-[33%]"></span>
        {gameArray.map((item, arrayIndex) => (
          <div className="flex" key={arrayIndex}>
            {item.map((box, index) => (
              <div
                key={index}
                onClick={() => handleBoxClick(box, arrayIndex, index)}
                className={` border-[1px] w-16 h-16 border-black border-solid flex justify-center items-center font-bold text-[50px]
              `}
              >
                {/* {box} */}
                {typeof box === "string" ? (
                  <span className="text-blue-600">{box}</span>
                ) : typeof box === "number" ? (
                  <span>{+box}</span>
                ) : (
                  <span className="text-red-600">{+box}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="bg-[#45474B] text-[#F4CE14]   mt-11 flex justify-center items-center  text-[30px] font-bold">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => {
          return (
            <button
              key={item}
              onClick={() => handleNumberClick(item)}
              className="border-white border-[3px] border-solid px-10"
            >
              {item}
            </button>
          );
        })}
        {theBox}
        {gameData.difficulty}
      </div>
    </div>
  );
};

export default TheGame;
