// components/AuthEntryBox.tsx
import React from 'react'

interface AuthEntryBoxProps {
  placeholder: string
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AuthEntryBox: React.FC<AuthEntryBoxProps> = ({
  placeholder,
  type = 'text',
  onChange
}) => {
  const inputStyle = {
    width: '100%',
    padding: '8px 0',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    border: 'none',
    borderBottom: '2.5px solid #44B4EF', // Blue underline
    outline: 'none',
    color: '#333',
    textAlign: 'center' as 'center'
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      style={inputStyle}
      onChange={onChange}
    />
  )
}

export default AuthEntryBox
