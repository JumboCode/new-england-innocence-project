import AccountInfoComponent from "@/components/AccountInfo";

const AccountInfo = () => {
    return (
        <div>
            <h2>Account Information</h2>
            <AccountInfoComponent type="administration" />
            {/* <AccountInfoComponent type="intern" /> */}
        </div>
    );
};

export default AccountInfo;