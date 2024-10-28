// components/IconTextButton.tsx
import React from 'react';

interface IconTextButtonProps {
    icon: React.ReactNode; //Accepts any valid React node (e.g., <img>, <svg>, etc.)
    filled: boolean;
    text: string;
    border: boolean;
}

const IconTextButton: React.FC<IconTextButtonProps> = ({ icon, filled, text, border }) => {
  const IconButtonStyle = {
    fontWeight: 'bold',
    fontFamily: 'Inter, sans-serif',
    color: filled ? 'white' : color: 'white',
    borderRadius: '8px', 
    gap: '8px',
    backgroundColor: filled ? color : '#2B9BD6;',
    border: `1px solid ${filled ? color : '#D0D5DD'}`,
    padding: '10px 16px 10px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    //Github Instructions
        // ✅ Font
        // ✅ Border Radius
        // ✅ Border Weight
        // Any others that you see fit.
        // ✅ If filled = true, the background color should be blue (see Figma for the hex code) and the text color should be white. If filled = false, the background color should be white and the text color should be black.
        // ✅ If border = true, the border should be grey (see Figma for the hex code).
        // You can get the specific font/border radius/border weight from the Figma. Look into favicon to get the icons!
  };

  return (
    <button style={IconButtonStyle}>
      {text}
    </button>
  );
};

export default IconTextButton;
