import React, { useState } from "react";

interface FilterSelectionProps {
  onRemove: (id: number) => void;
  title: { id: number; label: string };
  condition: string;
  setCondition: (value: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
}

const FilterSelection: React.FC<FilterSelectionProps> = ({
  onRemove,
  title,
  condition,
  setCondition,
  tags,
  setTags,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col p-2 bg-gray-100 border border-gray-300 rounded-lg w-full">
      {/* Header with Field Title and Close Button */}
      <div className="flex items-center justify-between">
        <span className="text-gray-700 font-medium min-w-[80px]">
          {title?.label || "Untitled"}
        </span>
        {/* This close button will remove the entire filter component */}
        <button
          onClick={() => onRemove(title.id)}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>

      {/* Rest of Filter Selection UI */}
      <div className="flex items-center space-x-2 mt-2">
        {/* Condition Dropdown */}
        <select
          className="border border-gray-400 rounded-md px-2 py-1 text-gray-900 text-sm"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          {["is", "is not", "<", "<=", ">", ">="].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* Tags Display */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center bg-blue-200 text-blue-700 px-2 py-1 rounded-lg text-sm"
            >
              {tag}
              <button
                className="ml-2 text-blue-600 hover:text-blue-800"
                onClick={() => removeTag(tag)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <input
          type="text"
          className="border border-gray-500 rounded-md px-2 py-1 text-gray-900 text-sm"
          placeholder="Type & press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default FilterSelection;
