import React, { useState } from "react";

const AndOr: React.FC = () => {
  const [selected, setSelected] = useState<"AND" | "OR">("AND");

  return (
    <div className="flex flex-col items-center space-y-1">
      {["AND", "OR"].map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option as "AND" | "OR")}
          className={`w-16 px-4 py-1 font-semibold border rounded-lg transition-all ${
            selected === option
              ? "bg-blue-500 text-white shadow-md"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default AndOr;
