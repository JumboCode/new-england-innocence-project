import React, { useState } from 'react'
import Image from 'next/image'
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import XlCoseIcon from '../img/close.png'
import AndOr from './AndOr'
import FilterSelection from './FilterSelection'

interface OpenFilterSidebarProps {
  onClose: () => void
  onApplyFilters: (filteredIDs: number[]) => void
}

interface Filter {
  id: number
  label: string
  field: string
  condition: string
  value: string
  type: string
  table: string
  options?: string[]
}

interface DataField {
  value: string
  label: string
  type: string
  table: string
  options?: string[]
}

const OpenFilterSidebar: React.FC<OpenFilterSidebarProps> = ({
  onClose,
  onApplyFilters
}) => {
  const [filters, setFilters] = useState<Filter[]>([])
  const [logic, setLogic] = useState<('AND' | 'OR')[]>([])
  const [selectedField, setSelectedField] = useState('')
  const [selectOpen, setSelectOpen] = useState(false)

  const dataFields: DataField[]  = [
    // PersonalInfo fields
    { value: 'name', label: 'Name', type: 'string', table: 'PersonalInfo' },
    {
      value: 'dob',
      label: 'Date of birth',
      type: 'date',
      table: 'PersonalInfo'
    },
    {
      value: 'gender',
      label: 'Gender',
      type: 'string',
      table: 'PersonalInfo',
      options: ['M', 'F', 'Other']
    },
    { value: 'race', label: 'Race', type: 'string', table: 'PersonalInfo' },
    {
      value: 'ethnicity',
      label: 'Ethnicity',
      type: 'string',
      table: 'PersonalInfo'
    },
    {
      value: 'phoneNumber',
      label: 'Phone number',
      type: 'string',
      table: 'PersonalInfo'
    },
    {
      value: 'address',
      label: 'Address',
      type: 'string',
      table: 'PersonalInfo'
    },
    { value: 'email', label: 'Email', type: 'string', table: 'PersonalInfo' },
    // CaseInfo fields
    {
      value: 'caseNumber',
      label: 'Case number',
      type: 'string',
      table: 'CaseInfo'
    },
    {
      value: 'jurisdiction',
      label: 'Jurisdiction',
      type: 'string',
      table: 'CaseInfo'
    },
    {
      value: 'exonerationNumber',
      label: 'Exoneration number',
      type: 'int',
      table: 'CaseInfo'
    },
    {
      value: 'yearsInPrison',
      label: 'Years in prison',
      type: 'int',
      table: 'CaseInfo'
    },
    {
      value: 'arrestDate',
      label: 'Arrest date',
      type: 'date',
      table: 'CaseInfo'
    },
    {
      value: 'freedomDate',
      label: 'Freedom date',
      type: 'date',
      table: 'CaseInfo'
    },
    {
      value: 'exonerationDate',
      label: 'Exoneration date',
      type: 'date',
      table: 'CaseInfo'
    },
    {
      value: 'crimeType',
      label: 'Crime type',
      type: 'string',
      table: 'CaseInfo'
    },
    { value: 'sentence', label: 'Sentence', type: 'int', table: 'CaseInfo' },
    // LegalInfo fields
    {
      value: 'originalCharges',
      label: 'Original charges',
      type: 'tag',
      table: 'LegalInfo'
    },
    {
      value: 'convictionMethod',
      label: 'Conviction method',
      type: 'string',
      table: 'LegalInfo'
    },
    {
      value: 'exonerationMethod',
      label: 'Exoneration method',
      type: 'string',
      table: 'LegalInfo'
    },
    {
      value: 'legalRepresentation',
      label: 'Legal representation',
      type: 'string',
      table: 'LegalInfo'
    },
    {
      value: 'prosecutor',
      label: 'Prosecutor',
      type: 'string',
      table: 'LegalInfo'
    },
    { value: 'judge', label: 'Judge', type: 'string', table: 'LegalInfo' },
    {
      value: 'officersInvolved',
      label: 'Officers involved',
      type: 'tag',
      table: 'LegalInfo'
    },
    // WrongfulConvictionInfo fields
    {
      value: 'falseConfession',
      label: 'False confession',
      type: 'bool',
      table: 'WrongfulConvictionInfo'
    },
    {
      value: 'eyewitnessMisidentification',
      label: 'Eyewitness misidentification',
      type: 'bool',
      table: 'WrongfulConvictionInfo'
    },
    {
      value: 'inadequateLegalDefense',
      label: 'Inadequate legal defense',
      type: 'bool',
      table: 'WrongfulConvictionInfo'
    },
    {
      value: 'policeMisconduct',
      label: 'Police misconduct',
      type: 'bool',
      table: 'WrongfulConvictionInfo'
    },
    {
      value: 'prosecutorialMisconduct',
      label: 'Prosecutorial misconduct',
      type: 'bool',
      table: 'WrongfulConvictionInfo'
    },
    {
      value: 'forensicEvidence',
      label: 'Forensic Evidence',
      type: 'bool',
      table: 'WrongfulConvictionInfo'
    },
    {
      value: 'informantTestimony',
      label: 'Informant testimony',
      type: 'bool',
      table: 'WrongfulConvictionInfo'
    },
    {
      value: 'otherInfo',
      label: 'Other info',
      type: 'string',
      table: 'WrongfulConvictionInfo'
    },
    // PostExonerationInfo fields
    {
      value: 'compensation',
      label: 'Compensation',
      type: 'int',
      table: 'PostExonerationInfo'
    },
    {
      value: 'reentrySupport',
      label: 'Reentry support',
      type: 'bool',
      table: 'PostExonerationInfo'
    },
    {
      value: 'publicApology',
      label: 'Public apology',
      type: 'bool',
      table: 'PostExonerationInfo'
    },
    {
      value: 'currentStatus',
      label: 'Current status',
      type: 'string',
      table: 'PostExonerationInfo'
    },
    // AdditionalInfo fields
    {
      value: 'mediaCoverage',
      label: 'Media coverage',
      type: 'string',
      table: 'AdditionalInfo'
    },
    {
      value: 'advocacyInvolvement',
      label: 'Advocacy involvement',
      type: 'string',
      table: 'AdditionalInfo'
    },
    {
      value: 'educationalBackground',
      label: 'Educational background',
      type: 'string',
      table: 'AdditionalInfo'
    },
    {
      value: 'healthInfo',
      label: 'Health info',
      type: 'string',
      table: 'AdditionalInfo'
    },
    // MetaData fields
    {
      value: 'dataSource',
      label: 'Data source',
      type: 'string',
      table: 'MetaData'
    },
    {
      value: 'lastUpdated',
      label: 'Last updated',
      type: 'date',
      table: 'MetaData'
    },
    { value: 'createdAt', label: 'Created at', type: 'date', table: 'MetaData' }
  ].map(field => ({ ...field }))

  // Adds a new filter based on the selected field value.
  const addFilter = (fieldValue: string) => {
    const fieldObject = dataFields.find(field => field.value === fieldValue)
    if (!fieldObject) return
    const newFilter: Filter = {
      id: Date.now(),
      field: fieldObject.value,
      label: fieldObject.label,
      condition: 'is', // default condition; adjust as needed
      value: '', // initialize with empty string
      type: fieldObject.type,
      table: fieldObject.table,
      options: fieldObject.options
    }
    setFilters(prev => [...prev, newFilter])
    if (filters.length > 0) {
      setLogic(prev => [...prev, 'AND'])
    }
    setSelectedField('')
  }

  const removeFilter = (id: number) => {
    const index = filters.findIndex(f => f.id === id)
    setFilters(filters.filter(f => f.id !== id))
    setLogic(logic.filter((_, i) => i !== index - 1))
  }

  const updateLogic = (index: number, value: 'AND' | 'OR') => {
    const newLogic = [...logic]
    newLogic[index] = value
    setLogic(newLogic)
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const fieldValue = event.target.value;
    setSelectedField(fieldValue);
    addFilter(fieldValue);
    setSelectOpen(false);
  };

  const applyFilters = async () => {
    const transformedFilters = filters.map(filter => ({
      type: filter.type,
      field: filter.field,
      table: filter.table,
      value: filter.value,
      constraint: filter.condition
    }))
    try {
      const response = await fetch('/api/filter/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operators: logic,
          filters: transformedFilters
        })
      })
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error applying filters:', errorData)
        return
      }
      const data = await response.json()
      console.log('Filter applied, result:', data)
      const filteredIDs = Array.isArray(data.exonereeIDs)
        ? data.exonereeIDs.flat()
        : []
      onApplyFilters(filteredIDs)
    } catch (error) {
      console.error('Error applying filters:', error)
    }
  }

  return (
    <div className='fixed right-0 top-30 h-full w-96 bg-white shadow-lg flex flex-col z-50'>
      {/* Header */}
      <div className='bg-[#0F6A9A] text-white p-4 flex justify-between items-center'>
        <h2 className='text-lg font-semibold'>Add filters</h2>
        <button onClick={onClose} className='p-2'>
          <Image src={XlCoseIcon} alt='close' width={16} height={16} />
        </button>
      </div>

      {/* Filter Selection Section using MUI Select */}
      <div className='pt-0 pr-4 pb-4 pl-4 border-b border-gray-300 bg-[#0F6A9A]'>
        <FormControl fullWidth>
          <Select
            value={selectedField}
            open={selectOpen}
            onOpen={() => setSelectOpen(true)}
            onClose={() => setSelectOpen(false)}
            onChange={handleSelectChange}
            displayEmpty
            sx={{
              height: '30px',
              '& .MuiSelect-select': {
                padding: '4px 8px',
                color: '#B6B5B5',
                background: 'white'
              }
            }}
          >
            <MenuItem value='' disabled>
              Select a filter
            </MenuItem>
            {dataFields.map(field => (
              <MenuItem key={field.value} value={field.value}>
                {field.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Filters List */}
      <div className='flex-grow p-4 overflow-y-auto bg-[#e6e6e6]'>
        {filters.length === 0 ? (
          <div className='text-center text-gray-500'>
            <p>Please choose a filter above to refine your search.</p>
          </div>
        ) : (
          <div>
            <h3 className='font-bold mb-2 text-black-100'>Filters</h3>
            {filters.map((filter, index) => (
              <div
                key={filter.id}
                className='flex flex-col items-center space-y-2'
              >
                {index > 0 && (
                  <AndOr
                    value={logic[index - 1]}
                    onChange={value => updateLogic(index - 1, value)}
                  />
                )}
                <FilterSelection
                  title={filter}
                  condition={filter.condition}
                  setCondition={newCondition =>
                    setFilters(
                      filters.map(f =>
                        f.id === filter.id
                          ? { ...f, condition: newCondition }
                          : f
                      )
                    )
                  }
                  value={filter.value}
                  setValue={newValue =>
                    setFilters(
                      filters.map(f =>
                        f.id === filter.id ? { ...f, value: newValue } : f
                      )
                    )
                  }
                  onRemove={removeFilter}
                />
              </div>
            ))}
          </div>
        )}

        {/* "+ Filter" Button at the bottom opens the dropdown */}
        <div className='mt-4'>
          <button
            onClick={() => setSelectOpen(true)}
            className='bg-blue-500 text-black px-4 py-2 rounded-lg w-full'
            style={{ backgroundColor: '#C6DEFF', color: '#3063C9' }}
          >
            + Filter
          </button>
        </div>

        {/* "Apply filters" Button */}
        <div className='mt-4'>
          <button
            onClick={applyFilters}
            className='bg-green-500 text-white px-4 py-2 rounded-lg w-full'
            style={{ backgroundColor: '#44B4EF' }}
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default OpenFilterSidebar
