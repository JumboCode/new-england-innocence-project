import React from 'react';

interface LabelAndEntryProps {
  label: string;
  placeholder?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
}

const LabelAndEntry: React.FC<LabelAndEntryProps> = ({
  label,
  placeholder = "",
  width,
  height,
  borderRadius = "10px",
  value,
  onChange,
  name,
  type = "text"
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const inputStyle: React.CSSProperties = {
    color: 'black',
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
    border: '1px solid #CCDDF8',
    borderRadius: borderRadius,
    padding: '10px 10px',
    width: width,
    height: height,
    marginTop: '5px',
    marginBottom: '15px',
  };

  const labelStyle: React.CSSProperties = {
    color: '#667085',
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        style={inputStyle}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default LabelAndEntry;