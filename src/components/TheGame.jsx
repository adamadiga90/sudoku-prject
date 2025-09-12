import React, { useEffect, useRef, useState } from "react";
import { useGameDifficultyContext } from "../gameContext";
import { FaHeart } from "react-icons/fa";
const TheGame = () => {
  const { gameData, getGameApi } = useGameDifficultyContext();

  const [gamePuzzle, setGamePuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [selected, setSelected] = useState();
  const [mistakesCounter, setMistakesCounter] = useState(0);
  const [winner, setWinner] = useState(false);
  const [gameNumbers, setGameNumber] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "D",
  ]);
  function makeGame() {
    if (gameData && gameData.puzzle && gameData.puzzle.length > 0) {
      setGamePuzzle(JSON.parse(JSON.stringify(gameData.puzzle)));
      setSolution(gameData.solution);
    }
  }

  function checkWinning() {
    let checker = 0;
    for (let y = 0; y < 9; y++) {
      for (let i = 0; i < 9; i++) {
        if (gamePuzzle[y][i] !== null) {
          checker = checker + +gamePuzzle[y][i];
        }
      }
    }
    if (checker === 405) {
      setWinner(true);
      console.log("You are a winner");
    }
    console.log(checker);
    console.log(45 * 9);
    console.log(9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1);
  }

  function handleBoxClick(box, rIndex, index) {
    setSelected([rIndex, index, solution[rIndex][index]]);
  }

  function handleNumberClick(e) {
    let newGameArray = gamePuzzle;

    if (selected) {
      if (e.target.innerHTML !== "D") {
        if (+e.target.innerHTML === solution[selected[0]][selected[1]]) {
          newGameArray[selected[0]][selected[1]] = e.target.innerHTML;
        } else {
          newGameArray[selected[0]][selected[1]] = [e.target.innerHTML];
          setMistakesCounter((prevMistakesCounter) => prevMistakesCounter + 1);
        }
      } else {
        newGameArray[selected[0]][selected[1]] = null;
      }
      checkWinning();
    }
    console.log(gamePuzzle[selected[0]]);
    console.log(gameData.puzzle[selected[0]]);
    console.log(gameData);
    setGamePuzzle(newGameArray);
    setSelected();
  }

  useEffect(() => {
    makeGame();
  }, [gameData]);

  const gameContainer = useRef(null);
  const numbersContainer = useRef(null);

  useEffect(() => {
    const handleContainerClick = (e) => {
      if (
        gameContainer.current &&
        !gameContainer.current.contains(e.target) &&
        !numbersContainer.current.contains(e.target)
      ) {
        setSelected();
      }
    };
    document.addEventListener("click", handleContainerClick);
    return () => {
      document.removeEventListener("click", handleContainerClick);
    };
  }, []);

  function handleRestartGame() {
    makeGame();
    setMistakesCounter(0);
  }
  function handleNewGame() {
    getGameApi();
    setMistakesCounter(0);
  }

  return (
    <div className="relative h-[calc(100vh-100px)] w-screen flex flex-col  items-center justify-center ">
      {mistakesCounter === 3 || winner ? (
        <div className="absolute w-[490px] h-[490px] bg-[#f4ce14de] z-10 flex justify-center items-center flex-col text-4xl font-bold gap-[100px]">
          {winner ? <h1>You Won</h1> : <h1>You Lost</h1>}
          <div className="flex justify-center items-center gap-5">
            <button
              onClick={handleRestartGame}
              className="bg-[#45474B] text-white transition p-2 hover:bg-gray-800 hover:text-[#F4CE14]"
            >
              Restart Game
            </button>

            <button
              onClick={handleNewGame}
              className="bg-[#45474B] text-white transition p-2 hover:bg-gray-800 hover:text-[#F4CE14]"
            >
              New Game
            </button>
          </div>
        </div>
      ) : null}
      <div className="flex gap-2">
        {/* <FaHeart key={index} className="text-4xl text-red-500 mb-2" /> */}

        {Array.from({ length: 3 }).map((_, index) =>
          index < mistakesCounter ? (
            <FaHeart key={index} className="text-4xl text-gray-500 mb-2" />
          ) : (
            <FaHeart key={index} className="text-4xl text-red-500 mb-2" />
          )
        )}
      </div>
      <div
        id="game-container"
        ref={gameContainer}
        className="relative  border-black border-4 border-solid"
      >
        <span className="block w-full h-2 bg-black absolute top-[33%]"></span>
        <span className="block w-full h-2 bg-black absolute top-[66%]"></span>
        <span className="block w-2 h-full bg-black absolute left-[66%]"></span>
        <span className="block w-2 h-full bg-black absolute left-[33%]"></span>
        {gamePuzzle && gamePuzzle.length > 0
          ? gamePuzzle.map((row, rIndex) => (
              <div className="flex " key={`x${rIndex}`}>
                {row.map((box, index) =>
                  typeof box === "number" ? (
                    <span
                      key={index}
                      className="font-bold  flex justify-center items-center border text-6xl border-black border-solid w-20 h-20"
                    >
                      {+box}
                    </span>
                  ) : typeof box === "string" ? (
                    <span
                      key={index}
                      onClick={() => handleBoxClick(box, rIndex, index)}
                      className={`${
                        selected &&
                        selected[0] === rIndex &&
                        selected[1] === index
                          ? "bg-slate-200"
                          : "bg-white"
                      } cursor-pointer font-bold text-blue-500 flex justify-center items-center border text-6xl border-black border-solid w-20 h-20`}
                    >
                      {+box}
                    </span>
                  ) : typeof box === "object" && box !== null ? (
                    <span
                      key={index}
                      onClick={() => handleBoxClick(box, rIndex, index)}
                      className={`${
                        selected &&
                        selected[0] === rIndex &&
                        selected[1] === index
                          ? "bg-slate-200"
                          : "bg-white"
                      } cursor-pointer font-bold text-red-500 flex justify-center items-center border text-6xl border-black border-solid w-20 h-20`}
                    >
                      {box}
                    </span>
                  ) : (
                    <span
                      key={index}
                      onClick={() => handleBoxClick(box, rIndex, index)}
                      className={`${
                        selected &&
                        selected[0] === rIndex &&
                        selected[1] === index
                          ? "bg-slate-200"
                          : "bg-white"
                      } cursor-pointer font-bold  flex justify-center items-center border text-6xl border-black border-solid w-20 h-20`}
                    >
                      {box}
                    </span>
                  )
                )}
              </div>
            ))
          : null}
      </div>
      <div className="flex" ref={numbersContainer}>
        {gameNumbers.map((number) => (
          <span
            key={number}
            onClick={(e) => handleNumberClick(e)}
            className="border-2 border-solid border-black w-24 h-16 text-2xl font-bold flex justify-center items-center mt-5"
          >
            {number}
          </span>
        ))}
        <span>{selected}</span>
      </div>
    </div>
  );
};

export default TheGame;

// [
//   [0, 0, 4, 0, 0, 0, 0, 0, 7],
//   [0, 0, 0, 9, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 4, 0, 9, 0, 1],
//   [1, 0, 0, 2, 0, 0, 0, 6, 3],
//   [0, 0, 6, 0, 0, 0, 1, 0, 2],
//   [0, 2, 0, 8, 0, 1, 0, 0, 4],
//   [9, 0, 8, 0, 0, 0, 0, 0, 6],
//   [7, 3, 1, 0, 0, 0, 0, 4, 0],
//   [0, 0, 2, 1, 0, 0, 0, 0, 5],
// ];
// import React, { useContext, useEffect, useState } from "react";
// import { useGameDifficultyContext } from "../gameContext";

// const TheGame = () => {
//   const { gameData } = useGameDifficultyContext();
//   const [gameArray, setGameArray] = useState([]);
//   const [number, setNumber] = useState("");
//   const [theBox, setTheBox] = useState([]);
//   const [preGameArray, setPreGameArray] = useState([]);
//   const [solution, setSolution] = useState([]);
//   const [mistake, setMistake] = useState(0);

//   function setTheGame() {
//     if (gameData ?? gameData.puzzle.length > 0) {
//       console.log(gameData.puzzle);

//       setSolution(gameData.solution);
//       setPreGameArray(gameData.puzzle);
//       let newGameArray = gameData.puzzle.map((array) =>
//         array.map((item) => (item === null ? "" : item))
//       );
//       setGameArray(newGameArray);
//     }
//   }
//   useEffect(() => {
//     setTheGame();
//     console.log("Hello");
//   }, [gameData]);
//   function checkMistakes(number) {
//     setMistake((prevMistake) => prevMistake + 1);
//     return [number];
//   }
//   function handleNumberClick(theNumber) {
//     if (theBox.length === 2) {
//       setGameArray((prevGame) =>
//         prevGame.map((box, boxId) =>
//           boxId === theBox[0]
//             ? box.map((item, itemId) =>
//                 itemId === theBox[1]
//                   ? solution[theBox[0]][theBox[1]] !== theNumber
//                     ? checkMistakes(theNumber)
//                     : `${theNumber}`
//                   : item
//               )
//             : box
//         )
//       );
//       setTheBox([]);
//     }
//   }
//   function handleBoxClick(box, arrayIndex, index) {
//     if (preGameArray[arrayIndex][index] === 0) {
//       setTheBox([arrayIndex, index]);
//     }
//   }
//   function handleRestGame() {
//     setMistake(0);
//     setTheGame();
//   }
//   console.log(gameArray);
//   if (mistake > 2) {
//     return (
//       <div className="bg-[#495E57] h-[100vh] flex-col text-[#F4CE14] font-bold text-[40px] flex items-center p-[20px] pt-[50px]">
//         <span>You Lost...</span>
//         <span
//           onClick={handleRestGame}
//           className="bg-[#F4CE14] text-[#495E57] mt-[40px] p-[10px] rounded-[5px]"
//         >
//           Try Again
//         </span>
//       </div>
//     );
//   }

//   return (
//     <div className="h-[500px] mt-[20px] flex flex-col h-[100vh] items-center ">
//       <div className="font-bold text-2xl mb-[10px]">
//         Mistakes :
//         <span className="bg-red-700 text-white p-1 rounded-[5px]">
//           {mistake}
//         </span>
//       </div>
//       <div className="border-[2px]  border-black border-solid relative">
//         <span className="absolute w-full bg-black h-[5px] bottom-[33%]"></span>
//         <span className="absolute w-full bg-black h-[5px] bottom-[66%]"></span>
//         <span className="absolute w-[5px] bg-black h-full left-[66%]"></span>
//         <span className="absolute w-[5px] bg-black h-full left-[33%]"></span>
//         {gameArray.map((item, arrayIndex) => (
//           <div className="flex" key={arrayIndex}>
//             {item.map((box, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleBoxClick(box, arrayIndex, index)}
//                 className={` border-[1px] w-16 h-16 border-black border-solid flex justify-center items-center font-bold text-[50px]
//               `}
//               >
//                 {/* {box} */}
//                 {typeof box === "string" ? (
//                   <span className="text-blue-600">{box}</span>
//                 ) : typeof box === "number" ? (
//                   <span>{+box}</span>
//                 ) : (
//                   <span className="text-red-600">{+box}</span>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="bg-[#45474B] text-[#F4CE14]   mt-11 flex justify-center items-center  text-[30px] font-bold">
//         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => {
//           return (
//             <button
//               key={item}
//               onClick={() => handleNumberClick(item)}
//               className="border-white border-[3px] border-solid px-10"
//             >
//               {item}
//             </button>
//           );
//         })}
//         {theBox}
//         {/* {gameData.difficulty} */}
//       </div>
//     </div>
//   );
// };

// export default TheGame;
