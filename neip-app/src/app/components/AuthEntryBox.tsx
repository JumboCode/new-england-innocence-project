// components/AuthEntryBox.tsx
import React from 'react';

interface AuthEntryBoxProps {
  placeholder: string;
  type?: string;
}

const AuthEntryBox: React.FC<AuthEntryBoxProps> = ({ placeholder, type = 'text' }) => {
  const inputStyle = {
    width: '100%',
    padding: '8px 0',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    border: 'none',
    borderBottom: '2px solid #3b82f6',  // Blue underline
    outline: 'none',
    color: '#333',
    textAlign: 'center' as 'center',
  };

  return <input type={type} placeholder={placeholder} style={inputStyle} />;
};

export default AuthEntryBox;
