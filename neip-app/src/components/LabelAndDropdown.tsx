interface LabelAndDropdownProps {
  label: string;
  placeholder?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  dropdownOptions: string[];
  name: string;
}

const LabelAndDropdown: React.FC<LabelAndDropdownProps> = ({
  label,
  placeholder = "",
  width,
  height,
  borderRadius,
  value = "",  // Add default value
  onChange,
  dropdownOptions,
  name  // Make sure we're using the name prop
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
      <select
        style={inputStyle}
        value={value}
        onChange={onChange}
        name={name}  // Add name prop here
      >
        <option value="">{placeholder}</option>
        {dropdownOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LabelAndDropdown;