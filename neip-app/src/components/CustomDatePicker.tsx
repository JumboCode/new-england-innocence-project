import * as React from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface CustomDatePickerProps {
  label: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  name: string;
  style?: React.CSSProperties;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, selectedDate, onChange, name, style }) => {
  return (
    <div style={style}>  {/* ✅ Apply style to this div instead of DatePicker */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          value={selectedDate}
          onChange={(newDate) => {
            console.log(`Picked Date (${name}):`, newDate); // ✅ Debugging log
            onChange(newDate);
          }}
          slots={{ textField: TextField }}
        />
      </LocalizationProvider>
    </div>
  );
};


//const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, selectedDate, onChange, name, style }) => {
//  return (
//    <LocalizationProvider dateAdapter={AdapterDateFns}>
//      <DatePicker
//        label={label}
//        value={selectedDate}
//        onChange={(newDate) => {
//          console.log(`Picked Date (${name}):`, newDate); // Debugging log
//          onChange(newDate); // Calls handleDateChange
//        }}
//        slots={{ textField: TextField }}
//        style={style}
//      />
//    </LocalizationProvider>
//  );
//};

export default CustomDatePicker;