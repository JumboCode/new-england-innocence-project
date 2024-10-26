// components/AuthButton.tsx
import React from "react";
import { useRouter } from "next/navigation";

interface AuthButtonProps {
  color: string;
  filled: boolean;
  text: string;
  href: string; // New prop for navigation
}

const AuthButton: React.FC<AuthButtonProps> = ({ color, filled, text, href }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href); // Navigate to the specified href
  };

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
    <button style={buttonStyle} onClick={handleClick}>
      {text}
    </button>
  );
};

export default AuthButton;
