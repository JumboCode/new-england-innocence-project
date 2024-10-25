// components/AuthEntryBox.tsx
import React from 'react';

const AuthEntryBox: React.FC = () => {
  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px', 
    border: '2px solid #ccc',  
    fontSize: '16px',
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',  
  };

  return (
    <input type="text" style={inputStyle} placeholder="Enter details here" />
  );
};

export default AuthEntryBox;
