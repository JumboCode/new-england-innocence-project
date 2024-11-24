import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 1300,
};

interface AddExonereeModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddExonereeModal: React.FC<AddExonereeModalProps> = ({ open, handleClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabSx = (tabIndex: number) => ({
    fontSize: "12px",
    fontFamily: "Arial, sans-serif",
    textTransform: "none",
    color: activeTab === tabIndex ? "white" : "black",
    backgroundColor: activeTab === tabIndex ? "#6AA9F9" : "white",
    padding: "5px 10px 5px 12px",
    border: "none",
    borderRadius: "28px",
    gap: "4px",
    transition: "background-color 0.3s ease, color 0.3s ease",
    "&:hover": {
      backgroundColor: activeTab === tabIndex ? "#6AA9F9" : "#E3F2FD",
    },
    "&.Mui-selected": {
        color: "white",
    },
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <div>Personal Info</div>;
      case 1:
        return <div>Case Info</div>;
      case 2:
        return <div>Legal Info</div>;
      case 3:
        return <div>Circumstances of Wrongful Conviction</div>;
      case 4:
        return <div>Post Exoneration Info</div>;
      case 5:
        return <div>Additional Info</div>;
      default:
        return <div>Personal Info</div>;
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="add-exoneree-modal">
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{
            style: { display: "none" },
          }}
        >
          <Tab sx={tabSx(0)} label="Personal Info" />
          <Tab sx={tabSx(1)} label="Case Info" />
          <Tab sx={tabSx(2)} label="Legal Info" />
          <Tab sx={tabSx(3)} label="Circumstances of Wrongful Conviction" />
          <Tab sx={tabSx(4)} label="Post Exoneration Info" />
          <Tab sx={tabSx(5)} label="Additional Info" />
        </Tabs>

        <Box sx={{ mt: 3 }}>{renderTabContent()}</Box>
      </Box>
    </Modal>
  );
};

export default AddExonereeModal;
