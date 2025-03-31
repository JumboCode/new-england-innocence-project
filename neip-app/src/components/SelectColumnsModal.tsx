import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IconButton, Checkbox, FormControlLabel, Typography, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "#f4f6f8",
  borderRadius: 2,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  p: 3,
  zIndex: 1300,
};

interface SelectColumnsModalProps {
  open: boolean;
  handleClose: () => void;
  columns: { title: string; key: string }[];
  selectedColumns: string[];
  onColumnSelectionChange: (selectedKeys: string[]) => void;
}

const SelectColumnsModal: React.FC<SelectColumnsModalProps> = ({
  open,
  handleClose,
  columns,
  selectedColumns,
  onColumnSelectionChange,
}) => {
  const filteredColumns = columns.filter((col) => col.key !== "name");
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onColumnSelectionChange([...filteredColumns.map((col) => col.key)]);
    } else {
      onColumnSelectionChange([]);
    }
  };

  const handleColumnToggle = (columnKey: string) => {
    const updatedSelection = selectedColumns.includes(columnKey)
      ? selectedColumns.filter((key) => key !== columnKey && key != "name")
      : [...selectedColumns, columnKey];
    onColumnSelectionChange(updatedSelection);
  };

  const allSelected = columns.length === selectedColumns.length - 1;

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="manage-columns-modal">
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 1,
            color: "black",
          }}
        >
          Manage columns
        </Typography>

        <Divider sx={{ mb: 2 }} /> {/* Horizontal line below the heading */}

        <FormControlLabel
          control={
            <Checkbox
              checked={allSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              sx={{
                "&.Mui-checked": {
                  color: "black",
                },
              }}
            />
          }
          label="Select all"
          sx={{
            mb: 2,
            color: "black",
          }}
        />

        <Box sx={{
          display: "flex", flexDirection: "column", gap: 1, maxHeight: "300px",
          overflowY: "auto",
        }}>
          {filteredColumns.map((column) => (
            <FormControlLabel
              key={column.key}
              control={
                <Checkbox
                  checked={selectedColumns.includes(column.key)}
                  onChange={() => handleColumnToggle(column.key)}
                  sx={{
                    "&.Mui-checked": {
                      color: "black",
                    },
                  }}
                />
              }
              label={column.title}
              sx={{
                color: "black",
              }}
            />
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default SelectColumnsModal;