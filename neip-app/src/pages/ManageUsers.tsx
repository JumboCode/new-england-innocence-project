import UsersComponent from "@/components/Users";
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar'
import InternAccountModal from "@/components/InternAccountModal";
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';

interface User {
    id: string
    firstName: string;
    lastName: string;
    publicMetadata: {
        role: string;
    };
    emailAddresses: { emailAddress: string }[]
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
    const [isInternAccountModalOpen, setInternAccountModalOpen] = useState(false);

    const { isSignedIn, isLoaded } = useUser();
    const router = useRouter();
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
        }
        console.log(`At manage users page`)
        console.log(`isLoaded: ${isLoaded}`)
        console.log(`isSignedIn: ${isSignedIn}`)
    }, [isLoaded, isSignedIn, router]);

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

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <>
        <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            paddingTop: "20px", 
            paddingBottom: "20px", 
            paddingLeft: "60px", 
            paddingRight: "65px" 
        }}>
            <div style={headingStyle}>Manage Users</div>
            <button style={buttonStyle} onClick={() => setInternAccountModalOpen(true)}>
                + Add new intern account
            </button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", paddingLeft: '60px' }}>
        <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            {isInternAccountModalOpen && <InternAccountModal onClose={() => { setInternAccountModalOpen(false) }} />}
            <div style={{ display: "flex", flexWrap: "wrap", paddingLeft: '65px' }}>
                {
                    users.map((user: User) => {
                        // Accessing firstName and lastName
                        const firstNameUsers = user.firstName || "";
                        const lastNameUsers = user.lastName || "";
                        const role = user.publicMetadata.role || "administration";

                        // Accessing emailAddresses - assuming the first email address is the primary one
                        const emailUser = user.emailAddresses[0].emailAddress || ""; 
                        const timestamp = user.createdAt;

                        // Convert to Date object
                        const date = new Date(timestamp);

                        // Get the ISO string and slice to only include the date (YYYY-MM-DD)
                        const dateOnly = date.toISOString().split('T')[0];
                        console.log(`User: ${firstNameUsers} ${lastNameUsers}, Email: ${emailUser}`);
                        return (
                            <UsersComponent key={user.id} userId={user.id} firstName={firstNameUsers} lastName={lastNameUsers} email={emailUser} type={role} dateCreated={dateOnly} reload={() => { setReloadFlag(prev => !prev) }} />
                        )
                    })}
            </div>
            <NavBar />
            </div>
        </div>
        </>
    );
};

export default ManageUsers;
