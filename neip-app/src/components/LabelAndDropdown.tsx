import React from 'react';
import Image from "next/image";
import DropDown from "../img/dropdown_icon.png";
import Select from 'react-select';

interface LabelAndEntryProps {
   label: string;
   dropdownOptions: string[];
   placeholder: string;
   width?: string; 
}

const LabelAndEntry: React.FC<LabelAndEntryProps> = ({label, dropdownOptions, placeholder, width}) => {
    const options = dropdownOptions.map((option: string) => ({
        value: option,
        label: option,
    }));

    // const containerStyle: React.CSSProperties = {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'flex-start',
    //     padding: '2px',
    // };

    const selectStyle = {
      control: (base: any) => ({
        ...base,
        display: 'flex',
        color: 'black',
        fontSize: '13px',
        fontFamily: 'Inter, sans-serif',
        border: '1px solid #CCDDF8',
        borderRadius: '10px',
        paddingRight: '10px',
        marginTop: '5px',
        marginBottom: '15px',
        height: "36px",
        appearance: "none",
      }),
      indicatorSeparator: () => ({
        display: 'none', // Hides the separator between the arrow and the value
      }),
    };
    

    // const labelStyle: React.CSSProperties = {
    //     color: '#667085',
    //     fontSize: '13px',
    //     fontFamily: 'Inter, sans-serif',
    //     padding: '10px 2px',
    // };
    // const placeHolderStyle: React.CSSProperties = {
    //     color: '#CCDDF8',
    //     fontSize: '13px',
    //     fontFamily: 'Inter, sans-serif',
    // };
 
    const DropdownIndicator = () => (
    <Image src={DropDown} alt="dropdown icon" height={12} width={12} />
  );

  return (
    <div style={{width}}>
    {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '2px' }}> */}
      <label style={{ color: '#667085', fontSize: '13px', fontFamily: 'Inter, sans-serif', padding: '10px 2px' }}>
        {label}
      </label>
      
      {/* React Select component */}
      <Select
        options={options}
        placeholder={placeholder}
        styles={selectStyle}
        components={{ DropdownIndicator }}
      />
    </div>
    // </div>
  );
};
export default LabelAndEntry;

