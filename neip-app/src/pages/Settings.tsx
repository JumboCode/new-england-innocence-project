import AccountInfoComponent from '@/components/AccountInfo'
import Image from 'next/image'
import UserProfileSquare from '../img/user-profile-square.png'
import NavBar from '../components/NavBar'
import Modal from '@/components/ChangePasswordModal'
import React, { useState } from 'react'
import IconTextButton from '../components/IconTextButton'
import { CgLogOut } from 'react-icons/cg'


const AccountInfo = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  // const { signOut } = useClerk();

  const changePassBtnStyle: React.CSSProperties = {
    font: 'Inter',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#535862',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #000000',
    marginTop: '5px'
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`)
      }

      window.location.href = '/login' // Redirect to login page after successful logout
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className='account-info-container'
      style={{
        height: '100vh',
        backgroundColor: 'white',
        width: '100vw',
        paddingLeft: '90px'
      }}
    >
      <h2
        style={{
          font: 'Inner',
          fontSize: '24px',
          fontWeight: '700',
          marginTop: '20px',
          marginBottom: '20px',
          color: 'black'
        }}
      >
        Account Information
      </h2>
      <AccountInfoComponent
        type='administration'
        userProfilePicture={
          <Image
            src={UserProfileSquare}
            alt='user profile icon'
            width='90'
            height='90'
            style={{
              top: '274px',
              left: '121px',
              display: 'block'
            }}
          ></Image>
        }
      />
      {/* <AccountInfoComponent type="intern"
          userProfilePicture={
              <Image
                  src={UserProfileSquare}
                  alt='user profile icon'
                  width='90'
                  height='90'
                  style={{
                      top: "274px",
                      left: "121px",
                      display: "block"
                  }}
              ></Image>
          }
      /> */}
      <button onClick={() => setModalOpen(true)} style={changePassBtnStyle}>
        Change Password
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}></Modal>
      <div style={{ marginTop: '20px', marginLeft: 'auto' }}>
        <IconTextButton
          icon={<CgLogOut size={20} />}
          filled={true}
          text='Logout'
          border={false}
          onClick={handleLogout}
          height='40px'
          width='100px'
        />
      </div>
      <NavBar />
      {/* <button style={changePassBtnStyle} onClick={() => signOut()}>Sign Out</button> simply for testing purposes clerk only
      allows single sessions so after you try it, click this to signout and try again. */}
    </div>
  )
}

export default AccountInfo
