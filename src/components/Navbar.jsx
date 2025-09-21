import React, { useState } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="bg-[#45474B] p-5 text-[#F4CE14] font-bold text-[30px] flex gap-40">
      Sudoku
      <button
        onClick={() => setIsVisible(true)}
        className="bg-[#F4CE14] text-[#45474B] p-2"
      >
        {isVisible ? (
          <span>Welcome Zaynab</span>
        ) : (
          <span>is your name Zaynab</span>
        )}
      </button>
    </div>
  );
};

export default Navbar;
