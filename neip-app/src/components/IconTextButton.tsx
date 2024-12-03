// components/IconTextButton.tsx
import React from 'react';

interface IconTextButtonProps {
    icon?: React.ReactNode; // Accepts any valid React node (e.g., <img>, <svg>, etc.)
    filled: boolean;
    text: string;
    border: boolean;
    height?: string;
    width?: string;
    onClick?: () => void;
}

const IconTextButton: React.FC<IconTextButtonProps> = ({ icon, filled, text, border, height, width, onClick }) => {
  const IconButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Inter, sans-serif',
    color: filled ? 'white' : 'black',
    borderRadius: '8px', 
    gap: '8px',
    backgroundColor: filled ? '#2B9BD6' : 'white',
    border: border ? '1px solid #D0D5DD' : 'none',
    padding: '10px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '14px',
    height: height, // Use the height prop
    width: width, // Use the width prop
  };

  return (
    <button style={IconButtonStyle} onClick={onClick}>
      {icon && <span style={{ display: 'flex' }}>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default IconTextButton;
