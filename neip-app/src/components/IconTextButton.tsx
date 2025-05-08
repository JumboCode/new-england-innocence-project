import React from 'react';

interface IconTextButtonProps {
  icon?: React.ReactNode;
  filled: boolean;
  text: string;
  border: boolean;
  height?: string;
  width?: string;
  onClick?: () => void;
  color?: string;
  disabled?: boolean;
}

const IconTextButton: React.FC<IconTextButtonProps> = ({
  icon,
  filled,
  text,
  border,
  height,
  width,
  onClick,
  disabled = false,
}) => {
  const IconButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, sans-serif',
    color: disabled ? '#9CA3AF' : filled ? 'white' : 'black', 
    borderRadius: '8px',
    gap: '8px',
    backgroundColor: disabled
      ? '#F3F4F6' 
      : filled
      ? '#2B9BD6'
      : 'white',
    border: border ? '1px solid #D0D5DD' : 'none',
    padding: '10px 16px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'background-color 0.3s ease',
    fontSize: '14px',
    height: height,
    width: width,
  };

  return (
    <button
      style={IconButtonStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {icon && <span style={{ display: 'flex' }}>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default IconTextButton;
