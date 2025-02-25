import { useState } from "react";
import Image from "next/image";
import UserProfileSquare from "../img/user-profile-square.png"

const AccountInfoComponent = () => {
    const [formData, setFormData] = useState({ name: "", email: "", type: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: "405px", height: "390px", top: "263px", left: "105px", border: "1px solid black", margin: "1.5em", padding: "1em", display: "flex", flexDirection: "column", gap: "13px" }}>
            <Image
                src={UserProfileSquare}
                alt='user profile icon'
                width='90'
                height='90'
                style={{ top: "274px", left: "121px", display: "block" }}
            ></Image>
            <label>Name:</label>
            <input type="text" text-align="center" name="name" placeholder="First Name Last Name" value={formData.name} onChange={handleChange} style={{ width: "243px", height: "30px", border: "2px solid #CCDDF8", borderRadius: "16px", textAlign: "center" }} />
            <label>Email:</label>
            <input type="text" name="email" placeholder="email@email.com" value={formData.email} onChange={handleChange} style={{ width: "243px", height: "30px", border: "2px solid #CCDDF8", borderRadius: "16px", textAlign: "center" }} />
            <label style={{ color: '#535862' }}>Type:</label>
            <input type="text" name="account-type" value={formData.type} onChange={handleChange} style={{ width: "243px", height: "30px", border: "2px solid #CCDDF8", borderRadius: "16px" }} />
            <span style={{ width: "229px", height: "20px", font: "Inter", fontWeight: "400", fontSize: "14px", lineHeight: "20px", color: "#B6B5B5" }}>Account Created: xx/xx/xxxx</span>
            <style jsx>{`
                input::placeholder {
                color: #000;
                }
            `}</style>
        </form>
    );
};


export default AccountInfoComponent;