import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'
import { ColumnType } from 'antd/es/table'
import { saveAs } from 'file-saver'
import NavBar from '../components/NavBar';
import IconTextButton from '../components/IconTextButton'
import UploadIcon from '../img/Upload.png'
import Image from 'next/image'

const Table = dynamic(() => import('antd').then(mod => mod.Table), { ssr: false })

interface LogEntry {
  id: number
  name: string
  role: string
  action: string
  object: string
  date: string
}

const columns = [
  { title: 'User Name', dataIndex: 'name', key: 'name', width: 180, fixed: 'left' },
  { title: 'User Role', dataIndex: 'role', key: 'role', width: 180 },
  { title: 'Action', dataIndex: 'action', key: 'action', width: 180 },
  { title: 'Object', dataIndex: 'object', key: 'object', width: 180 },
  { title: 'Date', dataIndex: 'date', key: 'date', width: 180 }
]

const ActionLog: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [selectedColumns, setSelectedColumns] = useState<string[]>(columns.map(col => col.key))
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) {
      router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`)
    }
  }, [isLoaded, isSignedIn, router])

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs/log')
      const json = await res.json()
      console.log(json)
      if (res.ok && Array.isArray(json)) {
        setLogs(
          json.map((log: any) => ({
            id: log.id,
            name: log.name || 'N/A',
            role: log.role || 'N/A',
            action: log.action || 'N/A',
            object: log.object || 'N/A',
            date: new Date(log.date).toLocaleString()
          }))
        )
      } else {
        console.error('Invalid response:', json)
      }
    } catch (err) {
      console.error('Failed to fetch logs:', err)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const handleExportToCSV = async () => {
    try {

      const dataToExport = logs

      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedColumns, data: dataToExport })
      })

      if (res.ok) {
        const blob = await res.blob()
        saveAs(blob, 'action_logs.csv')
      } else {
        console.error('Export failed:', res.statusText)
      }
    } catch (err) {
      console.error('Export error:', err)
    }
  }

  const filteredColumns = columns
    .filter(col => selectedColumns.includes(col.key))
    .map(col => ({
      ...col,
      sorter: (a: any, b: any) => {
        const valA = a[col.dataIndex]
        const valB = b[col.dataIndex]
        if (valA == null) return -1
        if (valB == null) return 1
        if (
          typeof valA === 'string' &&
          typeof valB === 'string' &&
          !isNaN(Date.parse(valA)) &&
          !isNaN(Date.parse(valB))
        ) {
          return new Date(valA).getTime() - new Date(valB).getTime()
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
          return valA - valB
        }
        return String(valA).localeCompare(String(valB))
      },
      sortDirections: ['ascend', 'descend']
    })) as ColumnType<LogEntry>[]

  return (
    <div className="flex h-screen">
    <div>
      <NavBar />
    </div>
    <div className="flex-1">
    <div
      style={{
        height: '100vh',
        backgroundColor: 'white',
        width: '100vw',
        paddingLeft: '60px',
        overflow: 'hidden',
        paddingBottom: '20px'
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
      
      {/* Main Content */}
      <div style={{ padding: '30px', paddingTop: '0px' }}>
          
          <div className="flex justify-between items-center mb-4"
            style={{
              marginTop: '17px'
            }}
          >
            <h1 className="text-2xl font-semibold text-[#101828]">Action Log</h1>
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
          </div>

          <Table
            dataSource={logs}
            columns={filteredColumns}
            rowKey="id"
            pagination={false}
            scroll={{ x: 'max-content' }}
            bordered
          />
      </div>


    </div>

    </div>
  </div>
  )
}

export default ActionLog
