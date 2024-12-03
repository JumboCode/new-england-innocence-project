// components/AuthEntryBox.tsx
import React from 'react';

// 
interface AuthEntryBoxProps {
  placeholder: string;
  type?: string;
}

const SignupAuthEntryBox: React.FC<AuthEntryBoxProps> = ({placeholder, type = "text"}) => {
  const inputStyle = {
    width: '100%',
    padding: '5px',
    borderLeft: '0px',
    borderRight: '0px',
    borderTop: '0px',
    borderBottom: '2px solid #43b4ef',
    fontSize: '14px',
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif', 
    textAlign: 'center' as 'center',
    color: 'black',
    outline: 'none',
  };

  return (
    <input type={type} style={inputStyle} placeholder={placeholder} />
  );
};

export default SignupAuthEntryBox;
