import UsersComponent from "@/components/Users";
import { useEffect, useState } from 'react';

interface User {
    firstName: string;
    lastName: string;
    emailAddresses: { email: string }[]
    createdAt: Date
}

const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    // Get the host from the request headers to construct absolute URLs
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    // Construct the full URL for the API endpoint
    const fullUrl = `${baseUrl}${"/api/auth/getUsers"}`;
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
            setUsers(users)
            console.log(`Users:`, users);
            return users
        } catch (error) {
            console.error('Filter error:', error);
        }
    }

    useEffect(() => {
        fetchUsers();  // Fetch users when the component mounts
    }, []);

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* <h2>Account Information</h2> */}
            {
                users.map((user: User) => {
                    // Accessing firstName and lastName
                    const firstNameUsers = user.firstName || "Kevin";
                    const lastNameUsers = user.lastName || "Aka";

                    // Accessing emailAddresses - assuming the first email address is the primary one
                    // const emailUsers = user.emailAddresses.length > 0 ? user.emailAddresses[0].email : '';
                    const emailUsers = "kevinaka@email.com"
                    const timestamp = user.createdAt;

                    // Convert to Date object
                    const date = new Date(timestamp);

                    // Get the ISO string and slice to only include the date (YYYY-MM-DD)
                    const dateOnly = date.toISOString().split('T')[0];
                    console.log(`User: ${firstNameUsers} ${lastNameUsers}, Email: ${emailUsers}`);
                    return (
                        <UsersComponent firstName={firstNameUsers} lastName={lastNameUsers} email={emailUsers} type="administration" dateCreated={dateOnly} />
                    )
                })}
        </div>
    );
};

export default ManageUsers;

// // Get the host from the request headers to construct absolute URLs
// const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
// const host = 'localhost:3000';
// const baseUrl = `${protocol}://${host}`;

// // Construct the full URL for the API endpoint
// const fullUrl = `${baseUrl}${"/api/auth/getUsers"}`;
// const fetchUsers = async () => {
//     try {
//         const response = await fetch(fullUrl, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         console.log(`Response status: ${response.status}`);

//         if (!response.ok) {
//             const errorData = await response.text();
//             console.error(`Error response: ${errorData}`);
//             throw new Error(`Error ${response.status}: ${errorData}`);
//         }

//         const data = await response.json();
//         const users = data.users
//         console.log(`Users:`, users);
//         users.forEach((user: User) => {
//             // Accessing firstName and lastName
//             const firstName = user.firstName;
//             const lastName = user.lastName;

//             // Accessing emailAddresses - assuming the first email address is the primary one
//             const email = user.emailAddresses.length > 0 ? user.emailAddresses[0].email : 'No email address available';
//             console.log(`User: ${firstName} ${lastName}, Email: ${email}`);
//         });
//     } catch (error) {
//         console.error('Filter error:', error);
//     }
// }

// fetchUsers();


// const ManageUsers = () => {

//     return (


//         <div>
//             <h2>Account Information</h2>
//             <UsersComponent firstName="Kevin" lastName="Aka" email="kevinaka@email.com" type="administration" dateCreated="03/25/2025" />
//             {/* <AccountInfoComponent type="intern" /> */}
//         </div>
//     );
// };

// export default ManageUsers;