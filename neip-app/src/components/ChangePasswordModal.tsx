'use client'
import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useSignIn } from '@clerk/nextjs'

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
  alignItems: 'center'
}

const modalContent: React.CSSProperties = {
  width: '307px',
  height: '268px',
  top: '195px',
  left: '105px',
  backgroundColor: '#FFFFFF',
  padding: '20px',
  border: '1px solid #B6B5B5'
}

const submitBtnStyle: React.CSSProperties = {
  font: 'Inter',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  color: '#535862',
  padding: '5px',
  borderRadius: '5px',
  border: '1px solid #000000'
}

const labelStyles: React.CSSProperties = {
  font: 'Inter',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  color: '#535862'
}

const textInputStyle: React.CSSProperties = {
  width: '252px',
  height: '30px',
  borderRadius: '16px',
  border: '1px solid #CCDDF8'
}
const innerModalContent: React.CSSProperties = {
  width: '252px',
  height: '215px',
  top: '210px',
  left: '133px',
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
  backgroundColor: '#FFFFFF',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
}

const ForgotPasswordPage: NextPage<ModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState('')
  const { isLoaded, signIn, setActive } = useSignIn()

  if (!isOpen) return null

  if (!isLoaded) {
    return null
  }

  // Send the password reset code to the user's email
  async function create (e: React.FormEvent) {
    e.preventDefault()
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email
      })
      .then(()=> {
        setSuccessfulCreation(true)
        setError('')
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset (e: React.FormEvent) {
    e.preventDefault()
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password
      })
      .then(result => {
        // Check if 2FA is required
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true)
          setError('')
        } else if (result.status === 'complete') {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId })
          setError('')
        } else {
          console.log(result)
        }
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
  }

  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalContent} onClick={e => e.stopPropagation()}>
        <form
          style={innerModalContent}
          onSubmit={!successfulCreation ? create : reset}
        >
          {!successfulCreation && (
            <>
              <label htmlFor='email' style={labelStyles}>
                Provide your email address:
              </label>
              <input
                type='email'
                style={textInputStyle}
                placeholder='e.g john@doe.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <button style={submitBtnStyle}>Send password reset code</button>
              {error && <p>{error}</p>}
            </>
          )}

          {successfulCreation && (
            <>
              <label style={labelStyles} htmlFor='password'>
                Enter your new password
              </label>
              <input
                style={textInputStyle}
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <label style={labelStyles} htmlFor='password'>
                Enter the password reset code that was sent to your email
              </label>
              <input
                style={textInputStyle}
                type='code'
                value={code}
                onChange={e => setCode(e.target.value)}
              />

              <button style={submitBtnStyle}>Reset</button>
              {error && <p>{error}</p>}
            </>
          )}

          {secondFactor && (
            <p>2FA is required, but this UI does not handle that</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
