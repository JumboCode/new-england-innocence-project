import UsersComponent from "@/components/Users";
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar'

interface User {
    id: number
    firstName: string;
    lastName: string;
    emailAddresses: { email: string }[]
    createdAt: Date
}

const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
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
    }, [fullUrl]);

    return (
        <div style={{ display: "flex", flexWrap: "wrap", paddingLeft: '65px' }}>
            {/* <h2>Account Information</h2> */}
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
                        <UsersComponent key={user.id} firstName={firstNameUsers} lastName={lastNameUsers} email={emailUsers} type="administration" dateCreated={dateOnly} />
                    )
                })}
            <NavBar />
        </div>
    );
};

export default ManageUsers;
