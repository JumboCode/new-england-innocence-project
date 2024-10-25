// components/AuthButton.tsx
import React from 'react';

interface AuthButtonProps {
  color: string;
  filled: boolean;
  text: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ color, filled, text }) => {
  const buttonStyle = {
    backgroundColor: filled ? color : 'white',
    color: filled ? 'white' : color,
    border: `2px solid ${color}`,
    borderRadius: '12px',  
    padding: '10px 20px',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',  
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <button style={buttonStyle}>
      {text}
    </button>
  );
};

export default AuthButton;
