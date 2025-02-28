import AccountInfoComponent from "@/components/AccountInfo";
import Image from "next/image";
import UserProfileSquare from "../img/user-profile-square.png"

const AccountInfo = () => {
    return (
        <div>
            <h2>Account Information</h2>
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
        </div>
    );
};

export default AccountInfo;