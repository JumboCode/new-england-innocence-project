// AddOfficerModal.tsx
import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LabelAndEntry from './LabelAndEntry'
import IconTextButton from './IconTextButton'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 1300
}

interface AddOfficerModalProps {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const AddOfficerModal: React.FC<AddOfficerModalProps> = ({
  open,
  handleClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    badgeNumber: '',
    mediaLink: '',
    notes: '',
    department: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        badgeNumber: formData.badgeNumber,
        mediaLink: formData.mediaLink,
        notes: formData.notes
      }

      const response = await fetch('/api/officers/addOfficer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add officer')
      }

      const result = await response.json()
      console.log('Officer added:', result)

      onSuccess()
      handleClose()
      setFormData({
        name: '',
        badgeNumber: '',
        mediaLink: '',
        notes: '',
        department: ''
      })
    } catch (error) {
      console.error('Error adding officer:', error)
      alert(error instanceof Error ? error.message : 'Something went wrong.')
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#0F6A9A' }}>
          Officer Information
        </h2>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '20px',
          }}
        >
          {/* Left Column */}
          <div style={{ flex: 1, marginRight: '20px' }}>
            <LabelAndEntry
              label={'Officer Name'}
              placeholder={'Name'}
              width='100%'
              height='35px'
              borderRadius='10px'
              value={formData.name}
              onChange={handleChange}
              name='name'
            />
            <LabelAndEntry
              label={'Badge Number'}
              placeholder={'XXXXXXXXXXX'}
              width='100%'
              height='35px'
              borderRadius='10px'
              value={formData.badgeNumber}
              onChange={handleChange}
              name='badgeNumber'
            />
            <LabelAndEntry
              label={'Department'}
              placeholder={'Department'}
              width='100%'
              height='35px'
              borderRadius='10px'
              value={formData.department}
              onChange={handleChange}
              name='badgeNumber'
            />
          </div>

          {/* Right Column */}
          <div style={{ flex: 1 }}>
            <LabelAndEntry
              label={'Media links'}
              placeholder={'Media links'}
              width='100%'
              height='72px'
              borderRadius='10px'
              value={formData.mediaLink}
              onChange={handleChange}
              name='mediaLink'
            />
            <LabelAndEntry
              label={'Notes'}
              placeholder={'Notes'}
              width='100%'
              height='72px'
              borderRadius='10px'
              value={formData.notes}
              onChange={handleChange}
              name='notes'
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <IconTextButton
            filled
            border={false}
            text='Save'
            height='40px'
            width='106px'
            onClick={handleSubmit}
          />
        </div>
      </Box>
    </Modal>
  )
}

export default AddOfficerModal
