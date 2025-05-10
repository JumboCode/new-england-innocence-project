import React, { useEffect, useState } from 'react'

interface FilterSelectionProps {
  onRemove: (id: number) => void
  // title now includes the internal field key (e.g., "gender")
  title: { id: number; label: string; field: string; type: string; options?: string[] }
  condition: string
  setCondition: (value: string) => void
  value: string | string[]
  setValue: (newValue: string) => void
} 

const dropdownOptionsMap: { [key: string]: string[] } = {
  gender: ['M', 'F', 'Other'],
  race: [
    'White',
    'Black',
    'Asian',
    'Hispanic or Latino',
    'American Indian or Alaska Native',
    'Native Hawaiian or Pacific Islander'
  ],
  ethnicity: [
    'American Indian/Alaska Native',
    'Asian',
    'Black',
    'Hispanic or Latino',
    'Middle Eastern or North African',
    'White/European'
  ],
  crimeType: ['Felony', 'Misdemeanor'],
  falseConfession: ['True', 'False'],
  eyewitnessMisidentification: ['True', 'False'],
  inadequateLegalDefense: ['True', 'False'],
  policeMisconduct: ['True', 'False'],
  prosecutorialMisconduct: ['True', 'False'],
  forensicEvidence: ['True', 'False'],
  reentrySupport: ['True', 'False'],
  publicApology: ['True', 'False'],
  currentStatus: [
    'Freed but still fighting',
    'Plea deal',
    'Exonerated',
    'Return to custody'
  ]
}

const FilterSelection: React.FC<FilterSelectionProps> = ({
  onRemove,
  title,
  condition,
  setCondition,
  value,
  setValue
}) => {
    const [dynamicOptions, setDynamicOptions] = useState<string[]>([])
    const isStaticDropdown = dropdownOptionsMap.hasOwnProperty(title.field)
    const isDynamicDropdown = title.field === 'originalCharges' || title.field === 'officersInvolved'
    const invalidConstraint = ['<', '<=', '>', '>='].includes(condition) && (title.type === 'string' || title.type === 'tag' || title.type === 'bool')

    
    // Fetch options dynamically
    useEffect(() => {
      const fetchOptions = async () => {
        let endpoint = ''
    
        if (title.field === 'originalCharges') {
          endpoint = '/api/tags/charge/getCharge'
        } else if (title.field === 'officersInvolved') {
          endpoint = '/api/officers/getAllOfficers'
        } else {
          return
        }
    
        try {
          const response = await fetch(endpoint)
          const data = await response.json()
          if (Array.isArray(data)) {
            setDynamicOptions(data)
          } else if (Array.isArray(data.tags)) {
            setDynamicOptions(data.tags)
          }
        } catch (err) {
          console.error('Failed to fetch dynamic dropdown options:', err)
        }
      }
    
      if (title.field === 'originalCharges' || title.field === 'officersInvolved') {
        fetchOptions()
      }
    }, [title.field])      
    
  return (
    <div className='flex flex-col p-2 bg-gray-100 border border-gray-300 rounded-lg w-full max-w-[350px] truncate'>
      <div className='flex items-center justify-between'>
        <span className='text-gray-700 font-medium min-w-[80px]'>
          {title.label || 'Untitled'}
        </span>
        <button
          onClick={() => onRemove(title.id)}
          className='text-red-500 hover:text-red-700'
        >
          ✕
        </button>
      </div>

      <div className='flex items-center space-x-2 mt-2'>
        <select
          className='border border-gray-400 rounded-md px-2 py-1 text-gray-900 text-sm'
          value={condition}
          onChange={e => setCondition(e.target.value)}
        >
          {['is', 'is not', '<', '<=', '>', '>='].map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {isStaticDropdown || isDynamicDropdown ? (
          <select
            className='border border-gray-500 rounded-md px-2 py-1 text-gray-900 text-sm max-w-[232px] truncate'
            value={value}
            onChange={e => {
                const val = e.target.value
                if (title.field === 'gender') {
                  setValue(val.toUpperCase())
                } else {
                  setValue(val)
                }
              }}
          >
            <option value='' disabled>
              Select...
            </option>
            {(isStaticDropdown 
              ? dropdownOptionsMap[title.field] 
              : [...dynamicOptions].sort((a, b) => a.localeCompare(b))
            ).map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type='text'
            className='border border-gray-500 rounded-md px-2 py-1 text-gray-900 text-sm w-[232px] truncate'
            placeholder='Enter value'
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        )}

        {value && (
          <button
            className='ml-auto text-gray-500 hover:text-red-500'
            onClick={() => setValue('')}
          >
            ✕
          </button>
        )}
      </div>

      {invalidConstraint && (
          <div className='text-red-600 text-sm mt-1'>
            This constraint is not valid for text-based fields.
          </div>
      )}
    </div>
  )
}

export default FilterSelection