import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  label: string;
  name: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, onChange, label, name }) => {
  return (
    <div style={{ marginBottom: "10px", position: "relative", zIndex: 9999 }}>
      <label htmlFor={name} style={{ display: "block", marginBottom: "5px" }}>{label}:</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy/MM/dd"
        placeholderText={`Select ${label.toLowerCase()}`}
        portalId="root"  // ✅ Ensures popper stays within modal
      />
    </div>
  );
};

export default CustomDatePicker;


