// components/AuthButton.tsx
import React from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

interface AuthButtonProps {
  color: string;
  filled: boolean;
  text: string;
  href?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ color, filled, text, href }) => {
  const buttonStyle = {
    backgroundColor: filled ? color : 'white',
    color: filled ? 'white' : color,
    border: `2px solid ${color}`,
    borderRadius: '50px',  
    padding: '10px 20px',
    fontWeight: 'bold',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',  
    cursor: 'pointer',
    textAlignt: 'center',
    transition: 'background-color 0.3s ease',
    height: '45px',
    width: '185px',
  };

  return (
    <Link href={href || '/'} passHref>
      <button style={buttonStyle}>
        {text}
      </button>
    </Link>
  );
};

export default AuthButton;
