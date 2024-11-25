import React, { useState } from "react";
import IconTextButton from "../components/IconTextButton";
import SearchEntryBox from "../components/SearchEntryBox";
import Image from "next/image";
import dynamic from "next/dynamic";
import TrashIcon from "../img/trash-01.png";
import UploadIcon from "../img/Upload.png";
import PlusIcon from "../img/plus.png";
import ArrowIcon from "../img/arrow_icon.png";
import funnel from "../img/funnel.png";
import XIcon from "../img/xicon.png";
import Filter from "../img/filter.png"
import { CgTrash, CgExport, CgAdd, CgSearch, CgChevronLeft } from "react-icons/cg";
import Logo from "../img/logo.png";
import NavBar from "@/components/NavBar";
import ActionMenuComponent from "@/components/ActionMenuComponent";

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
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      onCell: (record, rowIndex) => ({
        onClick: (event) => handleCellClick(event, record, "name"),
      }),
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      onCell: (record, rowIndex) => ({
        onClick: (event) => handleCellClick(event, record, "dob"),
      }),
    },
    {
      title: "Race",
      dataIndex: "race",
      key: "race",
      onCell: (record, rowIndex) => ({
        onClick: (event) => handleCellClick(event, record, "race"),
      }),
    },
    {
      title: "Ethnicity",
      dataIndex: "ethnicity",
      key: "ethnicity",
      onCell: (record, rowIndex) => ({
        onClick: (event) => handleCellClick(event, record, "ethnicity"),
      }),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      onCell: (record, rowIndex) => ({
        onClick: (event) => handleCellClick(event, record, "phoneNumber"),
      }),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      onCell: (record, rowIndex) => ({
        onClick: (event) => handleCellClick(event, record, "address"),
      }),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      onCell: (record, rowIndex) => ({
        onClick: (event) => handleCellClick(event, record, "email"),
      }),
    },
    {
      title: "Case Number",
      dataIndex: "caseNumber",
      key: "caseNumber",
      onCell: (record, rowIndex) => ({
        onClick: (event) => handleCellClick(event, record, "caseNumber"),
      }),
    },
    {
      title: "Crime Type",
      dataIndex: "crimeType",
      key: "crimeType",
      onCell: (record, rowIndex) => ({
        onClick: (event) => handleCellClick(event, record, "crimeType"),
      }),
    },
  ];

// HomePage component
const HomePage: React.FC = () => {
    
    const [selectedFilters] = useState(['Detective', 'Male', 'Test']);
    
    // dummy data for table
    
    // const dataSource = [
        {
          key: '1', name: 'Mike', dob: '10/10/05', gender: 'male', race: 'white',
          ethnicity: 'white', phoneNumber: '234', address: '1234',  email: 'gmail',
          caseNumber: '567', jurisdiction: 'federal', yearsInPrison: '5', 
          arrestDate: '10/10/24', convictionDate: '11/10/24', freedomDate: '11/12/24',
          exonerationDate: '11/15/24', crimeType: 'misdemeanor', sentence: '2 years',
          originalCharges: 'robbery', convictionMethod: 'public', exonerationMethod: 'prison',
          legalRepresentation: 'yes', prosecutor: 'yes', detectivesInvolved: 'yes',
          falseConfession: 'false', eyewitnessMisidentification: 'nope',
          inadequateLegalDefense: 'yes', policeProsecutorialMisconduct: 'true',
          forensicEvidence: 'paper bag', informantTestimony: 'true', compensation: '$500',
          reentrySupport: 'true', publicApology: 'false', currentStatus: 'jail',
          mediaCoverage: 'true', advocacyInvolvement: 'true', educationalBackground: 'high school',
          healthInfo: 'good', dataSource: 'yes', lastUpdated: '10/24/2024', createdAt: '10/24/2024',
        },
      ];
      
      {/* title is column name, dataIndex is data index is dataSource array, key is a key for the column */}
      const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name'},
        { title: 'DOB', dataIndex: 'dob',key: 'dob' },
        { title: 'Race', dataIndex: 'race', key: 'race' },
        { title: 'Ethnicity', dataIndex: 'ethnicity', key: 'ethnicity' },
        { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber'},
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Case Number', dataIndex: 'caseNumber', key: 'caseNumber' },
        { title: 'Jurisdiction', dataIndex: 'jurisdiction', key: 'jurisdiction' },
        { title: 'Years in Prison', dataIndex: 'yearsInPrison', key: 'yearsInPrison' },
        { title: 'Arrest Date', dataIndex: 'arrestDate', key: 'arrestDate' },
        { title: 'Conviction Date', dataIndex: 'convictionDate', key: 'convictionDate' },
        { title: 'Freedom Date', dataIndex: 'freedomDate', key: 'freedomDate' },
        { title: 'Exoneration Date', dataIndex: 'exonerationDate', key: 'exonerationDate' },
        { title: 'Crime Type', dataIndex: 'crimeType', key: 'crimeType' },
        { title: 'Sentence', dataIndex: 'sentence', key: 'sentence' },
        { title: 'Original Charges', dataIndex: 'originalCharges', key: 'originalCharges' },
        { title: 'Conviction Method', dataIndex: 'convictionMethod', key: 'convictionMethod' },
        { title: 'Exoneration Method', dataIndex: 'exonerationMethod', key: 'exonerationMethod' },
        { title: 'Legal Representation', dataIndex: 'legalRepresentation', key: 'legalRepresentation' },
        { title: 'Prosecutor', dataIndex: 'prosecutor', key: 'prosecutor' },
        { title: 'Detectives Involved', dataIndex: 'detectivesInvolved', key: 'detectivesInvolved' },
        { title: 'False Confession', dataIndex: 'falseConfession', key: 'falseConfession' },
        { title: 'Eyewitness Misidentification', dataIndex: 'eyewitnessMisidentification', key: 'eyewitnessMisidentification' },
        { title: 'Inadequate Legal Defense', dataIndex: 'inadequateLegalDefense', key: 'inadequateLegalDefense' },
        { title: 'Police Prosecutorial Misconduct', dataIndex: 'policeProsecutorialMisconduct', key: 'policeProsecutorialMisconduct' },
        { title: 'Forensic Evidence', dataIndex: 'forensicEvidence', key: 'forensicEvidence' },
        { title: 'Informant Testimony', dataIndex: 'informantTestimony', key: 'informantTestimony' },
        { title: 'Compensation', dataIndex: 'compensation', key: 'compensation' },
        { title: 'Reentry Support', dataIndex: 'reentrySupport', key: 'reentrySupport' },
        { title: 'Public Apology', dataIndex: 'publicApology', key: 'publicApology' },
        { title: 'Current Status', dataIndex: 'currentStatus', key: 'currentStatus' },
        { title: 'Media Coverage', dataIndex: 'mediaCoverage', key: 'mediaCoverage' },
        { title: 'Advocacy Involvement', dataIndex: 'advocacyInvolvement', key: 'advocacyInvolvement' },
        { title: 'Educational Background', dataIndex: 'educationalBackground', key: 'educationalBackground' },
        { title: 'Health Info', dataIndex: 'healthInfo', key: 'healthInfo' },
        { title: 'Data Source', dataIndex: 'dataSource', key: 'dataSource' },
        { title: 'Last Updated', dataIndex: 'lastUpdated', key: 'lastUpdated' },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
      ];
      
      const [selectedColumns] = useState(['name', 'dob', 'crimeType']);

      // Filter columns based on selected columns state
      const filteredColumns = columns.filter(columns => selectedColumns.includes(columns.key));

      
      
    return (
        <div style={{ height: '100vh', backgroundColor: 'white', paddingLeft: '60px' }}>

            {/* Top Banner */}
            <div style={{ backgroundColor: '#033550', color: 'white', display: 'flex', alignItems: 'center', width: 'auto', height: '56px' }}>
                <img src="/caseview_logo2.png" alt="Logo" style={{ height: '35px', width: 'auto', marginLeft: '17px', backgroundColor: 'white' }} />
            </div>

            {/* Open Filter Sidebar Button - Top Right */}
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{
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
                }}>Open filter sidebar
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
                    <div style={{ display: 'flex', gap: '16px', marginRight: '200px' }}>
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
                    <Image src={funnel} alt="funnel" style={{ width: '16px', height: '16px', marginTop: '10px' }} ></Image>
                            
                    {selectedFilters.map((filter, index) => (
                        <TableFilterIcons
                            key={index}
                            icon={<Image src={XIcon} alt="XIcon" width={18} height={18} />}
                            filled={true}
                            text={filter}
                            border={false}
                            borderRadius={false}
                            height="35px"
                            />
                        ))}
                    <TableFilterIcons
                        icon={<Image src={PlusIcon} alt="PlusIcon" width={18} height={18}></Image>}
                        filled={false}
                        text="Filter"
                        border={false}
                        borderRadius={false}
                        height="35px"
                        width="120px"
                    />
                </div>
                <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
                  <TableFilterIcons
                    icon={<Image src={Filter} alt="Filter" width={18} height={18}></Image>}
                    filled={false}
                    text="Manage Columns"
                    border={true}
                    borderRadius={true}
                    height="35px"
                    width="185px"
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

                {/* Placeholder for Database Display */}
                <div style={{ height: '60vh', backgroundColor: 'white' }}>
                    
                    {/* Database Display */}
                    <Table 
                        dataSource={dataSource} 
                        columns={filteredColumns} 
                        scroll={{ x: 'max-content' }} 
                    />;
                </div>
            </div>
    const [selectedColumns] = useState([
      "name",
      "dob",
      "race",
      "ethnicity",
      "phoneNumber",
      "address",
      "email",
      "caseNumber",
      "crimeType",
    ]);
  
    const [actionMenuVisible, setActionMenuVisible] = useState(false);
    const [actionMenuPosition, setActionMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedCell, setSelectedCell] = useState<{ record: any; columnKey: string } | null>(null);
  
    const filteredColumns = columns.filter((column) =>
        selectedColumns.includes(column.key)
      ).map(column => ({
        ...column,
        onCell: (record, rowIndex) => ({
          onClick: (event) => handleCellClick(event, record, column.key),
        }),
      }));
  
    const handleCellClick = (event: React.MouseEvent<HTMLTableCellElement>, record: any, columnKey: string) => {
        event.stopPropagation();
        
        const cellElement = event.currentTarget as HTMLTableCellElement;
        const boundingRect = cellElement.getBoundingClientRect();
        
        // If clicking on a different cell, reset the selected menu item
        if (selectedCell && 
            (selectedCell.record !== record || selectedCell.columnKey !== columnKey)) {
          setActionMenuVisible(false);
          // Add a small delay to ensure the menu is fully closed before reopening
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
        setSelectedCell(null);
      };
  
    return (
      <div style={{ height: "100vh", backgroundColor: "white" }}>
        {/* Top Banner */}
        <div
          style={{
            backgroundColor: "#033550",
            color: "white",
            display: "flex",
            alignItems: "center",
            width: "auto",
            height: "56px",
          }}
        >
          <Image
            src={Logo}
            alt="Logo"
            style={{
              marginLeft: "17px",
              backgroundColor: "white",
            }}
            height={40}
          />
        </div>
  
        {/* Open Filter Sidebar Button */}
        <div style={{ textAlign: "center", display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              backgroundColor: "#0F6A9A",
              color: "white",
              padding: "16px 24px",
              border: "none",
              cursor: "pointer",
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
              fontSize: "11px",
            }}
          >
            Open filter sidebar
            <Image
              src={ArrowIcon}
              alt="arrow icon"
              style={{ marginLeft: "12px" }}
              height={5.21}
              width={10.42}
            />
          </button>
        </div>
  
        {/* Main Content */}
        <div style={{ padding: "20px" }}>
          {/* Page Heading */}
          <h1
            style={{
              color: "#101828",
              fontWeight: "bold",
              fontSize: "30px",
              marginTop: "-25px",
              marginLeft: "15px",
            }}
          >
            Home Database
          </h1>
          
          {/* Search Bar and Action Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "17px",
            }}
          >
            {/* Search Bar */}
            <div style={{ flex: 1, maxWidth: "300px", marginLeft: "15px" }}>
              <SearchEntryBox />
            </div>
  
            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "16px", marginRight: "15px" }}>
              <IconTextButton
                icon={<Image src={TrashIcon} alt="trash icon" width="20" height="20" />}
                filled={false}
                text="Delete"
                border={false}
                height="44px"
                width="104px"
              />
              <IconTextButton
                icon={<Image src={UploadIcon} alt="upload icon" width="24" height="24" />}
                filled={false}
                text="Export to CSV"
                border={true}
                height="44px"
                width="159px"
              />
              <IconTextButton
                icon={<Image src={PlusIcon} alt="plus icon" width="14" height="14" />}
                filled={true}
                text="Add new exoneree file"
                border={false}
                height="44px"
                width="209px"
              />
            </div>
          </div>
  
          {/* Table */}
          <div style={{ height: "60vh", backgroundColor: "white", marginTop: "20px" }}>
            <Table
              dataSource={dataSource}
              columns={filteredColumns}
              scroll={{ x: "max-content" }}
              pagination={{ pageSize: 10 }}
              onRow={() => ({
                onClick: (event) => {
                  // Prevent row-level click handling
                  event.stopPropagation();
                },
              })}
            />
          </div>
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
            <ActionMenuComponent onClose={closeActionMenu} />
          </div>
        )}
      </div>
    );
}

export default HomePage;