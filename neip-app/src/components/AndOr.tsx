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
          className={`w-16 px-4 py-1 font-semibold border rounded-lg transition-all ${
            value === option
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-white text-black border-gray-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default AndOr
