import AccountInfoComponent from "@/components/AccountInfo";
import Image from "next/image";
import UserProfileSquare from "../img/user-profile-square.png"
import NavBar from '../components/NavBar'

const AccountInfo = () => {
  return (
    <div
      style={{
          height: '100vh',
          backgroundColor: 'white',
          width: '100vw',
          paddingLeft: '90px'
      }}
    >
      <h2 style={{font: "Inner", fontSize: "24px", fontWeight: "700", marginTop: "20px", marginBottom: "20px"}}>
        Account Information
      </h2>
      <AccountInfoComponent type="administration"
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
      <NavBar />
    </div>
  );
};

export default AccountInfo;