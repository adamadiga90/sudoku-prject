import { useContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TheGame from "./components/TheGame";
import Info from "./components/info";
import GameProvider from "./gameContext";
function App() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // setIsVisible(false);
    setTimeout(() => setIsVisible(true), 2000);
  }, [<TheGame />]);
  return (
    <GameProvider>
      <div className="bg-[#F5F7F8] h-[100vh]">
        <Navbar />
        <Info isVisible={isVisible} setIsVisible={setIsVisible} />
        {isVisible ? (
          <TheGame />
        ) : (
          <div className="text-2xl font-bold">Loading.... please wait</div>
        )}
      </div>
    </GameProvider>
  );
}

export default App;
