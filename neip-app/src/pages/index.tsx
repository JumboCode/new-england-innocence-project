// pages/index.tsx
// import Homepage from '@/app/pages/homepage'
import NavBar from '../components/NavBar'
import LoginPage from './login'
import AuthButton from '@/components/AuthButton'
import AuthEntryBox from '@/components/SignupAuthEntryBox'
import Signup from './Signup'
import HomePage from './HomePage'
import ActionMenuComponent from '@/components/ActionMenuComponent'

const Homepage = () => {
  return (
    <>
      <HomePage />
    </>
  )
}

export default Homepage;
