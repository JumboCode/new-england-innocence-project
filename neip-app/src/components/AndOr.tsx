import React from 'react'

interface AndOrProps {
  value: 'AND' | 'OR'
  onChange: (value: 'AND' | 'OR') => void
}

const AndOr: React.FC<AndOrProps> = ({ value, onChange }) => {
  return (
    <div className='flex flex-col items-center space-y-1 mt-2'>
      {['AND', 'OR'].map(option => (
        <button
          key={option}
          onClick={() => onChange(option as 'AND' | 'OR')}
          className={`w-[52px] h-[28px] flex items-center justify-center text-[14px] font-[700] border rounded-lg transition-all text-[#3063C9] ${
            value === option
              ? 'bg-[#C6DEFF] shadow-md'
              : 'bg-white border-gray-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default AndOr
