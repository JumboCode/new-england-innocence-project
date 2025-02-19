
import React, { useState } from "react";
import IconTextButton from "../components/IconTextButton";
import SearchEntryBox from "../components/SearchEntryBox";
import Image from "next/image";
import dynamic from "next/dynamic";
import TrashIcon from "../img/trash-01.png";
import UploadIcon from "../img/Upload.png";
import PlusIcon from "../img/plus.png";
import ArrowIcon from "../img/arrow_icon.png";
import AddExonereeModal from '@/components/AddExonereeModal';
import { FaFilter } from 'react-icons/fa';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { MdFilterList } from 'react-icons/md';
import ActionMenuComponent from "@/components/ActionMenuComponent";
import SelectColumnsModal from "@/components/SelectColumnsModal";
// import { Button } from "@mui/material";
import TableFilterIcons from "@/components/TableFilterIcons";
import OpenFilterSidebar from "../components/OpenFilterSidebar";

// TODO: This is a bandaid solution for Vercel deployment. 
// In the future we will want to dynamically determine columns based off this
interface TableRowData {
  // name: string;
  // dob: string;
  // race: string;
  // ethnicity: string;
  // phoneNumber: string;
  // address: string;
  // email: string;
  // caseNumber: string;
  // crimeType: string;
    key: number;
    name: string;
    dob: string;
    gender: string;
    race: string;
    ethnicity: string;
    phoneNumber: string;
    address: string;
    email: string;
    caseNumber: string;
    jurisdiction: string;
    yearsInPrison: number;
    arrestDate: string;
    convictionDate: string;
    freedomDate: string;
    exonerationDate: string;
    crimeType: string;
    sentence: string;
    originalCharges: string;
    convictionMethod: string;
    exonerationMethod: string;
    legalRepresentation: string;
    prosecutor: string;
    detectivesInvolved: string;
    falseConfession: boolean;
    eyewitnessMisidentification: boolean;
    inadequateLegalDefense: boolean;
    policeProsecutorialMisconduct: boolean;
    forensicEvidence: boolean;
    informantTestimony: boolean;
    compensation: number;
    reentrySupport: string,
    publicApology: boolean,
    currentStatus: string;
    mediaCoverage: string;
    advocacyInvolvement: string;
    educationalBackground: string;
    healthInfo: string;
    dataSource: string;
    lastUpdated: string;
    createdAt: string;
}
// Dynamic import for the Ant Design Table component
const Table = dynamic(() => import("antd").then((mod) => mod.Table), { ssr: false });

// Dummy data for the table
const dataSource = [
  {
    key: "1",
    name: "Mike Johnson",
    dob: "10/10/2005",
    gender: "Male",
    race: "White",
    ethnicity: "Caucasian",
    phoneNumber: "123-456-7890",
    address: "123 Main St, Springfield",
    email: "mike.johnson@example.com",
    caseNumber: "56789",
    jurisdiction: "Federal",
    yearsInPrison: "5",
    arrestDate: "10/10/2024",
    convictionDate: "11/10/2024",
    freedomDate: "11/12/2024",
    exonerationDate: "11/15/2024",
    crimeType: "Misdemeanor",
    sentence: "2 years",
    originalCharges: "Robbery",
    convictionMethod: "Public",
    exonerationMethod: "Prison",
    legalRepresentation: "Yes",
    prosecutor: "Yes",
    detectivesInvolved: "Yes",
    falseConfession: "No",
    eyewitnessMisidentification: "No",
    inadequateLegalDefense: "Yes",
    policeProsecutorialMisconduct: "Yes",
    forensicEvidence: "Paper Bag",
    informantTestimony: "Yes",
    compensation: "$500",
    reentrySupport: "Yes",
    publicApology: "No",
    currentStatus: "In Jail",
    mediaCoverage: "Yes",
    advocacyInvolvement: "Yes",
    educationalBackground: "High School",
    healthInfo: "Good",
    dataSource: "Internal",
    lastUpdated: "10/24/2024",
    createdAt: "10/24/2024",
  },
  {
    key: "2",
    name: "Sarah Carter",
    dob: "07/15/1995",
    gender: "Female",
    race: "Black",
    ethnicity: "African-American",
    phoneNumber: "987-654-3210",
    address: "456 Elm St, Boston",
    email: "sarah.carter@example.com",
    caseNumber: "12345",
    jurisdiction: "State",
    yearsInPrison: "8",
    arrestDate: "03/10/2018",
    convictionDate: "06/10/2018",
    freedomDate: "06/10/2026",
    exonerationDate: "06/12/2026",
    crimeType: "Felony",
    sentence: "10 years",
    originalCharges: "Assault",
    convictionMethod: "Jury Trial",
    exonerationMethod: "DNA Evidence",
    legalRepresentation: "Yes",
    prosecutor: "Yes",
    detectivesInvolved: "No",
    falseConfession: "Yes",
    eyewitnessMisidentification: "Yes",
    inadequateLegalDefense: "No",
    policeProsecutorialMisconduct: "Yes",
    forensicEvidence: "DNA",
    informantTestimony: "No",
    compensation: "$1,200,000",
    reentrySupport: "Yes",
    publicApology: "Yes",
    currentStatus: "Released",
    mediaCoverage: "No",
    advocacyInvolvement: "No",
    educationalBackground: "College Graduate",
    healthInfo: "Excellent",
    dataSource: "External",
    lastUpdated: "06/20/2026",
    createdAt: "03/10/2018",
  },
  {
    key: "3",
    name: "John Smith",
    dob: "12/01/1988",
    gender: "Male",
    race: "Hispanic",
    ethnicity: "Latino",
    phoneNumber: "555-234-6789",
    address: "789 Pine St, Miami",
    email: "john.smith@example.com",
    caseNumber: "78901",
    jurisdiction: "County",
    yearsInPrison: "3",
    arrestDate: "01/15/2021",
    convictionDate: "03/15/2021",
    freedomDate: "03/15/2024",
    exonerationDate: "03/20/2024",
    crimeType: "Fraud",
    sentence: "5 years",
    originalCharges: "Tax Evasion",
    convictionMethod: "Bench Trial",
    exonerationMethod: "Appeal",
    legalRepresentation: "No",
    prosecutor: "Yes",
    detectivesInvolved: "Yes",
    falseConfession: "No",
    eyewitnessMisidentification: "No",
    inadequateLegalDefense: "Yes",
    policeProsecutorialMisconduct: "No",
    forensicEvidence: "Audit",
    informantTestimony: "Yes",
    compensation: "$200,000",
    reentrySupport: "Yes",
    publicApology: "No",
    currentStatus: "Released",
    mediaCoverage: "Yes",
    advocacyInvolvement: "Yes",
    educationalBackground: "Bachelor's Degree",
    healthInfo: "Fair",
    dataSource: "Internal",
    lastUpdated: "03/20/2024",
    createdAt: "01/15/2021",
  },
  {
    key: "4",
    name: "Emily Davis",
    dob: "04/22/1990",
    gender: "Female",
    race: "Asian",
    ethnicity: "Chinese",
    phoneNumber: "222-333-4444",
    address: "101 Birch St, Seattle",
    email: "emily.davis@example.com",
    caseNumber: "11223",
    jurisdiction: "Federal",
    yearsInPrison: "7",
    arrestDate: "05/01/2014",
    convictionDate: "09/01/2014",
    freedomDate: "09/01/2021",
    exonerationDate: "09/15/2021",
    crimeType: "Theft",
    sentence: "10 years",
    originalCharges: "Grand Larceny",
    convictionMethod: "Jury Trial",
    exonerationMethod: "New Evidence",
    legalRepresentation: "Yes",
    prosecutor: "Yes",
    detectivesInvolved: "Yes",
    falseConfession: "No",
    eyewitnessMisidentification: "No",
    inadequateLegalDefense: "No",
    policeProsecutorialMisconduct: "Yes",
    forensicEvidence: "Surveillance",
    informantTestimony: "No",
    compensation: "$800,000",
    reentrySupport: "No",
    publicApology: "Yes",
    currentStatus: "Released",
    mediaCoverage: "Yes",
    advocacyInvolvement: "No",
    educationalBackground: "Master's Degree",
    healthInfo: "Good",
    dataSource: "External",
    lastUpdated: "09/30/2021",
    createdAt: "05/01/2014",
  },
];

// Table columns configuration
const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "DOB", dataIndex: "dob", key: "dob" },
  { title: "Race", dataIndex: "race", key: "race" },
  { title: "Ethnicity", dataIndex: "ethnicity", key: "ethnicity" },
  { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
  { title: "Address", dataIndex: "address", key: "address" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Case Number", dataIndex: "caseNumber", key: "caseNumber" },
  { title: "Crime Type", dataIndex: "crimeType", key: "crimeType" },
  { title: "Gender", dataIndex: "gender", key: "gender" },
  { title: "Jurisdiction", dataIndex: "jurisdiction", key: "jurisdiction" },
  { title: "Years In Prison", dataIndex: "yearsInPrison", key: "yearsInPrison" },
  { title: "Arrest Date", dataIndex: "arrestDate", key: "arrestDate" },
  { title: "Conviction Date", dataIndex: "convictionDate", key: "convictionDate" },
  { title: "Freedom Date", dataIndex: "freedomDate", key: "freedomDate" },
  { title: "Exoneration Date", dataIndex: "exonerationDate", key: "exonerationDate" },
  { title: "Sentence", dataIndex: "sentence", key: "sentence" },
  { title: "Original Charges", dataIndex: "originalCharges", key: "originalCharges" },
  { title: "Conviction Method", dataIndex: "convictionMethod", key: "convictionMethod" },
  { title: "Exoneration Method", dataIndex: "exonerationMethod", key: "exonerationMethod" },
  { title: "Legal Representation", dataIndex: "legalRepresentation", key: "legalRepresentation" },
  { title: "Prosecutor", dataIndex: "prosecutor", key: "prosecutor" },
  { title: "Detectives Involved", dataIndex: "detectivesInvolved", key: "detectivesInvolved" },
  { title: "False Confession", dataIndex: "falseConfession", key: "falseConfession" },
  { title: "Eyewitness Misidentification", dataIndex: "eyewitnessMisidentification", key: "eyewitnessMisidentification" },
  { title: "Inadequate Legal Defense", dataIndex: "inadequateLegalDefense", key: "inadequateLegalDefense" },
  { title: "Police Prosecutorial Misconduct", dataIndex: "policeProsecutorialMisconduct", key: "policeProsecutorialMisconduct" },
  { title: "Forensic Evidence", dataIndex: "forensicEvidence", key: "forensicEvidence" },
  { title: "Informant Testimony", dataIndex: "informantTestimony", key: "informantTestimony" },
  { title: "Compensation", dataIndex: "compensation", key: "compensation" },
  { title: "Reentry Support", dataIndex: "reentrySupport", key: "reentrySupport" },
  { title: "Public Apology", dataIndex: "publicApology", key: "publicApology" },
  { title: "Current Status", dataIndex: "currentStatus", key: "currentStatus" },
  { title: "Media Coverage", dataIndex: "mediaCoverage", key: "mediaCoverage" },
  { title: "Advocacy Involvement", dataIndex: "advocacyInvolvement", key: "advocacyInvolvement" },
  { title: "Educational Background", dataIndex: "educationalBackground", key: "educationalBackground" },
  { title: "Health Info", dataIndex: "healthInfo", key: "healthInfo" },
  { title: "Data Source", dataIndex: "dataSource", key: "dataSource" },
  { title: "Last Updated", dataIndex: "lastUpdated", key: "lastUpdated" },
  { title: "Created At", dataIndex: "createdAt", key: "createdAt" }
];

const HomePage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [columnsModalOpen, setColumnsModalOpen] = useState(false);

  // Initialize selectedColumns with all column keys
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.map(col => col.key)
  );

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleColumnsModalOpen = () => setColumnsModalOpen(true);
  const handleColumnsModalClose = () => setColumnsModalOpen(false);

  const handleColumnSelectionChange = (newSelectedColumns: string[]) => {
    setSelectedColumns(newSelectedColumns);
  };

  const [selectedFilters] = useState(['Detective', 'Male', 'Test']);

  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [actionMenuPosition, setActionMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedCell, setSelectedCell] = useState<{ record: TableRowData; columnKey: string } | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredColumns = columns.filter((column) =>
    selectedColumns.includes(column.key)
  ).map(column => ({
    ...column,
    onCell: (record: any) => ({
      onClick: (event: any) => handleCellClick(event, record, column.key),
    }),
  }));

  const handleCellClick = (event: React.MouseEvent<HTMLTableCellElement>, record: any, columnKey: string) => {
    event.stopPropagation();

    const cellElement = event.currentTarget as HTMLTableCellElement;
    const boundingRect = cellElement.getBoundingClientRect();

    if (selectedCell &&
      (selectedCell.record !== record || selectedCell.columnKey !== columnKey)) {
      setActionMenuVisible(false);
      setTimeout(() => {
        setActionMenuPosition({ x: boundingRect.left, y: boundingRect.top });
        setSelectedCell({ record, columnKey });
        setActionMenuVisible(true);
      }, 50);
    } else {
      setActionMenuPosition({ x: boundingRect.left, y: boundingRect.top });
      setSelectedCell({ record, columnKey });
      setActionMenuVisible(true);
    }
  };

  const closeActionMenu = () => {
    setActionMenuVisible(false);
    //setSelectedCell(null);
  };

const closeFilterSidebar = () => {
  setIsSidebarOpen(false);
};

const openFilterSidebar = () => {
  setIsSidebarOpen(true);
};

const noop: () => void = () => {};

  return (
    <div style={{ height: '100vh', backgroundColor: 'white', width: '100vw', paddingLeft: '60px'}}>

        {/* Top Banner */}
        <div style={{ backgroundColor: '#033550', color: 'white', display: 'flex', alignItems: 'center', height: '56px' }}>
            <img src="/caseview_logo2.png" alt="Logo" style={{ height: '35px', marginLeft: '17px', backgroundColor: 'white' }} />
        </div>

        {/* Render the OpenFiterSideBar if it's visible*/}
        {isSidebarOpen && <OpenFilterSidebar onClose={closeFilterSidebar} />}

        {/* Open Filter Sidebar Button - Top Right */}
          <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setIsSidebarOpen(true)}
                style={{
                  backgroundColor: '#0F6A9A',
                  color: 'white',
                  padding: '16px 24px',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: '1279px',
                  // marginRight: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '11px',
              }}
              >
                Open filter sidebar
                  <Image src={ArrowIcon} alt="arrow icon" style={{ marginLeft: '12px' }} height="5.21" width="10.42"></Image>
              </button>
          </div>

        {/* Main Content */}
        <div style={{ padding: '20px' }}>
          
            {/* "Home Database" Heading */}
            <h1 style={{ color: '#101828', fontWeight: 'bold', fontSize: '30px', marginTop: '-25px', marginLeft: '15px' }}>Home Database</h1>

            {/* Search Bar and Action Buttons Container */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '17px' }}>
                {/* Search Bar */}
                <div style={{ flex: 1, maxWidth: '300px', marginLeft: '15px' }}>
                    <SearchEntryBox />
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', marginRight: '15px' }}>
                <IconTextButton
                        icon={<Image src={TrashIcon} alt="trash icon" width="20" height="20"></Image>}
                        filled={false}
                        text="Delete"
                        border={false}
                        height="44px"
                        width="104px"
                    />
                    <IconTextButton
                        icon={<Image src={UploadIcon} alt="upload icon" width="24" height="24"></Image>}
                        filled={false}
                        text="Export to CSV"
                        border={true}
                        height="44px"
                        width="159px"
                    />
                    <IconTextButton
                        onClick={handleOpenModal}
                        icon={<Image src={PlusIcon} alt="plus icon" width="14" height="14"></Image>}
                        filled={true}
                        text="Add new exoneree file"
                        border={false}
                        height="44px"
                        width="209px"
                    />
                </div>
            </div>

            {/* Table Filter Info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', borderColor: '#E1E0E0', borderWidth: '1px', borderBottom: 'none' }}>
                <div style={{ display: 'flex', gap: '12px', marginLeft: '20px', marginTop: '10px', marginBottom: '10px' }}>
                    {/* <Image src={PlusIcon} alt="funnel" style={{ width: '16px', height: '16px', marginTop: '10px' }} ></Image>  */}
                    <FaFilter style={{ width: '16px', height: '16px', marginTop: '10px' }} />
                    {selectedFilters.map((filter, index) => (
                        <TableFilterIcons
                            key={index}
                            icon={<AiOutlineClose style={{ width: '16px', height: '16px', color: 'black' }} />}
                            filled={true}
                            text={filter}
                            border={false}
                            borderRadius={false}
                            height="35px"
                            onOpenFilter={noop}
                            />
                        ))}
                    <TableFilterIcons
                        icon={<AiOutlinePlus style={{ width: '16px', height: '16px', color: 'black' }} />}
                        filled={false}
                        text="Filter"
                        border={false}
                        borderRadius={false}
                        height="35px"
                        width="120px"
                        onOpenFilter={openFilterSidebar}
                    />
                </div>
                <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
                  <TableFilterIcons
                    icon={<MdFilterList style={{ width: '16px', height: '16px', color: 'black' }} />}
                    filled={false}
                    text="Manage Columns"
                    border={true}
                    borderRadius={true}
                    height="35px"
                    width="185px"
                    onOpenFilter={handleColumnsModalOpen}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0px', borderColor: '#E1E0E0', borderWidth: '1px', borderTop: 'none' }}>
                <div style={{ display: 'flex', gap: '4px', marginLeft: '20px', marginTop: '2px', marginBottom: '6px' }}>
                    <span style={{ color: '#ABACBE', fontSize: '12px' }}>Showing</span>
                    <span style={{ color: '#000000', fontSize: '12px' }}>x</span>
                    <span style={{ color: '#ABACBE', fontSize: '12px' }}>from</span>
                    <span style={{ color: '#000000', fontSize: '12px' }}>x</span>
                    <span style={{ color: '#ABACBE', fontSize: '12px' }}>results</span>
                </div>
            </div>

            {/* Database Display */}
            <div style={{ height: '60vh', backgroundColor: 'white' }}>
                
                {/* Database Display */}
                <Table 
                    dataSource={dataSource} 
                    columns={filteredColumns} 
                    scroll={{ x: 'max-content' }} 
                />
            </div>

    {/* Action Menu */}
    {actionMenuVisible && (
      <div
        style={{
          position: "absolute",
          top: actionMenuPosition.y,
          left: actionMenuPosition.x,
          zIndex: 1000,
        }}
      >

        <ActionMenuComponent onClose={closeActionMenu} selectedExoneree={selectedCell?.record} />
      </div>
    )}
    </div>  

      {/* Modals */}
      <AddExonereeModal open={modalOpen} handleClose={handleCloseModal} />
      <SelectColumnsModal
        open={columnsModalOpen}
        handleClose={handleColumnsModalClose}
        columns={columns}
        selectedColumns={selectedColumns}
        onColumnSelectionChange={handleColumnSelectionChange}
      />
    </div>
  );
};

export default HomePage;