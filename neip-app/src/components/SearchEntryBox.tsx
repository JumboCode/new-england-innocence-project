// components/SearchEntryBox.tsx

import React, { useState } from "react"; // Added useState to manage search input
import { CgSearch } from "react-icons/cg";

interface SearchEntryBoxProps {
    // placeholder?: string;
    // onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // value?: string;
    setExonerees: (data: any[]) => void; // Added prop to update displayed exonerees
}

const SearchEntryBox: React.FC<SearchEntryBoxProps> = ({ setExonerees }) => {
    //chat
    const SearchEntryBox: React.FC<SearchEntryBoxProps> = ({ setExonerees }) => {
        const [query, setQuery] = useState(""); // Stores the user's search input
      
        const handleSearch = async () => {
          if (!query.trim()) return; // Prevent empty searches
      
          try {
            const response = await fetch(`/api/exonerees/search?keyword=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error("Search failed");
      
            const data = await response.json();
            setExonerees(data); // Updates the displayed exonerees list
          } catch (error) {
            console.error("Error fetching search results:", error);
          }
        };
    
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
