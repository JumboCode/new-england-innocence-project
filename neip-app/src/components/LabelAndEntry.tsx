import React from 'react';


interface LabelAndDropdownProps {
   label: string;
   placeholder?: string;
   width?: string;
   height?: string;
   borderRadius?: string;
}

const LabelAndDropdown: React.FC<LabelAndDropdownProps> = ({label, placeholder = "", width, height, borderRadius}) => {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
       // width: width,
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
        // padding: '10px 2px',
    };
    // const placeHolderstyle: React.CSSProperties = {
    //     color: '#CCDDF8',
    //     fontSize: '15px',
    //     fontFamily: 'Inter, sans-serif',
    // };

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

export default LabelAndDropdown;