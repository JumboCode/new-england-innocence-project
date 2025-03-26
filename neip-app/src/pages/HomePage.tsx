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
import AddOfficerModal from '@/components/AddOfficerModal' 
import { FaFilter } from 'react-icons/fa'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { MdFilterList } from 'react-icons/md'
import ActionMenuComponent from '@/components/ActionMenuComponent'
import SelectColumnsModal from '@/components/SelectColumnsModal'
import TableFilterIcons from '@/components/TableFilterIcons'
import OpenFilterSidebar from '../components/OpenFilterSidebar'
import { saveAs } from 'file-saver'

// Define the data structure type with an index signature
interface TableRowData {
  [key: string]: string | number | undefined
  id?: number
  key: string
  name: string
  dob: string
  gender: string
  race: string
  ethnicity: string
  phoneNumber: string
  address: string
  email: string
  caseNumber: string
  jurisdiction: string
  exonerationNumber: string
  yearsInPrison: string
  arrestDate: string
  convictionDate: string
  freedomDate: string
  exonerationDate: string
  sentence: string
  originalCharges: string
  convictionMethod: string
  exonerationMethod: string
  legalRepresentation: string
  prosecutor: string
  judge: string
  officersInvolved: string
  falseConfession: string
  eyewitnessMisidentification: string
  inadequateLegalDefense: string
  policeMisconduct: string
  prosecutorialMisconduct: string
  forensicEvidence: string
  informantTestimony: string
  otherInfo: string
  compensation: string
  reentrySupport: string
  publicApology: string
  currentStatus: string
  mediaCoverage: string
  advocacyInvolvement: string
  educationalBackground: string
  healthInfo: string
  dataSource: string
  lastUpdated: string
  createdAt: string
}

// Dynamic import for the Ant Design Table component
const Table = dynamic(() => import('antd').then(mod => mod.Table), {
  ssr: false
})

// Table columns configuration
const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 120 },
  { title: 'DOB', dataIndex: 'dob', key: 'dob', width: 120 },
  { title: 'Race', dataIndex: 'race', key: 'race', width: 120 },
  { title: 'Ethnicity', dataIndex: 'ethnicity', key: 'ethnicity', width: 120 },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: 120
  },
  { title: 'Address', dataIndex: 'address', key: 'address', width: 220 },
  { title: 'Email', dataIndex: 'email', key: 'email', width: 120 },
  {
    title: 'Case Number',
    dataIndex: 'caseNumber',
    key: 'caseNumber',
    width: 120
  },
  { title: 'Crime Type', dataIndex: 'crimeType', key: 'crimeType', width: 120 },
  { title: 'Gender', dataIndex: 'gender', key: 'gender', width: 120 },
  {
    title: 'Jurisdiction',
    dataIndex: 'jurisdiction',
    key: 'jurisdiction',
    width: 120
  },
  {
    title: 'Exoneration Number',
    dataIndex: 'exonerationNumber',
    key: 'exonerationNumber',
    width: 120
  },
  {
    title: 'Years In Prison',
    dataIndex: 'yearsInPrison',
    key: 'yearsInPrison',
    width: 120
  },
  {
    title: 'Arrest Date',
    dataIndex: 'arrestDate',
    key: 'arrestDate',
    width: 120
  },
  {
    title: 'Conviction Date',
    dataIndex: 'convictionDate',
    key: 'convictionDate',
    width: 120
  },
  {
    title: 'Freedom Date',
    dataIndex: 'freedomDate',
    key: 'freedomDate',
    width: 120
  },
  {
    title: 'Exoneration Date',
    dataIndex: 'exonerationDate',
    key: 'exonerationDate',
    width: 120
  },
  { title: 'Sentence', dataIndex: 'sentence', key: 'sentence', width: 120 },
  {
    title: 'Original Charges',
    dataIndex: 'originalCharges',
    key: 'originalCharges',
    width: 120
  },
  {
    title: 'Conviction Method',
    dataIndex: 'convictionMethod',
    key: 'convictionMethod',
    width: 120
  },
  {
    title: 'Exoneration Method',
    dataIndex: 'exonerationMethod',
    key: 'exonerationMethod',
    width: 120
  },
  {
    title: 'Legal Representation',
    dataIndex: 'legalRepresentation',
    key: 'legalRepresentation',
    width: 180
  },
  {
    title: 'Prosecutor',
    dataIndex: 'prosecutor',
    key: 'prosecutor',
    width: 120
  },
  { title: 'Judge', dataIndex: 'judge', key: 'judge', width: 120 },
  {
    title: 'Officers Involved',
    dataIndex: 'officersInvolved',
    key: 'officersInvolved',
    width: 120
  },
  {
    title: 'False Confession',
    dataIndex: 'falseConfession',
    key: 'falseConfession',
    width: 120
  },
  {
    title: 'Eyewitness Misidentification',
    dataIndex: 'eyewitnessMisidentification',
    key: 'eyewitnessMisidentification',
    width: 180
  },
  {
    title: 'Inadequate Legal Defense',
    dataIndex: 'inadequateLegalDefense',
    key: 'inadequateLegalDefense',
    width: 180
  },
  {
    title: 'Police Misconduct',
    dataIndex: 'policeMisconduct',
    key: 'policeMisconduct',
    width: 120
  },
  {
    title: 'Prosecutorial Misconduct',
    dataIndex: 'prosecutorialMisconduct',
    key: 'prosecutorialMisconduct',
    width: 120
  },
  {
    title: 'Forensic Evidence',
    dataIndex: 'forensicEvidence',
    key: 'forensicEvidence',
    width: 120
  },
  {
    title: 'Informant Testimony',
    dataIndex: 'informantTestimony',
    key: 'informantTestimony',
    width: 120
  },
  {
    title: 'Other Info',
    dataIndex: 'otherInfo',
    key: 'otherInfo',
    width: 240
  },
  {
    title: 'Compensation',
    dataIndex: 'compensation',
    key: 'compensation',
    width: 150
  },
  {
    title: 'Reentry Support',
    dataIndex: 'reentrySupport',
    key: 'reentrySupport',
    width: 120
  },
  {
    title: 'Public Apology',
    dataIndex: 'publicApology',
    key: 'publicApology',
    width: 120
  },
  {
    title: 'Current Status',
    dataIndex: 'currentStatus',
    key: 'currentStatus',
    width: 120
  },
  {
    title: 'Media Coverage',
    dataIndex: 'mediaCoverage',
    key: 'mediaCoverage',
    width: 120
  },
  {
    title: 'Advocacy Involvement',
    dataIndex: 'advocacyInvolvement',
    key: 'advocacyInvolvement',
    width: 120
  },
  {
    title: 'Educational Background',
    dataIndex: 'educationalBackground',
    key: 'educationalBackground',
    width: 120
  },
  {
    title: 'Health Info',
    dataIndex: 'healthInfo',
    key: 'healthInfo',
    width: 120
  },
  {
    title: 'Data Source',
    dataIndex: 'dataSource',
    key: 'dataSource',
    width: 120
  },
  {
    title: 'Last Updated',
    dataIndex: 'lastUpdated',
    key: 'lastUpdated',
    width: 120
  },
  { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', width: 120 }
]

const HomePage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [officerModalOpen, setOfficerModalOpen] = useState(false) 
  const [columnsModalOpen, setColumnsModalOpen] = useState(false)
  const [exonerees, setExonerees] = useState<any[]>([])
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  // Initialize selectedColumns with all column keys
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.map(col => col.key)
  )

  
  // Helper function to refresh data from the API
  const refreshExonerees = async () => {
    try {
      const response = await fetch('/api/exonerees/getAllExonerees')
      if (!response.ok) {
        throw new Error(`Failed to fetch exonerees: ${response.statusText}`)
      }

      const jsonResponse = await response.json()
      console.log(jsonResponse.data)
      if (!jsonResponse.data || !Array.isArray(jsonResponse.data)) {
        console.error('🚨 Invalid response format', jsonResponse)
        return
      }

      // Helper functions for formatting
      const handleEmptyString = (value: any) =>
        value === '' || value === null || value === undefined ? 'N/A' : value
      const handleArray = (arr: any[]) => {
        if (!arr || !Array.isArray(arr) || arr.length === 0) return 'N/A'
        const filteredArray = arr.filter((item: string) => item.trim() !== '')
        return filteredArray.length ? filteredArray.join(', ') : 'N/A'
      }
      const handleBoolean = (value: boolean | null | undefined) =>
        value === true ? 'True' : value === false ? 'False' : 'N/A'

      const formattedData = jsonResponse.data.map(
        (item: any, index: number) => ({
          id: item.id, // ensure we have the id
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
          exonerationNumber: item.caseInfo?.exonerationNumber
            ? item.caseInfo.exonerationNumber.toString()
            : 'N/A',
          yearsInPrison: item.caseInfo?.yearsInPrison
            ? item.caseInfo.yearsInPrison.toString()
            : 'N/A',
          arrestDate: handleEmptyString(item.caseInfo?.arrestDate),
          convictionDate: handleEmptyString(item.caseInfo?.convictionDate),
          freedomDate: handleEmptyString(item.caseInfo?.freedomDate),
          exonerationDate: handleEmptyString(item.caseInfo?.exonerationDate),
          crimeType: handleEmptyString(item.caseInfo?.crimeType),
          sentence: handleEmptyString(item.caseInfo?.sentence),
          originalCharges: handleArray(item.legalInfo?.originalCharges),
          convictionMethod: handleArray(item.legalInfo?.convictionMethod),
          exonerationMethod: handleEmptyString(
            item.legalInfo?.exonerationMethod
          ),
          legalRepresentation: handleEmptyString(
            item.legalInfo?.legalRepresentation
          ),
          prosecutor: handleEmptyString(item.legalInfo?.prosecutor),
          judge: handleEmptyString(item.legalInfo?.judge),
          officersInvolved: handleArray(item.legalInfo?.officersInvolved),
          falseConfession: handleBoolean(
            item.wrongfulConvictionInfo?.falseConfession
          ),
          eyewitnessMisidentification: handleBoolean(
            item.wrongfulConvictionInfo?.eyewitnessMisidentification
          ),
          inadequateLegalDefense: handleBoolean(
            item.wrongfulConvictionInfo?.inadequateLegalDefense
          ),
          policeMisconduct: handleBoolean(
            item.wrongfulConvictionInfo?.policeMisconduct
          ),
          prosecutorialMisconduct: handleBoolean(
            item.wrongfulConvictionInfo?.prosecutorialMisconduct
          ),
          forensicEvidence: handleBoolean(
            item.wrongfulConvictionInfo?.forensicEvidence
          ),
          informantTestimony: handleBoolean(
            item.wrongfulConvictionInfo?.informantTestimony
          ),
          otherInfo: handleEmptyString(item.wrongfulConvictionInfo?.otherInfo),
          compensation: item.postExonerationInfo?.compensationAmount
            ? `${item.postExonerationInfo.compensationAmount.toLocaleString()}`
            : 'N/A',
          reentrySupport: handleArray(item.postExonerationInfo?.reentrySupport),
          publicApology: handleBoolean(item.postExonerationInfo?.publicApology),
          currentStatus: handleEmptyString(
            item.postExonerationInfo?.occupation
          ),
          mediaCoverage: handleEmptyString(item.metaData?.mediaCoverage),
          advocacyInvolvement: handleEmptyString(
            item.metaData?.advocacyInvolvement
          ),
          educationalBackground: handleEmptyString(
            item.metaData?.educationalBackground
          ),
          healthInfo: handleEmptyString(item.metaData?.healthInfo),
          dataSource: handleEmptyString(item.metaData?.dataSource),
          lastUpdated: handleEmptyString(item.metaData?.lastUpdated),
          createdAt: handleEmptyString(item.metaData?.createdAt)
        })
      )

      setExonerees(formattedData)
    } catch (error) {
      console.error('🚨 Error fetching exonerees:', error)
    }
  }
  useEffect(() => {
    refreshExonerees()
  }, [])

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  const handleColumnsModalOpen = () => setColumnsModalOpen(true)
  const handleColumnsModalClose = () => setColumnsModalOpen(false)

  const handleColumnSelectionChange = (newSelectedColumns: string[]) => {
    setSelectedColumns(newSelectedColumns)
  }

  const [selectedFilters, setSelectedFilters] = useState([
    { name: 'Gender', operator: '', value: 'Male' },
    { name: 'Years in Prison', operator: '>', value: '10' },
    { name: 'Arrest Date', operator: 'before', value: '10/10/2023' }
  ])

  const handleRemoveFilter = (index: number) => {
    setSelectedFilters(prevFilters => prevFilters.filter((_, i) => i !== index))
  }
  const [actionMenuVisible, setActionMenuVisible] = useState(false)
  const [actionMenuPosition, setActionMenuPosition] = useState({ x: 0, y: 0 })
  const [filteredExonereeIDs, setFilteredExonereeIDs] = useState<
    number[] | null
  >(null)
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

  const [selectedExonereeId, setSelectedExonereeId] = useState<number | null>(
    null
  )

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

  const displayedExonerees =
    filteredExonereeIDs === null
      ? exonerees
      : exonerees.filter(exoneree =>
          filteredExonereeIDs.includes(exoneree.id as number)
        )

  const handleExportToCSV = async () => {
    try {
      const rowsToExport = selectedRows.length
        ? displayedExonerees.filter(row => selectedRows.includes(row.id!))
        : displayedExonerees

      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedColumns, data: rowsToExport })
      })

      if (response.ok) {
        const blob = await response.blob()
        saveAs(blob, 'exonerees.csv')
      } else {
        console.error('Export failed:', response.statusText)
      }
    } catch (error) {
      console.error('Error exporting data:', error)
    }
  }

  const handleDeleteSelectedRows = async () => {
    try {
      if (selectedRows.length === 0) {
        alert('No rows selected.')
        return
      }

      const response = await fetch('/api/exonerees/batch-delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: selectedRows })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete rows')
      }

      setSelectedRows([])
      refreshExonerees()
      alert('Selected rows deleted successfully.')
    } catch (error) {
      console.error('Error deleting selected rows:', error)
      alert(
        `Error deleting selected rows: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }

  const noop: () => void = () => {}

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
      <div
        style={{
          backgroundColor: '#033550',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          height: '56px'
        }}
      >
        <img
          src='/caseview_logo2.png'
          alt='Logo'
          style={{
            height: '35px',
            marginLeft: '17px',
            backgroundColor: 'white'
          }}
        />
      </div>

      {/* Render the OpenFiterSideBar if it's visible*/}
      {isSidebarOpen && (
        <OpenFilterSidebar
          onClose={closeFilterSidebar}
          onApplyFilters={(ids: number[]) => {
            setFilteredExonereeIDs(ids)
            closeFilterSidebar()
          }}
        />
      )}

      {/* Render the OpenFilterSideBar if it's visible*/}
      {isSidebarOpen && (
        <OpenFilterSidebar
          onClose={closeFilterSidebar}
          onApplyFilters={(ids: number[]) => {
            setFilteredExonereeIDs(ids)
            closeFilterSidebar()
          }}
        />
      )}

      {/* Open Filter Sidebar Button - Top Right */}
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'flex-end'
          // width: '500px'
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
            display: 'flex',
            alignItems: 'center',
            fontSize: '11px',
            font: 'Inter',
            fontWeight: '500'
          }}
        >
          Open filter sidebar
          <Image
            src={ArrowIcon}
            alt='arrow icon'
            style={{ marginLeft: '12px' }}
            height='5.21'
            width='10.42'
          />
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '30px' }}>
        {/* "Home Database" Heading */}
        <h1
          style={{
            color: '#101828',
            fontWeight: 'bold',
            fontSize: '30px',
            marginTop: '-65px',
            marginLeft: '10px'
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
            marginTop: '17px',
            marginLeft: '-5px'
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
                />
              }
              filled={false}
              text='Delete Selected'
              border={false}
              height='44px'
              width='160px'
              onClick={handleDeleteSelectedRows}
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
              onClick={() => setOfficerModalOpen(true)}
              icon={<Image src={PlusIcon} alt='plus icon' width='14' height='14' />}
              filled={true}
              text='Add officer'
              border={true}
              height='44px'
              width='150px'
              color="#D5D7DA"
            />
            <IconTextButton
              onClick={handleOpenModal}
              icon={
                <Image src={PlusIcon} alt='plus icon' width='14' height='14' />
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
            <FaFilter
              style={{ width: '16px', height: '16px', marginTop: '10px' }}
            />
            {selectedFilters.map((filter, index) => (
              <TableFilterIcons
                key={index}
                icon={
                  <AiOutlineClose
                    style={{ width: '16px', height: '16px', color: 'black' }}
                    onClick={() => handleRemoveFilter(index)}
                  />
                }
                filled={true}
                text={`${filter.name}: ${filter.operator} ${filter.value}`}
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
        <Table
          dataSource={displayedExonerees}
          columns={filteredColumns}
          scroll={{ x: 'max-content', y: 390 }}
        />
      </div>
      <div>
        <style jsx global>{`
          .ant-table-thead > tr > th {
            padding: 15px 15px !important;
            line-height: 1.4 !important;
            vertical-align: middle !important;
            white-space: normal !important;
            min-width: 120px !important;
            word-break: break-word;
          }
          .ant-table-thead > tr > th > div {
            min-width: 120px !important;
          }
        `}</style>

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
              exonereeId={selectedExonereeId!}
              selectedExoneree={selectedCell?.record}
              onSuccess={refreshExonerees}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <AddExonereeModal
        open={modalOpen}
        handleClose={handleCloseModal}
        onSuccess={refreshExonerees}
      />
      <AddOfficerModal
        open={officerModalOpen}
        handleClose={() => setOfficerModalOpen(false)}
        onSuccess={() => {
          setOfficerModalOpen(false)
          alert('Officer added successfully!')
        }}
      /> 
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
