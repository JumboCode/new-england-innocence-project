//Dropdown & Tags Component

import React, { useState } from 'react';
import Select, { StylesConfig } from 'react-select';

interface DropdownAndTagsProps {
  label: string;
  placeholder: string;
  options: string[];
}

const DropdownAndTags: React.FC<DropdownAndTagsProps> = ({ label, placeholder, options }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableOptions, setAvailableOptions] = useState(
    options.map((option) => ({ value: option, label: option }))
  );

  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      const selectedValue = selectedOption.value;
      if (!selectedTags.includes(selectedValue)) {
        setSelectedTags([...selectedTags, selectedValue]);
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const customStyles: StylesConfig<any> = {
    control: (provided) => ({
      ...provided,
      color: '#004085',
      minHeight: '40px',
      minWidth: '300px',
    }),
    singleValue: () => ({
      display: 'none',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#CCDDF8',
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
  };

  return (
    <div>
      <style>
        {`
          .dropdown-and-tags {
              margin-bottom: 16px;
          }

          .dropdown-and-tags label {
              font-weight: 500;
              font-size: 16px;
              margin-bottom: 8px;
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
                Χ
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
        />
      </div>
    </div>
  );
};

export default DropdownAndTags;
