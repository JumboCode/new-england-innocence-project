import AccountInfoComponent from "@/components/AccountInfo";

const AccountInfo = () => {
    return (
        <div>
            <h2>Account Information</h2>
            <AccountInfoComponent />  {/* Displaying the imported component */}
        </div>
    );
};

export default AccountInfo;