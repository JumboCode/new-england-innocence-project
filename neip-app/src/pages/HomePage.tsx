import React, { useState, useEffect } from 'react'
import IconTextButton from '../components/IconTextButton'
import SearchEntryBox from '../components/SearchEntryBox'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import TrashIcon from '../img/trash-01.png'
import UploadIcon from '../img/Upload.png'
import PlusIcon from '../img/plus.png'
import ArrowIcon from '../img/arrow_icon.png'
import AddExonereeModal from '@/components/AddExonereeModal'
import { FaFilter } from 'react-icons/fa'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { MdFilterList } from 'react-icons/md'
import { CgLogOut } from "react-icons/cg";
import ActionMenuComponent from '@/components/ActionMenuComponent'
import SelectColumnsModal from '@/components/SelectColumnsModal'
import TableFilterIcons from '@/components/TableFilterIcons'
import OpenFilterSidebar from '../components/OpenFilterSidebar'
import { saveAs } from 'file-saver';

// TODO: This is a bandaid solution for Vercel deployment.
// In the future we will want to dynamically determine columns based off this
// Define the data structure type with an index signature
interface TableRowData {
  [key: string]: string | number | undefined;
  key: string;
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
  exonerationNumber: string;
  yearsInPrison: string;
  arrestDate: string;
  convictionDate: string;
  freedomDate: string;
  exonerationDate: string;
  sentence: string;
  originalCharges: string;
  convictionMethod: string;
  exonerationMethod: string;
  legalRepresentation: string;
  prosecutor: string;
  judge: string;
  officersInvolved: string;
  falseConfession: string;
  eyewitnessMisidentification: string;
  inadequateLegalDefense: string;
  policeMisconduct: string;
  prosecutorialMisconduct: string;
  forensicEvidence: string;
  informantTestimony: string;
  otherInfo: string;
  compensation: string;
  reentrySupport: string;
  publicApology: string;
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
const Table = dynamic(() => import('antd').then(mod => mod.Table), {
  ssr: false
})

// Table columns configuration
const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'DOB', dataIndex: 'dob', key: 'dob' },
  { title: 'Race', dataIndex: 'race', key: 'race' },
  { title: 'Ethnicity', dataIndex: 'ethnicity', key: 'ethnicity' },
  { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Case Number', dataIndex: 'caseNumber', key: 'caseNumber' },
  { title: 'Crime Type', dataIndex: 'crimeType', key: 'crimeType' },
  { title: 'Gender', dataIndex: 'gender', key: 'gender' },
  { title: 'Jurisdiction', dataIndex: 'jurisdiction', key: 'jurisdiction' },
  { title: 'Exoneration Number', dataIndex: "exonerationNumber", key: 'exonerationNumber' },
  {
    title: 'Years In Prison',
    dataIndex: 'yearsInPrison',
    key: 'yearsInPrison'
  },
  { title: 'Arrest Date', dataIndex: 'arrestDate', key: 'arrestDate' },
  {
    title: 'Conviction Date',
    dataIndex: 'convictionDate',
    key: 'convictionDate'
  },
  { title: 'Freedom Date', dataIndex: 'freedomDate', key: 'freedomDate' },
  {
    title: 'Exoneration Date',
    dataIndex: 'exonerationDate',
    key: 'exonerationDate'
  },
  { title: 'Sentence', dataIndex: 'sentence', key: 'sentence' },
  {
    title: 'Original Charges',
    dataIndex: 'originalCharges',
    key: 'originalCharges'
  },
  {
    title: 'Conviction Method',
    dataIndex: 'convictionMethod',
    key: 'convictionMethod'
  },
  {
    title: 'Exoneration Method',
    dataIndex: 'exonerationMethod',
    key: 'exonerationMethod'
  },
  {
    title: 'Legal Representation',
    dataIndex: 'legalRepresentation',
    key: 'legalRepresentation'
  },
  { title: 'Prosecutor', dataIndex: 'prosecutor', key: 'prosecutor' },
  { title: 'Judge', dataIndex: 'judge', key: 'judge' },
  {
    title: 'Officers Involved',
    dataIndex: 'officersInvolved',
    key: 'officersInvolved'
  },
  {
    title: 'False Confession',
    dataIndex: 'falseConfession',
    key: 'falseConfession'
  },
  {
    title: 'Eyewitness Misidentification',
    dataIndex: 'eyewitnessMisidentification',
    key: 'eyewitnessMisidentification'
  },
  {
    title: 'Inadequate Legal Defense',
    dataIndex: 'inadequateLegalDefense',
    key: 'inadequateLegalDefense'
  },
  {
    title: 'Police Misconduct',
    dataIndex: 'policeMisconduct',
    key: 'policeMisconduct'
  },
  {
    title: 'Prosecutorial Misconduct',
    dataIndex: 'prosecutorialMisconduct',
    key: 'prosecutorialMisconduct'
  },
  {
    title: 'Forensic Evidence',
    dataIndex: 'forensicEvidence',
    key: 'forensicEvidence'
  },
  {
    title: 'Informant Testimony',
    dataIndex: 'informantTestimony',
    key: 'informantTestimony'
  },
  {
    title: 'Other Info',
    dataIndex: 'otherInfo',
    key: 'otherInfo'
  },
  { title: 'Compensation', dataIndex: 'compensation', key: 'compensation' },
  {
    title: 'Reentry Support',
    dataIndex: 'reentrySupport',
    key: 'reentrySupport'
  },
  { title: 'Public Apology', dataIndex: 'publicApology', key: 'publicApology' },
  { title: 'Current Status', dataIndex: 'currentStatus', key: 'currentStatus' },
  { title: 'Media Coverage', dataIndex: 'mediaCoverage', key: 'mediaCoverage' },
  {
    title: 'Advocacy Involvement',
    dataIndex: 'advocacyInvolvement',
    key: 'advocacyInvolvement'
  },
  {
    title: 'Educational Background',
    dataIndex: 'educationalBackground',
    key: 'educationalBackground'
  },
  { title: 'Health Info', dataIndex: 'healthInfo', key: 'healthInfo' },
  { title: 'Data Source', dataIndex: 'dataSource', key: 'dataSource' },
  { title: 'Last Updated', dataIndex: 'lastUpdated', key: 'lastUpdated' },
  { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' }
]

const HomePage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [columnsModalOpen, setColumnsModalOpen] = useState(false)
  const [exonerees, setExonerees] = useState<any[]>([]) 

  // Initialize selectedColumns with all column keys
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.map(col => col.key)
  )

  useEffect(() => {
    const fetchExonerees = async () => {
        try {
            const response = await fetch('/api/exonerees/getAllExonerees');
            if (!response.ok) {
                throw new Error(`Failed to fetch exonerees: ${response.statusText}`);
            }

            const jsonResponse = await response.json();
            console.log("✅ API Response Data:", jsonResponse);

            if (!jsonResponse.data || !Array.isArray(jsonResponse.data)) {
                console.error("🚨 Invalid response format", jsonResponse);
                return;
            }

            const handleEmptyString = (value: any) => {
                return value === "" || value === null || value === undefined ? "N/A" : value;
            };

            const handleArray = (arr: any[]) => {
                if (!arr || !Array.isArray(arr) || arr.length === 0) return "N/A";
                const filteredArray = arr.filter(item => item.trim() !== ""); 
                return filteredArray.length ? filteredArray.join(", ") : "N/A";
            };

            const handleBoolean = (value: boolean | null | undefined) => {
                return value === true ? "True" : value === false ? "False" : "N/A";
            };

            const formattedData = jsonResponse.data.map((item: any, index: number) => ({
                key: item.id || index.toString(),
                name: handleEmptyString(item.personalInfo?.name),
                dob: handleEmptyString(item.personalInfo?.dateOfBirth),  
                gender: handleEmptyString(item.personalInfo?.gender),
                race: handleEmptyString(item.personalInfo?.race),
                ethnicity: handleEmptyString(item.personalInfo?.ethnicity),
                phoneNumber: handleEmptyString(item.personalInfo?.phoneNumber),
                address: handleEmptyString(item.personalInfo?.address),
                email: handleEmptyString(item.personalInfo?.email),
                caseNumber: handleEmptyString(item.caseInfo?.caseNumber),
                jurisdiction: handleEmptyString(item.caseInfo?.jurisdiction),
                exonerationNumber: item.caseInfo?.exonerationNumber ? item.caseInfo.exonerationNumber.toString() : "N/A",
                yearsInPrison: item.caseInfo?.yearsInPrison ? item.caseInfo.yearsInPrison.toString() : "N/A",
                arrestDate: handleEmptyString(item.caseInfo?.arrestDate),
                convictionDate: handleEmptyString(item.caseInfo?.convictionDate),
                freedomDate: handleEmptyString(item.caseInfo?.freedomDate),
                exonerationDate: handleEmptyString(item.caseInfo?.exonerationDate),
                crimeType: handleEmptyString(item.caseInfo?.crimeType),
                sentence: handleEmptyString(item.caseInfo?.sentence),
                originalCharges: handleArray(item.legalInfo?.originalCharges),
                convictionMethod: handleArray(item.legalInfo?.convictionMethod),
                exonerationMethod: handleEmptyString(item.legalInfo?.exonerationMethod),
                legalRepresentation: handleEmptyString(item.legalInfo?.legalRepresentation),
                prosecutor: handleEmptyString(item.legalInfo?.prosecutor),
                judge: handleEmptyString(item.legalInfo?.judge),
                officersInvolved: handleArray(item.legalInfo?.officersInvolved),
                falseConfession: handleBoolean(item.wrongfulConvictionInfo?.falseConfession),
                eyewitnessMisidentification: handleBoolean(item.wrongfulConvictionInfo?.eyewitnessMisidentification),
                inadequateLegalDefense: handleBoolean(item.wrongfulConvictionInfo?.inadequateLegalDefense),
                policeMisconduct: handleBoolean(item.wrongfulConvictionInfo?.policeMisconduct),
                prosecutorialMisconduct: handleBoolean(item.wrongfulConvictionInfo?.prosecutorialMisconduct),
                forensicEvidence: handleBoolean(item.wrongfulConvictionInfo?.forensicEvidence),
                informantTestimony: handleBoolean(item.wrongfulConvictionInfo?.informantTestimony),
                otherInfo: handleEmptyString(item.wrongfulConvictionInfo?.otherInfo),
                compensation: item.postExonerationInfo?.compensationAmount ? `$${item.postExonerationInfo.compensationAmount.toLocaleString()}` : "N/A",
                reentrySupport: handleArray(item.postExonerationInfo?.reentrySupport),
                publicApology: handleBoolean(item.postExonerationInfo?.publicApology),
                currentStatus: handleEmptyString(item.postExonerationInfo?.occupation),
                mediaCoverage: handleEmptyString(item.metaData?.mediaCoverage),
                advocacyInvolvement: handleEmptyString(item.metaData?.advocacyInvolvement),
                educationalBackground: handleEmptyString(item.metaData?.educationalBackground),
                healthInfo: handleEmptyString(item.metaData?.healthInfo),
                dataSource: handleEmptyString(item.metaData?.dataSource),
                lastUpdated: handleEmptyString(item.metaData?.lastUpdated),
                createdAt: handleEmptyString(item.metaData?.createdAt),
            }));

            console.log("✅ Formatted Exonerees Data:", formattedData);
            setExonerees(formattedData);
        } catch (error) {
            console.error('🚨 Error fetching exonerees:', error);
        }
    };

    fetchExonerees();
}, []);

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  const handleColumnsModalOpen = () => setColumnsModalOpen(true)
  const handleColumnsModalClose = () => setColumnsModalOpen(false)

  const handleColumnSelectionChange = (newSelectedColumns: string[]) => {
    setSelectedColumns(newSelectedColumns)
  }

  const [selectedFilters] = useState(['officer', 'Male', 'Test'])

  const [actionMenuVisible, setActionMenuVisible] = useState(false)
  const [actionMenuPosition, setActionMenuPosition] = useState({ x: 0, y: 0 })
  const [selectedCell, setSelectedCell] = useState<{
    record: TableRowData
    columnKey: string
  } | null>(null)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const filteredColumns = columns
    .filter(column => selectedColumns.includes(column.key))
    .map(column => ({
      ...column,
      onCell: (record: any) => ({
        onClick: (event: any) => handleCellClick(event, record, column.key)
      })
    }))

  const [selectedExonereeId, setSelectedExonereeId] = useState<number | null>(null);

  const handleCellClick = (
    event: React.MouseEvent<HTMLTableCellElement>,
    record: any,
    columnKey: string
  ) => {
    event.stopPropagation()

    const cellElement = event.currentTarget as HTMLTableCellElement
    const boundingRect = cellElement.getBoundingClientRect()

    if (
      selectedCell &&
      (selectedCell.record !== record || selectedCell.columnKey !== columnKey)
    ) {
      setActionMenuVisible(false)
      setTimeout(() => {
        setActionMenuPosition({ x: boundingRect.left, y: boundingRect.top })
        setSelectedCell({ record, columnKey })
        setActionMenuVisible(true)
        setSelectedExonereeId(record.id)
      }, 50)
    } else {
      setActionMenuPosition({ x: boundingRect.left, y: boundingRect.top })
      setSelectedCell({ record, columnKey })
      setActionMenuVisible(true)
      setSelectedExonereeId(record.id)
    }
  }

  const closeActionMenu = () => {
    setActionMenuVisible(false)
    setSelectedCell(null)
  }

  const closeFilterSidebar = () => {
    setIsSidebarOpen(false)
  }

  const openFilterSidebar = () => {
    setIsSidebarOpen(true)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`);
      }

      window.location.href = "/login"; // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleExportToCSV = async () => {
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedColumns, data: exonerees }),
      });
  
      if (response.ok) {
        const blob = await response.blob();
        saveAs(blob, 'exonerees.csv');  // Trigger file download
      } else {
        console.error('Export failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };  

  const noop: () => void = () => { };

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: 'white',
        width: '100vw',
        paddingLeft: '60px'
      }}
    >
      {/* Top Banner */}
      <div style={{ backgroundColor: '#033550', color: 'white', display: 'flex', alignItems: 'center', height: '56px' }}>
        <img src="/caseview_logo2.png" alt="Logo" style={{ height: '35px', marginLeft: '17px', backgroundColor: 'white' }} />
        <div style={{ marginLeft: "auto" }}>
          <IconTextButton
            icon={<CgLogOut size={20} />}
            filled={false}
            text="Logout"
            border={false}
            onClick={handleLogout}
            height="40px"
            width="100px"
          />
        </div>
      </div>

      {/* Render the OpenFiterSideBar if it's visible*/}
      {isSidebarOpen && <OpenFilterSidebar onClose={closeFilterSidebar} />}

      {/* Open Filter Sidebar Button - Top Right */}
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
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
            fontSize: '11px'
          }}
        >
          Open filter sidebar
          <Image
            src={ArrowIcon}
            alt='arrow icon'
            style={{ marginLeft: '12px' }}
            height='5.21'
            width='10.42'
          ></Image>
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '20px' }}>
        {/* "Home Database" Heading */}
        <h1
          style={{
            color: '#101828',
            fontWeight: 'bold',
            fontSize: '30px',
            marginTop: '-25px',
            marginLeft: '15px'
          }}
        >
          Home Database
        </h1>

        {/* Search Bar and Action Buttons Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '17px'
          }}
        >
          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: '300px', marginLeft: '15px' }}>
            <SearchEntryBox setExonerees={setExonerees} />
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '16px',
              marginRight: '15px'
            }}
          >
            <IconTextButton
              icon={
                <Image
                  src={TrashIcon}
                  alt='trash icon'
                  width='20'
                  height='20'
                ></Image>
              }
              filled={false}
              text='Delete'
              border={false}
              height='44px'
              width='104px'
            />
            <IconTextButton
              icon={
                  <Image
                  src={UploadIcon}
                  alt='upload icon'
                  width='24'
                  height='24'
                  />
              }
              filled={false}
              text='Export to CSV'
              border={true}
              height='44px'
              width='159px'
              onClick={handleExportToCSV}
            />
            <IconTextButton
              onClick={handleOpenModal}
              icon={
                <Image
                  src={PlusIcon}
                  alt='plus icon'
                  width='14'
                  height='14'
                ></Image>
              }
              filled={true}
              text='Add new exoneree file'
              border={false}
              height='44px'
              width='209px'
            />
          </div>
        </div>

        {/* Table Filter Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
            borderColor: '#E1E0E0',
            borderWidth: '1px',
            borderBottom: 'none'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginLeft: '20px',
              marginTop: '10px',
              marginBottom: '10px'
            }}
          >
            {/* <Image src={PlusIcon} alt="funnel" style={{ width: '16px', height: '16px', marginTop: '10px' }} ></Image>  */}
            <FaFilter
              style={{ width: '16px', height: '16px', marginTop: '10px' }}
            />
            {selectedFilters.map((filter, index) => (
              <TableFilterIcons
                key={index}
                icon={
                  <AiOutlineClose
                    style={{ width: '16px', height: '16px', color: 'black' }}
                  />
                }
                filled={true}
                text={filter}
                border={false}
                borderRadius={false}
                height='35px'
                onOpenFilter={noop}
              />
            ))}
            <TableFilterIcons
              icon={
                <AiOutlinePlus
                  style={{ width: '16px', height: '16px', color: 'black' }}
                />
              }
              filled={false}
              text='Filter'
              border={false}
              borderRadius={false}
              height='35px'
              width='120px'
              onOpenFilter={openFilterSidebar}
            />
          </div>
          <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
            <TableFilterIcons
              icon={
                <MdFilterList
                  style={{ width: '16px', height: '16px', color: 'black' }}
                />
              }
              filled={false}
              text='Manage Columns'
              border={true}
              borderRadius={true}
              height='35px'
              width='185px'
              onOpenFilter={handleColumnsModalOpen}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '0px',
            borderColor: '#E1E0E0',
            borderWidth: '1px',
            borderTop: 'none'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '4px',
              marginLeft: '20px',
              marginTop: '2px',
              marginBottom: '6px'
            }}
          >
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
            dataSource={exonerees} //so that search results update the table
            columns={filteredColumns}
            scroll={{ x: 'max-content' }}
          />
        </div>

        {/* Action Menu */}
        {actionMenuVisible && (
          <div
            style={{
              position: 'absolute',
              top: actionMenuPosition.y,
              left: actionMenuPosition.x,
              zIndex: 1000
            }}
          >
            <ActionMenuComponent 
              onClose={closeActionMenu}

              // unsure how to pass exonereeID
              exonereeId={selectedExonereeId!}
            />
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
  )
}

export default HomePage
