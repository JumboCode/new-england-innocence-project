import React, { useState, useRef, useEffect } from 'react'
import AuthEntryBox from '../components/AuthEntryBox'
import AuthButton from '../components/AuthButton'
import AuthBox from '../components/AuthBox'

interface InternAccountModalProps {
  onClose: () => void
}

const authEntryBoxStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20px',
  width: '375px',
  padding: '27px'
}

const InternAccountModal: React.FC<InternAccountModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      style={{
        position: 'fixed',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <div ref={modalRef}>
        <AuthBox prop={<InternAccountModalContent onClose={onClose} />} />
      </div>
    </div>
  )
}

const InternAccountModalContent: React.FC<InternAccountModalProps> = ({
  onClose
}) => {
  const [internName, setInternName] = useState('')
  const [internEmail, setInternEmail] = useState('')
  const [internPassword, setInternPassword] = useState('')

  // const signUpIntern = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault()
  //   try {
  //     const res = await fetch('/api/auth/createIntern', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ email: internEmail, name: internName })
  //     })
  
  //     const data = await res.json()
  //     if (!res.ok) throw new Error(data.message)

  //     // console.log("intern created")
  //     // await clerk.sendPasswordResetEmail({ emailAddress: internEmail })
  //     // console.log("email sent")
  //     console.log('Intern created:', data.user)
  //     // Optionally show success to the admin
  //   } catch (err: any) {
  //     console.error('Intern creation error:', err.message)
  //     // Show error to user
  //   }
  // }

  const signUpIntern = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    const createInternAccount = await fetch('api/auth/createInternAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ internName: internName, internEmail: internEmail, internPassword: internPassword })
    })

    if (!createInternAccount.ok) {
      const errorData = await createInternAccount.json()
      console.log(errorData)
      if (typeof errorData.error !== 'string') {
        alert(errorData.error.errors[0].longMessage)
        console.error('Signup error', errorData.error.errors[0].longMessage)
      } else {
        alert(errorData.error)
        console.error('Singup error', errorData.error)
      }
      return
    }

    alert(`Intern account successfully created for ${internEmail}. Please share the password you entered with your intern.`)

    onClose()
  }
  return (
    <div>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '25px',
          fontWeight: 'bold',
          color: 'black',
          paddingBottom: '5px',
          marginTop: '-19px'
        }}
      >
        Intern Signup
      </h1>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'black',
          paddingBottom: '10px'
        }}
      >
        User Credentials
      </h2>
      <div style={authEntryBoxStyle}>
        <AuthEntryBox
          placeholder='Intern Name'
          type='text'
          onChange={e => {
            setInternName(e.target.value)
          }}
        ></AuthEntryBox>
      </div>
      <div style={authEntryBoxStyle}>
        <AuthEntryBox
          placeholder='Email'
          type='email'
          onChange={e => {
            setInternEmail(e.target.value)
          }}
        ></AuthEntryBox>
      </div>
      <div style={authEntryBoxStyle}>
        <AuthEntryBox
          placeholder='Password'
          type='password'
          onChange={e => {
            setInternPassword(e.target.value)
          }}
        ></AuthEntryBox>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          paddingTop: '75px'
        }}
      >
        <AuthButton
          color='#43b4ef'
          filled={true}
          text='Sign Up'
          href='/signupConfirmation'
          onClick={e => signUpIntern(e)}
        />
      </div>
    </div>
  )
}

export default InternAccountModal
