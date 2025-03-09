import React, { useState } from "react";

interface FilterSelectionProps {
  onRemove: (id: number) => void;
  // title now includes the internal field key (e.g., "gender")
  title: { id: number; label: string; field: string };
  condition: string;
  setCondition: (value: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
}

const dropdownOptionsMap: { [key: string]: string[] } = {
  gender: ["Male", "Female"],
  race: [
    "White",
    "Black",
    "Asian",
    "Hispanic or Latino",
    "American Indian or Alaska Native",
    "Native Hawaiian or Pacific Islander"
  ],
  ethnicity: [
    "American Indian/Alaska Native",
    "Asian",
    "Black",
    "Hispanic or Latino",
    "Middle Eastern or North African",
    "White/European"
  ],
  crimeType: ["Felony", "Misdemeanor"],
  falseConfession: ["Yes", "No"],
  eyewitnessMisidentification: ["Yes", "No"],
  inadequateLegalDefense: ["Yes", "No"],
  policeMisconduct: ["Yes", "No"],
  prosecutorialMisconduct: ["Yes", "No"],
  forensicEvidence: ["Yes", "No"],
  reentrySupport: ["Yes", "No"],
  publicApology: ["Yes", "No"],
  currentStatus: [
    "Freed but still fighting",
    "Plea deal",
    "Exonerated",
    "Return to custody"
  ]
};

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
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const isDropdownField = dropdownOptionsMap.hasOwnProperty(title.field);

  return (
    <div className="flex flex-col p-2 bg-gray-100 border border-gray-300 rounded-lg w-full">
      <div className="flex items-center justify-between">
        <span className="text-gray-700 font-medium min-w-[80px]">
          {title?.label || "Untitled"}
        </span>
        <button
          onClick={() => onRemove(title.id)}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>

      <div className="flex items-center space-x-2 mt-2">
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

        {isDropdownField ? (
          <select
            className="border border-gray-500 rounded-md px-2 py-1 text-gray-900 text-sm"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setTags([e.target.value]); // update only this filter's tags
            }}
          >
            <option value="" disabled>
              Select...
            </option>
            {dropdownOptionsMap[title.field].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            className="border border-gray-500 rounded-md px-2 py-1 text-gray-900 text-sm"
            placeholder="Type & press Enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        )}

        <button
          className="ml-auto text-gray-500 hover:text-red-500"
          onClick={() => setTags([])}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default FilterSelection;
