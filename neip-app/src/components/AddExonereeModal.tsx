import React, { useState } from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LabelAndEntry from "../components/LabelAndEntry"
import LabelAndDropdown from "../components/LabelAndDropdown"
import DropdownAndTags from "../components/DropdownAndTags"
import PersonalInfoIcon from "../img/PersonalInfoIcon.png";
import EditIcon from "../img/EditIcon.png";
import IconTextButton from "../components/IconTextButton";

const style = {
  position: "absolute",
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
        const personalLeftIcons = [
          <React.Fragment key="personal-info-icon">
            <Image src={PersonalInfoIcon} alt="personal info icon" height="5.21" width="10.42" />
          </React.Fragment>,
          <React.Fragment key="edit-icon">
            <Image src={EditIcon} alt="edit icon" style={{ marginLeft: '200px' }} height="5.21" width="10.42" />
          </React.Fragment>,
          <React.Fragment key="first-name-entry">
            <LabelAndEntry
              label={"First Name"}
              placeholder={""}
              width="40%"
              height="35px"
              borderRadius="20px"
            />
          </React.Fragment>,
          <React.Fragment key="last-name-entry">
            <LabelAndEntry
              label={"Last Name"}
              placeholder={""}
              width="40%"
              height="35px"
              borderRadius="20px"
            />
          </React.Fragment>,
          <React.Fragment key="phone-number-entry">
            <LabelAndEntry
              label={"Phone Number"}
              placeholder={""}
              width="40%"
              height="35px"
              borderRadius="20px"
            />
          </React.Fragment>,
          <React.Fragment key="email-entry">
            <LabelAndEntry
              label={"Email"}
              placeholder={""}
              width="40%"
              height="35px"
              borderRadius="20px"
            />
          </React.Fragment>,
        ];
        

        const personalRightIcons = [
          <React.Fragment key="dob-entry">
            <LabelAndEntry
              label={"DOB"}
              placeholder={"xx/xx/xxxx"}
              width="48%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="gender-dropdown">
            <LabelAndDropdown
              label={"Gender"}
              dropdownOptions={["Male", "Female"]}
              placeholder={"Gender"}
              width="210px"
            />
          </React.Fragment>,
          <React.Fragment key="race-dropdown">
            <LabelAndDropdown
              label={"Race"}
              dropdownOptions={[
                "White",
                "Black",
                "Asian",
                "Hispanic or Latino",
                "American Indian or Alaska Native",
                "Native Hawaiian or Pacific Islander",
              ]}
              placeholder={"Race"}
              width="210px"
            />
          </React.Fragment>,
          <React.Fragment key="ethnicity-dropdown">
            <LabelAndDropdown
              label={"Ethnicity"}
              dropdownOptions={[
                "American Indian/Alaska Native",
                "Asian",
                "Black",
                "Hispanic or Latino",
                "Middle Eastern or North African",
                "White/European",
              ]}
              placeholder={"Ethnicity"}
              width="210px"
            />
          </React.Fragment>,
          <React.Fragment key="address-entry">
            <LabelAndEntry
              label={"Address"}
              width="48%"
              height="72px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="save-button">
            <div style={{ textAlign: "center", marginTop: "30px", marginLeft: "50px" }}>
              <IconTextButton
                filled={true}
                text="Save"
                border={false}
                height="44px"
                width="104px"
              />
            </div>
          </React.Fragment>,
        ];
        
        return <div>
                <div style={{display: 'flex', marginTop: '50px', marginRight: '10px', marginLeft: '100px'}}>
                  {/* Left Column */}
                  <div style={{ flex: 1, marginRight: 'auto', marginLeft: '90px' }}>
                    {personalLeftIcons.map((icon, index) => (
                      <div key={index} style={{ marginBottom: "3px" }}>
                        {icon}
                      </div>
                    ))}
                  </div>
                  {/* Right Column */}
                  <div style={{ flex: 1, marginLeft: "10px" }}>
                    {personalRightIcons.map((icon, index) => (
                      <div key={index} style={{ marginBottom: "3px" }}>
                        {icon}
                      </div>
                    ))}
                  </div>
                  
                </div>
               </div>;
      case 1:
        const caseLeftIcons = [
          <React.Fragment key="case-number">
            <LabelAndEntry
              label={"Case Number"}
              placeholder={"XXXXXXXXXXXX"}
              width="60%"
              height="35px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="jurisdiction">
            <LabelAndEntry
              label={"Jurisdiction"}
              placeholder={"City, State"}
              width="60%"
              height="35px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="years-in-prison">
            <LabelAndEntry
              label={"Years in Prison"}
              width="60%"
              height="35px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="arrest-date">
            <LabelAndEntry
              label={"Arrest Date"}
              placeholder={"XX/XX/XXX"}
              width="60%"
              height="35px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="conviction-date">
            <LabelAndEntry
              label={"Conviction Date"}
              placeholder={"XX/XX/XXX"}
              width="60%"
              height="35px"
              borderRadius="10px"
            />
          </React.Fragment>,
        ];
        

        const caseRightIcons = [
          <React.Fragment key="freedom-date">
            <LabelAndEntry
              label={"Freedom Date"}
              placeholder={"XX/XX/XXX"}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="exoneration-date">
            <LabelAndEntry
              label={"Exoneration Date"}
              placeholder={"XX/XX/XXX"}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="crime-type-dropdown">
            <LabelAndDropdown
              label={"Crime Type"}
              dropdownOptions={["Felony", "Misdemeanor"]}
              placeholder={"Crime Type"}
              width="265px"
            />
          </React.Fragment>,
          <React.Fragment key="sentence-entry">
            <LabelAndEntry
              label={"Sentence"}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="save-button">
            <div style={{ marginTop: "30px", marginLeft: "80px" }}>
              <IconTextButton
                filled={true}
                text="Save"
                border={false}
                height="44px"
                width="104px"
              />
            </div>
          </React.Fragment>,
        ];
        
        return <div>
                <div style={{display: 'flex', marginTop: '50px', marginRight: '10px', marginLeft: '100px'}}>
                  {/* Left Column */}
                  <div style={{ flex: 1, marginRight: 'auto', marginLeft: '90px' }}>
                    {caseLeftIcons.map((icon, index) => (
                      <div key={index} style={{ marginBottom: "3px" }}>
                        {icon}
                      </div>
                    ))}
                  </div>
                  {/* Right Column */}
                  <div style={{ flex: 1, marginLeft: "10px" }}>
                    {caseRightIcons.map((icon, index) => (
                      <div key={index} style={{ marginBottom: "3px" }}>
                        {icon}
                      </div>
                    ))}
                  </div>
                  
                </div>
               </div>;
      case 2:
        const legalLeftIcons = [
          <React.Fragment key="original-charges">
            <DropdownAndTags
              label={"Original Charges"}
              placeholder={"Charge"}
              options={[]}
              width="60%"
              height="35px"
            />
          </React.Fragment>,
          <React.Fragment key="conviction-method">
            <LabelAndEntry
              label={"Conviction Method"}
              width="60%"
              height="35px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="exoneration-method">
            <LabelAndEntry
              label={"Exoneration Method"}
              width="60%"
              height="35px"
              borderRadius="10px"
            />
          </React.Fragment>,
        ];
        
        const legalRightIcons = [
          <React.Fragment key="prosecutor">
            <LabelAndEntry
              label={"Prosecutor"}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="detectives-involved">
            <DropdownAndTags
              label={"Detectives Involved"}
              placeholder={"Detective"}
              options={[]}
              width="60%"
              height="36px"
            />
          </React.Fragment>,
          <React.Fragment key="save-button">
            <div style={{ marginTop: "30px", marginLeft: "80px" }}>
              <IconTextButton
                filled={true}
                text="Save"
                border={false}
                height="44px"
                width="104px"
              />
            </div>
          </React.Fragment>,
        ];
        
        return <div>
                <div style={{display: 'flex', marginTop: '50px', marginRight: '10px', marginLeft: '100px'}}>
                  {/* Left Column */}
                  <div style={{ flex: 1, marginRight: 'auto', marginLeft: '90px' }}>
                    {legalLeftIcons.map((icon, index) => (
                      <div key={index} style={{ marginBottom: "3px" }}>
                        {icon}
                      </div>
                    ))}
                  </div>
                  {/* Right Column */}
                  <div style={{ flex: 1, marginLeft: "10px" }}>
                    {legalRightIcons.map((icon, index) => (
                      <div key={index} style={{ marginBottom: "3px" }}>
                        {icon}
                      </div>
                    ))}
                  </div>
                  
                </div>
               </div>;
      case 3:
        const circumstancesLeftIcons = [,
          <React.Fragment key="false-confession">
            <LabelAndDropdown
              label={"False confession"}
              placeholder={"[Yes/No]"}
              dropdownOptions={["Yes", "No"]}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="eyewitness-misidentification">
            <LabelAndDropdown
              label={"Eyewitness misidentification"}
              placeholder={"[Yes/No]"}
              dropdownOptions={["Yes", "No"]}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="inadequate-legal-defense">
            <LabelAndDropdown
              label={"Inadequate legal defense"}
              placeholder={"[Yes/No]"}
              dropdownOptions={["Yes", "No"]}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="police-prosecutorial-misconduct">
            <LabelAndDropdown
              label={"Police/Prosecutorial misconduct"}
              placeholder={"[Yes/No]"}
              dropdownOptions={["Yes", "No"]}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
        ];
        

        const circumstancesRightIcons = [
          <React.Fragment key="forensic-evidence">
            <LabelAndDropdown
              label={"Forensic Evidence"}
              placeholder={"[Yes/No]"}
              dropdownOptions={["Yes", "No"]}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="informant-testimony">
            <LabelAndEntry
              label={"Informant Testimony"}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="save-button">
            <div style={{ textAlign: "center", marginTop: "30px", marginLeft: "50px" }}>
              <IconTextButton
                filled={true}
                text="Save"
                border={false}
                height="44px"
                width="104px"
              />
            </div>
          </React.Fragment>,
        ];
        
        return <div>
          <div style={{display: 'flex', marginTop: '50px', marginRight: '10px', marginLeft: '100px'}}>
            <div style={{ flex: 1, marginRight: 'auto', marginLeft: '90px' }}>
              {circumstancesLeftIcons.map((icon, index) => (
                <div key={index} style={{ marginBottom: "3px" }}>
                  {icon}
                </div>
              ))}
            </div>
            <div style={{ flex: 1, marginLeft: "10px" }}>
              {circumstancesRightIcons.map((icon, index) => (
                <div key={index} style={{ marginBottom: "3px" }}>
                  {icon}
                </div>
              ))}
            </div>
            
          </div>
        </div>;

      case 4:
        const postexonerationLeftIcons = [,
          <React.Fragment key="compensation-amount">
            <LabelAndEntry
              label={"Compensation"}
              placeholder={"Amount"}
              dropdownOptions={["Yes", "No"]}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="compensation-date">
            <LabelAndEntry
              label={"Compensation Date"}
              placeholder={"xx/xx/xxxx"}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="reentry-support">
            <LabelAndDropdown
              label={"Reentry support"}
              placeholder={"[Yes/No]"}
              dropdownOptions={["Yes", "No"]}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="public-apology">
            <LabelAndDropdown
              label={"Public apology"}
              placeholder={"[Yes/No]"}
              dropdownOptions={["Yes", "No"]}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="current-status">
            <LabelAndDropdown
              label={"Current status"}
              placeholder={"status"}
              dropdownOptions={["Freed but still fighting", "Plea deal", "Exonerated"]}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
        ];
        

        const postexonerationRightIcons = [
          <React.Fragment key="current-occupation">
            <LabelAndEntry
              label={"Current occupation"}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="place-of-residence">
            <LabelAndEntry
              label={"Place of residence"}
              placeholder={"Address"}
              width="60%"
              height="72px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="save-button">
            <div style={{ textAlign: "center", marginTop: "30px", marginLeft: "50px" }}>
              <IconTextButton
                filled={true}
                text="Save"
                border={false}
                height="44px"
                width="104px"
              />
            </div>
          </React.Fragment>,
        ];
        
        return <div>
          <div style={{display: 'flex', marginTop: '50px', marginRight: '10px', marginLeft: '100px'}}>
            <div style={{ flex: 1, marginRight: 'auto', marginLeft: '90px' }}>
              {postexonerationLeftIcons.map((icon, index) => (
                <div key={index} style={{ marginBottom: "3px" }}>
                  {icon}
                </div>
              ))}
            </div>
            <div style={{ flex: 1, marginLeft: "10px" }}>
              {postexonerationRightIcons.map((icon, index) => (
                <div key={index} style={{ marginBottom: "3px" }}>
                  {icon}
                </div>
              ))}
            </div>
            
          </div>
        </div>;

      case 5:
        const additionalLeftIcons = [,
          <React.Fragment key="media-coverage">
            <LabelAndEntry
              label={"Media coverage"}
              placeholder={"link"}
              width="60%"
              height="36px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="advocacy-involvement">
            <LabelAndEntry
              label={"Advocacy involvement"}
              width="60%"
              height="72px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="educational-background">
            <LabelAndEntry
              label={"Educational background"}
              width="60%"
              height="72px"
              borderRadius="10px"
            />
          </React.Fragment>,
        ];

        const additionalRightIcons = [
          <React.Fragment key="health-info">
            <LabelAndEntry
              label={"Health information"}
              width="60%"
              height="72px"
              borderRadius="10px"
            />
          </React.Fragment>,
          <React.Fragment key="save-button">
            <div style={{ textAlign: "center", marginTop: "30px", marginLeft: "50px" }}>
              <IconTextButton
                filled={true}
                text="Save"
                border={false}
                height="44px"
                width="104px"
              />
            </div>
          </React.Fragment>,
        ];
        
        return <div>
          <div style={{display: 'flex', marginTop: '50px', marginRight: '10px', marginLeft: '100px'}}>
            <div style={{ flex: 1, marginRight: 'auto', marginLeft: '90px' }}>
              {additionalLeftIcons.map((icon, index) => (
                <div key={index} style={{ marginBottom: "3px" }}>
                  {icon}
                </div>
              ))}
            </div>
            <div style={{ flex: 1, marginLeft: "10px" }}>
              {additionalRightIcons.map((icon, index) => (
                <div key={index} style={{ marginBottom: "3px" }}>
                  {icon}
                </div>
              ))}
            </div>
            
          </div>
        </div>;

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
