import React from 'react';

interface TableFilterIconsProps {
    icon?: React.ReactNode; 
    filled: boolean;
    text?: string;  
    filterName?: string;  
    filterOperator?: string;
    filterValue?: string;
    border: boolean;
    borderRadius: boolean;
    height?: string;
    width?: string;
    onOpenFilter: () => void;
}

const TableFilterIcons: React.FC<TableFilterIconsProps> = ({
  icon,
  filled,
  text,
  filterName,
  filterOperator,
  filterValue,
  border,
  height,
  width,
  onOpenFilter
}) => {

  // Construct display text with bold filterName
  const displayText = text || (filterName ? (
    <>
      <span style={{ fontWeight: 'bold' }}>{filterName}:</span> {filterOperator} {filterValue}
    </>
  ) : "");

  // have text or filter names:
  //const displayText = text || (filterName ? `${filterName} ${filterOperator} ${filterValue}` : "");

  const IconButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Inter, sans-serif',
    color: 'black',
    borderRadius: border ? '12px' : '25px',
    gap: '8px',
    backgroundColor: filled ? '#BFDBFF' : 'white',
    border: border ? '1px solid #D0D5DD' : 'none',
    padding: '25px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '14px',
    height: height,
    width: width,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  return (
    <button style={IconButtonStyle} onClick={onOpenFilter}>
      {filled ? (
        <>
          <span>{displayText}</span>
          <span style={{ display: 'flex' }}>{icon}</span>
        </>
      ) : (
        <>
          <span style={{ display: 'flex' }}>{icon}</span>
          <span>{displayText}</span>
        </>
      )}
    </button>
  );
};

export default TableFilterIcons;
