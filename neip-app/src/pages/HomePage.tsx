// //pages/HomePage.tsx

import React, { useState } from 'react';
import IconTextButton from '../components/IconTextButton';
import SearchEntryBox from '../components/SearchEntryBox';
import TrashIcon from "../img/trash-01.png";
import Image from 'next/image';
import UploadIcon from "../img/Upload.png"
import PlusIcon from "../img/plus.png";
import ArrowIcon from "../img/arrow_icon.png";
import { CgTrash, CgExport, CgAdd, CgSearch, CgChevronLeft } from "react-icons/cg";
import dynamic from 'next/dynamic';
import AddExonereeModal from '@/components/AddExonereeModal';

// import antd Table dynamically 
const Table = dynamic(() => import('antd').then(mod => mod.Table), { ssr: false });

// import logo from 'neip-app/public/caseview_logo2.png'; // Import the logo directly

const HomePage: React.FC = () => {
    // dummy data for table

    const dataSource = [
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

      const [modalOpen, setModalOpen] = useState(false);
      const handleOpenModal = () => setModalOpen(true);
      const handleCloseModal = () => setModalOpen(false);

    return (
        <div style={{ height: '100vh', backgroundColor: 'white' }}>

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
                        <AddExonereeModal open={modalOpen} handleClose={handleCloseModal}/>
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
        </div>
    );
};



export default HomePage;
