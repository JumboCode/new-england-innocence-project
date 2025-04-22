import UsersComponent from "@/components/Users";
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar'

interface User {
    id: string
    firstName: string;
    lastName: string;
    emailAddresses: { email: string }[]
    createdAt: Date
}

const headingStyle: React.CSSProperties = {
    top: "102px",
    left: "105px",
    font: "Inter",
    fontWeight: "700",
    fontSize: "24px",
    lineHeight: "28px",
    paddingLeft: "100px",
}

const buttonStyle: React.CSSProperties = {
    width: "220px",
    height: "40px",
    gap: "8px",
    borderRadius: "8px",
    borderWidth: "1px",
    paddingTop: "10px",
    paddingRight: "16px",
    paddingBottom: "10px",
    paddingLeft: "16px",
    backgroundColor: "#2B9BD6",
    border: "1px solid #44B4EF",
    font: "Inter",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "20px",
    marginLeft: "100px",
    color: "white"
}

const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [reloadFlag, setReloadFlag] = useState(false)
    // Get the host from the request headers to construct absolute URLs
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

    // Construct the full URL for the API endpoint
    const fullUrl = `${baseUrl}${"/api/auth/getUsers"}`;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(fullUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log(`Response status: ${response.status}`);

                if (!response.ok) {
                    const errorData = await response.text();
                    console.error(`Error response: ${errorData}`);
                    throw new Error(`Error ${response.status}: ${errorData}`);
                }

                const data = await response.json();
                const users = data.users
                console.log("USERS", data)
                setUsers(users)
                return users
            } catch (error) {
                console.error('Filter error:', error);
            }
        }
        fetchUsers();  // Fetch users when the component mounts
    }, [fullUrl, reloadFlag]);

    return (
        <>
            <div style={headingStyle}>Manage Users</div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div></div>
                <div></div>
                <button style={buttonStyle}>
                    + Add new intern account
                </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", paddingLeft: '65px' }}>
                {
                    users.map((user: User) => {
                        // Accessing firstName and lastName
                        const firstNameUsers = user.firstName || "Kevin";
                        const lastNameUsers = user.lastName || "Aka";

                        // Accessing emailAddresses - assuming the first email address is the primary one
                        const emailUsers = user.emailAddresses.length > 0 ? user.emailAddresses[0].email : 'kevin.aka@tufts.edu';
                        const timestamp = user.createdAt;

                        // Convert to Date object
                        const date = new Date(timestamp);

                        // Get the ISO string and slice to only include the date (YYYY-MM-DD)
                        const dateOnly = date.toISOString().split('T')[0];
                        console.log(`User: ${firstNameUsers} ${lastNameUsers}, Email: ${emailUsers}`);
                        return (
                            <UsersComponent key={user.id} userId={user.id} firstName={firstNameUsers} lastName={lastNameUsers} email={emailUsers} type="intern" dateCreated={dateOnly} reload={() => { setReloadFlag(prev => !prev) }} />
                        )
                    })}
            </div>
            <NavBar />
        </>

    );
};

export default ManageUsers;
