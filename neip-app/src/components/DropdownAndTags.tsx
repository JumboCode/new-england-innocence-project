import React, { useState, useEffect } from 'react';
import Select, { StylesConfig } from 'react-select';

interface DropdownAndTagsProps {
  label: string;
  placeholder: string;
  options: string[];
  width: string;
  height: string;
  value?: string[];
  onChange?: (name: string, value: string[]) => void;
  name: string;
}

const DropdownAndTags: React.FC<DropdownAndTagsProps> = ({ 
  label, 
  placeholder, 
  options, 
  width, 
  height,
  value = [],
  onChange,
  name
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(value);
  const [availableOptions, setAvailableOptions] = useState(
    options.map((option) => ({ value: option, label: option }))
  );
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setSelectedTags(value);
  }, [value]);

  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      const selectedValue = selectedOption.value;
      if (!selectedTags.includes(selectedValue)) {
        const newTags = [...selectedTags, selectedValue];
        setSelectedTags(newTags);
        onChange?.(name, newTags);
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(newTags);
    onChange?.(name, newTags);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue) {
      if (!selectedTags.includes(inputValue)) {
        const newOption = { value: inputValue, label: inputValue };
        const newTags = [...selectedTags, inputValue];
        setSelectedTags(newTags);
        setAvailableOptions([...availableOptions, newOption]);
        onChange?.(name, newTags);
      }
      setInputValue(""); 
      event.preventDefault();
    }
  };

  const customStyles: StylesConfig<any> = {
    control: (provided) => ({
      ...provided,
      color: '#004085',
      minHeight: height,
      minWidth: width,
      borderRadius: '10px',
      borderColor: '#CCDDF8',
      fontSize: '13px',
    }),
    singleValue: () => ({
      display: 'none',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#999999',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#ffffff' : '#004085',
      backgroundColor: state.isSelected ? '#004085' : '#ffffff',
      ':hover': {
        backgroundColor: '#d4e7ff',
        color: '#004085',
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 999,
    }),
    clearIndicator: (provided) => ({
      ...provided,
      display: 'none', 
    }),
  };

  return (
    <div style={{ width }}>
      <style>
        {`
          .dropdown-and-tags {
              margin-bottom: 16px;
          }

          .dropdown-and-tags label {
              font-weight: 500;
              font-size: 13px;
              display: block;
              color: #667085;
          }

          .tags-container {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              margin-bottom: 8px;
              font-size: 13px;
          }

          .tag {
              background-color: #CCDDF8;
              color: #535862;
              padding: 4px 8px;
              border-radius: 4px;
              display: flex;
              align-items: center;
              border-radius: 15px;
          }

          .remove-tag {
              background: none;
              border: none;
              color: #004085;
              margin-left: 4px;
              cursor: pointer;
          }

          .remove-tag:hover {
              color: #ff0000;
          }
        `}
      </style>
      <div className="dropdown-and-tags">
        <label>{label}</label>
        <div className="tags-container">
          {selectedTags.map((tag) => (
            <div className="tag" key={tag}>
              {tag}
              <button
                type="button"
                className="remove-tag"
                onClick={() => removeTag(tag)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <Select
          options={availableOptions}
          placeholder={placeholder}
          isClearable
          isSearchable
          onChange={handleSelectChange}
          styles={customStyles}
          inputValue={inputValue}
          onInputChange={(value, action) => {
            if (action.action === "input-change") {
              setInputValue(value);
            }
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default DropdownAndTags;