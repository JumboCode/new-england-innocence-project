// components/SearchEntryBox.tsx

import React from 'react';
import { CgSearch } from "react-icons/cg";

interface SearchEntryBoxProps {
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

const SearchEntryBox: React.FC<SearchEntryBoxProps> = ({ placeholder = "Search", onChange, value }) => {
    return (
        <div style={containerStyle}>
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                style={inputStyle}
            />
            <CgSearch style={iconStyle} />
        </div>
    );
};

const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #D0D5DD',
    borderRadius: '8px',
    padding: '8px 12px',
    width: '300px',
    backgroundColor: '#FFFFFF',
};

const inputStyle: React.CSSProperties = {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    marginLeft: '25px',
};

const iconStyle: React.CSSProperties = {
    color: '#667085',
    fontSize: '20px',
    marginRight: '25px',
};

export default SearchEntryBox;
