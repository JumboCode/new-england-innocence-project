'use client'

import React, { useState, useEffect } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/router'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
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

const ResetPasswordModal: React.FC<ModalProps> = ({ isOpen, onClose, email: initialEmail }) => {
  const router = useRouter()
  const { isLoaded, signIn } = useSignIn()

  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setEmail(initialEmail)
  }, [initialEmail])

  if (!isOpen || !isLoaded) return null

  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email
      })
      setSuccessfulCreation(true)
      setError('')
    } catch (err: any) {
      console.error('Reset code error:', err)
      setError(err?.errors?.[0]?.longMessage || 'Something went wrong.')
    }
  }

  function generateRandomPassword(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
      .map(x => chars[x % chars.length])
      .join('')
  }  

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log("here 1")
      const dummyPassword = generateRandomPassword()
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: dummyPassword // dummy password just to validate the code
      })
      console.log("here 2")
      if (result.status === 'needs_second_factor') {
        setSecondFactor(true)
        setError('')
        return
      }
      console.log("here 3")
      if (result.status !== 'complete') {
        setError('Reset code verification incomplete.')
        return
      }
      // console.log("here 4")
      // console.log(email)
      const response = await fetch('/api/auth/changePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword: password })
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        setError(data.error || 'Something went wrong while updating the password.')
      } else {
        setError('')
        setSuccess(true)
        setTimeout(() => {
          onClose()
          router.push('/login')
        }, 1500)
      }
    } catch (err: any) {
      console.error('Reset failed:', err)
      setError(err?.errors?.[0]?.longMessage || 'Something went wrong.')
    }
  }
  

  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalContent} onClick={e => e.stopPropagation()}>
        <form onSubmit={successfulCreation ? handleResetPassword : handleSendResetCode}>
          {!successfulCreation ? (
            <>
              <label htmlFor='email' style={labelStyles}>
                Enter your email to receive a reset code:
              </label>
              <input
                id='email'
                type='email'
                value={email}
                style={inputStyle}
                onChange={e => setEmail(e.target.value)}
                required
              />
              {error && <p style={errorStyle}>{error}</p>}
              <button type='submit' style={buttonStyle}>Send Reset Code</button>
            </>
          ) : (
            <>
              <label htmlFor='new-password' style={labelStyles}>
                New Password:
              </label>
              <input
                id='new-password'
                type='password'
                value={password}
                style={inputStyle}
                onChange={e => setPassword(e.target.value)}
                required
              />

              <label htmlFor='reset-code' style={labelStyles}>
                Reset Code:
              </label>
              <input
                id='reset-code'
                type='text'
                value={code}
                style={inputStyle}
                onChange={e => setCode(e.target.value)}
                required
              />

              {error && <p style={errorStyle}>{error}</p>}
              {success && <p style={successStyle}> Password reset! Redirecting to login page.</p>}

              <button type='submit' style={buttonStyle}>Reset Password</button>
            </>
          )}

          {secondFactor && (
            <p style={errorStyle}>2FA required. This UI does not support 2FA login.</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordModal
