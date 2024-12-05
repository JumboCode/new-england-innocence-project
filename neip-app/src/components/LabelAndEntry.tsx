import React from 'react';


interface LabelAndEntryProps {
   label: string;
   placeholder: string;
   width?: string;
   height?: string;
   //borderRadius: string;
   //color: boolean;
}

const LabelAndEntry: React.FC<LabelAndEntryProps> = ({label, placeholder, width, height}) => {
    // const LabelAndEntryStyle: React.CSSProperties = {
        // label: label,
        // placeholder: placeholder,
        // labelColor: labelColor,
        // placeholderColor: placeholderColor,
    //     border: '2px',
    //     borderRadius: '20px',
    //     alignItems: 'left',
    //     fontFamily: 'Inter, sans-serif',
    //     fontSize: '14px',
    //     //color: color ? 'white' : 'grey',
    //     borderColor: '#CCDDF8',
    //     height: height, // Use the height prop
    //     width: width, // Use the width prop
    // }
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        width: width,
        alignItems: 'flex-start'
    };

    const inputStyle: React.CSSProperties = {
        color: 'black',
        fontSize: '13px',
        fontFamily: 'Inter, sans-serif',
        border: '1px solid #D0D5DD',
        borderRadius: '20px',
        padding: '10px 16px',
    };

    const labelStyle: React.CSSProperties = {
        color: '#667085',
        fontSize: '13px',
        fontFamily: 'Inter, sans-serif',
    };
    const placeHolderstyle: React.CSSProperties = {
        color: '#CCDDF8',
        fontSize: '15px',
        fontFamily: 'Inter, sans-serif',
    };

    return (
        <div style={containerStyle}>
            <label style={labelStyle}>{label}</label>
            <input type= 'text'
            placeholder={placeholder}
            style={inputStyle}>
            </input>
            

        </div>

    )
};

export default LabelAndEntry;