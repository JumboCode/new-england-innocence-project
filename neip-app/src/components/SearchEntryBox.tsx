// components/SearchEntryBox.tsx

import React, { useState } from "react"; 
import { CgSearch } from "react-icons/cg";

interface SearchEntryBoxProps {
    setExonerees: (data: any[]) => void; // function to update displayed exonerees
}

const SearchEntryBox: React.FC<SearchEntryBoxProps> = ({ setExonerees }) => {
    const [query, setQuery] = useState(""); // stores user input

    // ✅ Function to fetch search results
    const handleSearch = async () => {
        if (!query.trim()) {
            console.log("❌ Empty search query");
            return;
        }

        console.log("🔍 Searching for:", query); // debugging

        try {
            const response = await fetch(`/api/exonerees/search?keyword=${encodeURIComponent(query)}`);
            console.log("📡 Response status:", response.status); // log status

            if (!response.ok) throw new Error(`Search failed: ${response.status}`);

            const data = await response.json();
            console.log("📋 Search results:", data); // log response data

            // so that it filters and show all of the column info
            setExonerees(
                data.map((exoneree: any) => ({
                    key: exoneree.id, // ensures unique keys
                    name: exoneree.personalInfo?.name || "N/A",
                    dob: exoneree.personalInfo?.dateOfBirth || "N/A",
                    race: exoneree.personalInfo?.race || "N/A",
                    ethnicity: exoneree.personalInfo?.ethnicity || "N/A",
                    phoneNumber: exoneree.personalInfo?.phoneNumber || "N/A",
                    address: exoneree.personalInfo?.address || "N/A",
                    email: exoneree.personalInfo?.email || "N/A",
                    caseNumber: exoneree.caseInfo?.caseNumber || "N/A",
                    crimeType: exoneree.caseInfo?.crimeType || "N/A",
                    gender: exoneree.personalInfo?.gender || "N/A",
                    jurisdiction: exoneree.caseInfo?.jurisdiction || "N/A",
                    yearsInPrison: exoneree.caseInfo?.yearsInPrison || "N/A",
                    arrestDate: exoneree.caseInfo?.arrestDate || "N/A",
                    convictionDate: exoneree.caseInfo?.convictionDate || "N/A",
                    freedomDate: exoneree.caseInfo?.freedomDate || "N/A",
                    exonerationDate: exoneree.caseInfo?.exonerationDate || "N/A",
                    sentence: exoneree.caseInfo?.sentence || "N/A",
                    originalCharges: exoneree.legalInfo?.originalCharges || "N/A",
                    convictionMethod: exoneree.legalInfo?.convictionMethod?.join(", ") || "N/A",
                    exonerationMethod: exoneree.legalInfo?.exonerationMethod?.join(", ") || "N/A",
                    legalRepresentation: exoneree.legalInfo?.legalRepresentation || "N/A",
                    prosecutor: exoneree.legalInfo?.prosecutor || "N/A",
                    detectivesInvolved: exoneree.legalInfo?.detectivesInvolved?.join(", ") || "N/A",
                    falseConfession: exoneree.wrongfulConvictionInfo?.falseConfession ? "Yes" : "No",
                    eyewitnessMisidentification: exoneree.wrongfulConvictionInfo?.eyewitnessMisidentification ? "Yes" : "No",
                    inadequateLegalDefense: exoneree.wrongfulConvictionInfo?.inadequateLegalDefense ? "Yes" : "No",
                    policeProsecutorialMisconduct: exoneree.wrongfulConvictionInfo?.policeProsecutorialMisconduct ? "Yes" : "No",
                    forensicEvidence: exoneree.wrongfulConvictionInfo?.forensicEvidence ? "Yes" : "No",
                    informantTestimony: exoneree.wrongfulConvictionInfo?.informantTestimony ? "Yes" : "No",
                    compensation: `$${exoneree.postExonerationInfo?.compensationAmount || 0}`,
                    reentrySupport: exoneree.postExonerationInfo?.reentrySupport?.join(", ") || "N/A",
                    publicApology: exoneree.postExonerationInfo?.publicApology ? "Yes" : "No",
                    currentStatus: exoneree.postExonerationInfo?.occupation || "N/A",
                    mediaCoverage: exoneree.metaData?.mediaCoverage ? "Yes" : "No",
                    advocacyInvolvement: exoneree.metaData?.advocacyInvolvement ? "Yes" : "No",
                    educationalBackground: exoneree.personalInfo?.educationalBackground || "N/A",
                    healthInfo: exoneree.personalInfo?.healthInfo || "N/A",
                    dataSource: exoneree.metaData?.dataSource || "N/A",
                    lastUpdated: exoneree.metaData?.lastUpdated || "N/A",
                    createdAt: exoneree.metaData?.createdAt || "N/A",
                }))
            );
                       

            console.log("📊 Updated state (exonerees):", data.map((exoneree: any) => ({
                key: exoneree.id,
                name: exoneree.personalInfo?.name || "N/A",
                dob: exoneree.personalInfo?.dateOfBirth || "N/A",
                caseNumber: exoneree.caseInfo?.caseNumber || "N/A",
                crimeType: exoneree.caseInfo?.crimeType || "N/A",
                gender: exoneree.personalInfo?.gender || "N/A",
                jurisdiction: exoneree.caseInfo?.jurisdiction || "N/A",
            })));            
        } catch (error) {
            console.error("❌ Error fetching search results:", error);
        }
    };

    // run search on Enter key press
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
                onKeyDown={handleKeyDown} // trigger search on Enter
                style={inputStyle}
            />
            <CgSearch style={iconStyle} onClick={handleSearch} /> {/* click to search */}
        </div>
    );
};

// styles
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
    cursor: "pointer", // makes search icon clickable
};

export default SearchEntryBox;
