import { useState, useEffect } from "react";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';


interface AccountInfoProps {
    type: string; // Name will be passed as a string prop
    userProfilePicture: React.ReactNode; //accepts any react node, ideally <Image>
}

const AccountInfoComponent: React.FC<AccountInfoProps> = ({ type, userProfilePicture }) => {
    //css styles for account info items
    const formStyle: React.CSSProperties = {
        width: "405px",
        height: "390px",
        top: "263px",
        left: "105px",
        border: "1px solid black",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        gap: "13px"
    }

    const inputTextStyle: React.CSSProperties = {
        width: "243px",
        height: "30px",
        border: "2px solid #CCDDF8",
        borderRadius: "16px",
        textAlign: "center",
        color: 'black'
    }

    const adminTypeStyle: React.CSSProperties = {
        width: "144px",
        height: "30px",
        border: "1px solid #E9D7FE",
        borderRadius: "16px",
        padding: "2px 8px",
        backgroundColor: "#F9F5FF",
        color: "#6941C6",
        textAlign: "center",
        font: "Inter",
        fontSize: "16px",
        fontWeight: "500"
    }

    const internTypeStyle: React.CSSProperties = {
        width: "144px",
        height: "30px",
        border: "1px solid #9EC8A3",
        borderRadius: "16px",
        padding: "2px 8px",
        backgroundColor: "#DEECDC",
        color: "#71C77B",
        textAlign: "center",
        font: "Inter",
        fontSize: "16px",
        fontWeight: "500"
    }

    const accountCreatedStyle: React.CSSProperties = {
        width: "229px",
        height: "20px",
        font: "Inter",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#B6B5B5"
    }

    //basic form handling when user submits info
    const [formData, setFormData] = useState({ name: "", email: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };


    const router = useRouter();
    // const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();

    const { isSignedIn, user, isLoaded } = useUser();
    
    useEffect(() => {
        console.log("isSignedIn:", isSignedIn);
        
        if (!isLoaded) {
            console.log("NOT LOADED")
        }

        if (isLoaded) {
            console.log("LOADED")
        }
        if (!isSignedIn) {
            console.log("USER IS NOT SIGNED IN")
        }
        if (isSignedIn) {
            console.log("USER IS SIGNED IN")
        }

        if (isLoaded && !isSignedIn) {
            router.push('/login');
        }

    }, [isLoaded, isSignedIn, router]);


    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            {userProfilePicture && <span>{userProfilePicture}</span>}

            <label style= {{ color: '#000000' }}>Name:</label>
            <input type="text" name="name" placeholder="First name Last name" value={user?.fullName ?? ""} onChange={handleChange} style={inputTextStyle} />

            <label style= {{ color: '#000000' }}>Email:</label>
            <input
            type="text"
            name="email"
            placeholder="email@email.com"
            value={user?.primaryEmailAddress?.emailAddress ?? ""}
            onChange={handleChange}
            style={inputTextStyle}
            />

            <label style={{ color: '#535862' }}>Type:</label>

            {type === "administration" && <div style={adminTypeStyle}>Administration</div>}
            {type === "intern" && <div style={internTypeStyle}>Intern</div>}

            <span style={accountCreatedStyle}>Account Created: xx/xx/xxxx</span>

            {/* css styles for placeholder text in text input */}
            <style jsx>{`
                input::placeholder {
                color: #000;
                }
            `}</style>
        </form>
    );
};


export default AccountInfoComponent;