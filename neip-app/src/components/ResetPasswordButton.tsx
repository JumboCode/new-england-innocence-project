// components/ResetPasswordButton.tsx
import React from 'react';

const ResetPasswordButton: React.FC = () => {
  const buttonStyle = {
    backgroundColor: 'transparent',
    color: '#ccc',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
    border: 'none',
    fontFamily: 'Arial, sans-serif',  
    marginBottom: '20px',
  };

  return (
    <button style={buttonStyle}>
      Reset password
    </button>
  );
};

export default ResetPasswordButton;
