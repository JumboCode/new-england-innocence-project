import React from 'react';


interface LabelAndEntryProps {
   label: Text;
   placeholder: Text;
   width: string;
   height: string;
}

const LabelAndEntry: React.FC<LabelAndEntryProps> = ({label, placeholder, width, height}) => {
    const LabelAndEntryStyle: React.CSSProperties = {
        border: '2px',
        borderRadius: '20px',
        color: 'white',
        borderColor: '#CCDDF8',
    }
    return (
        <input style={LabelAndEntryStyle}>
        </input>
    )
};

export default LabelAndEntry;