import React, { useState } from 'react'
import AuthEntryBox from '../components/AuthEntryBox'
import AuthButton from '../components/AuthButton'
import AuthBox from '../components/AuthBox'

const Signup: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <AuthBox prop={<SignupContent />} />
    </div>
  )
}

const SignupContent = () => {
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState('')
  const [password, setPassword] = useState('')
  console.log(userId, position) // Temporary use to avoid linting error

  const handleSignup = async () => {
    try {
      // added to make sure signup doesn't fail silently
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Signup error', errorData.error)
        alert(errorData.error.errors.at(0).longMessage)
      }

      alert('Signup successful!')
    } catch (error: any) {
      console.error(error.error)
    }
  }

  return (
    <div>
      <div>
        {/* Sign up text */}
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
          Signup
        </h1>
      </div>

      <div>
        {/* User credentials text */}
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
      </div>

      {/* user ID input */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20px',
          width: '375px',
          padding: '27px'
        }}
      >
        <AuthEntryBox
          placeholder='user ID'
          type='text'
          onChange={e => setUserId(e.target.value)}
        />
      </div>

      {/* email input */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20px',
          width: '375px',
          padding: '27px'
        }}
      >
        <AuthEntryBox
          placeholder='email'
          type='email'
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      {/* position input */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20px',
          width: '375px',
          padding: '27px'
        }}
      >
        <AuthEntryBox
          placeholder='new user position'
          type='text'
          onChange={e => setPosition(e.target.value)}
        />
      </div>

      {/* password input */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20px',
          width: '375px',
          padding: '27px'
        }}
      >
        <AuthEntryBox
          placeholder='password'
          type='password'
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      {/* sign up button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px'
        }}
      >
        <AuthButton
          color='#43b4ef'
          filled={true}
          text='Sign Up'
          href='/signupConfirmation'
          onClick={handleSignup}
        />
      </div>
    </div>
  )
}

export default Signup
