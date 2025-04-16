import AccountInfoComponent from '@/components/AccountInfo'
import Image from 'next/image'
import UserProfileSquare from '../img/user-profile-square.png'
import NavBar from '../components/NavBar'
import Modal from '@/components/ChangePasswordModal'
import React, { useState } from 'react'
import IconTextButton from '../components/IconTextButton'
import { CgLogOut } from 'react-icons/cg'
import { handleLogout } from '@/utils/auth/handleLogout'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const AccountInfo = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(`/login?redirect=${encodeURIComponent('/Settings')}`);
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) return null; 
  if (!isSignedIn) return null; 

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
  return (
    <div
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
          color: '#000000'
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
          />
        }
      />
      <button onClick={() => setModalOpen(true)} style={changePassBtnStyle}>
        Change Password
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
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
    </div>
  )
}

export default AccountInfo