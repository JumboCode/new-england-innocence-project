'use client'

import { useState, useEffect } from "react";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

<<<<<<< HEAD
const AccountInfoComponent: React.FC = () => {
    //css styles for account info items
    const formStyle: React.CSSProperties = {
        width: "405px",
        height: "260px",
        top: "263px",
        left: "105px",
        border: "1px solid black",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        gap: "13px", 
        marginBottom: "20px"
=======
interface AccountInfoProps {
  type: string; // "administration" or "intern"
  userProfilePicture: React.ReactNode;
}

const AccountInfoComponent: React.FC<AccountInfoProps> = ({ type }) => {
  const formStyle: React.CSSProperties = {
    width: "405px",
    height: "auto",
    border: "1px solid black",
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    gap: "13px",
    marginBottom: "20px"
  };

  const inputTextStyle: React.CSSProperties = {
    width: "243px",
    height: "30px",
    border: "2px solid #CCDDF8",
    borderRadius: "16px",
    textAlign: "center",
    color: '#000000'
  };

  const adminTypeStyle: React.CSSProperties = {
    width: "144px",
    height: "30px",
    border: "1px solid #E9D7FE",
    borderRadius: "16px",
    padding: "2px 8px",
    backgroundColor: "#F9F5FF",
    color: "#6941C6",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "500"
  };

  const internTypeStyle: React.CSSProperties = {
    width: "144px",
    height: "30px",
    border: "1px solid #9EC8A3",
    borderRadius: "16px",
    padding: "2px 8px",
    backgroundColor: "#DEECDC",
    color: "#71C77B",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "500"
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
  
      const hasChanged =
        updated.firstName !== (user?.firstName || "") ||
        updated.lastName !== (user?.lastName || "");
  
      setHasChanges(hasChanged);
      return updated;
    });
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await user.update({
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      alert("Profile updated!");
    } catch (err) {
      console.error("Failed to update Clerk profile:", err);
      alert("Something went wrong while updating your profile.");
    }
  };

  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.primaryEmailAddress?.emailAddress || ""
      });
>>>>>>> 56281401b44aaa5160a8d80f390106f6d578865d
    }

    if (isLoaded && !isSignedIn) {
      router.push('/login');
    }
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label style={{ color: '#000000' }}>First Name:</label>
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        value={formData.firstName}
        onChange={handleChange}
        style={inputTextStyle}
        required
      />

      <label style={{ color: '#000000' }}>Last Name:</label>
      <input
        type="text"
        name="lastName"
        placeholder="Last name"
        value={formData.lastName}
        onChange={handleChange}
        style={inputTextStyle}
        required
      />

      <label style={{ color: '#000000' }}>Email:</label>
      <input
        type="text"
        name="email"
        placeholder="email@email.com"
        value={formData.email}
        style={{ ...inputTextStyle, backgroundColor: '#f4f4f4' }}
        readOnly
      />

      <label style={{ color: '#535862' }}>Type:</label>
      {type === "administration" && <div style={adminTypeStyle}>Administration</div>}
      {type === "intern" && <div style={internTypeStyle}>Intern</div>}

      {hasChanges && (
        <button type="submit" style={{ ...inputTextStyle, cursor: 'pointer' }}>
            Save Changes
        </button>
        )}


      <style jsx>{`
        input::placeholder {
          color: #000;
        }
<<<<<<< HEAD

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

    const type = user?.publicMetadata.role; 

    return (
        <form onSubmit={handleSubmit} style={formStyle}>

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

            {/* css styles for placeholder text in text input */}
            <style jsx>{`
                input::placeholder {
                color: #000;
                }
            `}</style>
        </form>
    );
=======
      `}</style>
    </form>
  );
>>>>>>> 56281401b44aaa5160a8d80f390106f6d578865d
};

export default AccountInfoComponent;
