// //pages/HomePage.tsx

import React from 'react';
import IconTextButton from '../components/IconTextButton';
import SearchEntryBox from '../components/SearchEntryBox';
import TrashIcon from "../img/trash-01.png";
import Image from 'next/image';
import UploadIcon from "../img/Upload.png"
import PlusIcon from "../img/plus.png";
import ArrowIcon from "../img/arrow_icon.png";
import { CgTrash, CgExport, CgAdd, CgSearch, CgChevronLeft } from "react-icons/cg";
import dynamic from 'next/dynamic';

// import antd Table dynamically 
const Table = dynamic(() => import('antd').then(mod => mod.Table), { ssr: false });

// import logo from 'neip-app/public/caseview_logo2.png'; // Import the logo directly

const HomePage: React.FC = () => {
    // dummy data for table
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },  
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];
      
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

                {/* Placeholder for Database Display */}
                <div style={{ height: '60vh', backgroundColor: 'white' }}>
                    {/* Database Display */}
                    <Table dataSource={dataSource} columns={columns} />;
                </div>
            </div>
        </div>
    );
};

export default HomePage;
