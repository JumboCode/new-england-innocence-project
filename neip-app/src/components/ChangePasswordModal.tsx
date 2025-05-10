'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const modalOverlay: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999
}

const modalContent: React.CSSProperties = {
  width: '320px',
  backgroundColor: '#FFFFFF',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
}

const labelStyles: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#333'
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  marginTop: '5px',
  marginBottom: '15px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px'
}

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  backgroundColor: '#3b82f6',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
  marginBottom: '10px'
}

const errorStyle: React.CSSProperties = {
  color: 'red',
  fontSize: '13px',
  marginTop: '-10px',
  marginBottom: '10px'
}

const successStyle: React.CSSProperties = {
  color: 'green',
  fontSize: '14px',
  marginBottom: '10px'
}

const ChangePasswordModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { user } = useUser()
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  if (!isOpen || !user) return null

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/changePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress,
          newPassword
        })
      })
  
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Something went wrong.')
      } else {
        setError('')
        setSuccess(true)
        setTimeout(() => {
          onClose()
        }, 1500)
      }
    } catch (err) {
      console.error('Password update failed:', err)
      setError('Something went wrong.')
    }
  }

  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalContent} onClick={e => e.stopPropagation()}>
        <form onSubmit={handleChangePassword}>
          <label htmlFor='new-password' style={labelStyles}>
            New Password:
          </label>
          <input
            id='new-password'
            type='password'
            value={newPassword}
            style={inputStyle}
            onChange={e => setNewPassword(e.target.value)}
            required
          />

          {error && <p style={errorStyle}>{error}</p>}
          {success && <p style={successStyle}>Password changed successfully!</p>}

          <button type='submit' style={buttonStyle}>Change Password</button>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordModal
