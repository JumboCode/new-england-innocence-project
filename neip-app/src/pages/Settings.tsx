import AccountInfoComponent from '@/components/AccountInfo'
import Image from 'next/image'
import UserProfileSquare from '../img/user-profile-square.png'
import NavBar from '../components/NavBar'
import IconTextButton from '../components/IconTextButton'
import { CgLogOut } from 'react-icons/cg'

const AccountInfo = () => {
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
          marginBottom: '20px'
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
