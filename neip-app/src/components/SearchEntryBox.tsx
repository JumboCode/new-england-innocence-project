// // components/SearchEntryBox.tsx

// import React, { useState } from "react"; // Added useState to manage search input
// import { CgSearch } from "react-icons/cg";

// interface SearchEntryBoxProps {
//     // placeholder?: string;
//     // onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     // value?: string;
//     setExonerees: (data: any[]) => void; // Added prop to update displayed exonerees
// }

// const SearchEntryBox: React.FC<SearchEntryBoxProps> = ({ setExonerees }) => {
//     //chat
//     const SearchEntryBox: React.FC<SearchEntryBoxProps> = ({ setExonerees }) => {
//         const [query, setQuery] = useState(""); // Stores the user's search input
      
//         const handleSearch = async () => {
//           if (!query.trim()) return; // Prevent empty searches
      
//           try {
//             const response = await fetch(`/api/exonerees/search?keyword=${encodeURIComponent(query)}`);
//             if (!response.ok) throw new Error("Search failed");
      
//             const data = await response.json();
//             setExonerees(data); // Updates the displayed exonerees list
//           } catch (error) {
//             console.error("Error fetching search results:", error);
//           }
//         };
    
//     return (
//         <div style={containerStyle}>
//             <input
//                 type="text"
//                 placeholder={placeholder}
//                 onChange={onChange}
//                 value={value}
//                 style={inputStyle}
//             />
//             <CgSearch style={iconStyle} />
//         </div>
//     );
// };

// const containerStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     border: '1px solid #D0D5DD',
//     borderRadius: '8px',
//     padding: '8px 12px',
//     width: '300px',
//     backgroundColor: '#FFFFFF',
// };

// const inputStyle: React.CSSProperties = {
//     border: 'none',
//     outline: 'none',
//     width: '100%',
//     fontSize: '14px',
//     fontFamily: 'Arial, sans-serif',
//     marginLeft: '25px',
// };

// const iconStyle: React.CSSProperties = {
//     color: '#667085',
//     fontSize: '20px',
//     marginRight: '25px',
// };

// export default SearchEntryBox;

import React, { useState } from "react"; 
import { CgSearch } from "react-icons/cg";

interface SearchEntryBoxProps {
    setExonerees: (data: any[]) => void; // ✅ Function to update displayed exonerees
}

const SearchEntryBox: React.FC<SearchEntryBoxProps> = ({ setExonerees }) => {
    const [query, setQuery] = useState(""); // ✅ Stores user input

    // ✅ Function to fetch search results
    const handleSearch = async () => {
        if (!query.trim()) {
            console.log("❌ Empty search query");
            return;
        }

        console.log("🔍 Searching for:", query); // ✅ Debugging

        try {
            const response = await fetch(`/api/exonerees/search?keyword=${encodeURIComponent(query)}`);
            console.log("📡 Response status:", response.status); // ✅ Log status

            if (!response.ok) throw new Error(`Search failed: ${response.status}`);

            const data = await response.json();
            console.log("📋 Search results:", data); // ✅ Log response data

            setExonerees(data); // ✅ Update frontend table
        } catch (error) {
            console.error("❌ Error fetching search results:", error);
        }
    };

    // ✅ Run search on Enter key press
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div style={containerStyle}>
            <input
                type="text"
                placeholder="Search exonerees..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown} // ✅ Trigger search on Enter
                style={inputStyle}
            />
            <CgSearch style={iconStyle} onClick={handleSearch} /> {/* ✅ Click to search */}
        </div>
    );
};

// ✅ Styles
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
    marginLeft: '10px',
};

const iconStyle: React.CSSProperties = {
    color: '#667085',
    fontSize: '20px',
    cursor: "pointer", // ✅ Makes search icon clickable
};

export default SearchEntryBox;
