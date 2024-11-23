// components/IconTextButton.tsx
import React from 'react';
import { CgTrash } from "react-icons/cg"; //<CgTrash />
import { CgExport } from "react-icons/cg"; //<CgExport />
import { CgAdd } from "react-icons/cg"; // <CgAdd />
import { CgSearch } from "react-icons/cg"; // <CgSearch />

interface TableFilterIconsProps {
    icon?: React.ReactNode; // Accepts any valid React node (e.g., <img>, <svg>, etc.)
    filled: boolean;
    text: string;
    border: boolean;
    borderRadius: boolean;
    height?: string;
    width?: string;
}

const TableFilterIcons: React.FC<TableFilterIconsProps> = ({ icon, filled, text, border, height, width }) => {
  const IconButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Inter, sans-serif',
    color: filled ? 'black' : 'black',
    borderRadius: border ? '12px' : '25px', 
    gap: '8px',
    backgroundColor: filled ? '#bfdbff' : 'white',
    border: border ? '1px solid #D0D5DD' : 'none',
    padding: '10px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '14px',
    height: height, // Use the height prop
    width: width, // Use the width prop
  };

  return (
    <button style={IconButtonStyle}>
      {filled ? (
        <>
          <span>{text}</span>
          <span style={{ display: 'flex' }}>{icon}</span>
        </>
      ) : (
        <>
          <span style={{ display: 'flex' }}>{icon}</span>
          <span>{text}</span>
        </>
      )}
    </button>
  );
};

export default TableFilterIcons;
