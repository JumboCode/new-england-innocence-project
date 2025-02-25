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
        <form onSubmit={handleSubmit} style={{ width: "405px", height: "390px", top: "263px", left: "105px", border: "1px solid black", margin: "1.5em", padding: "1em" }}>
            <Image
                src={UserProfileSquare}
                alt='user profile icon'
                width='90'
                height='90'
            ></Image>
            <label>Name:</label>
            <br />
            <input type="text" text-align="center" name="name" value={formData.name} onChange={handleChange} style={{ width: "243px", height: "30px", border: "2px solid #CCDDF8", borderRadius: "16px", textAlign: "center" }} />
            <br />
            <label>Email:</label>
            <br />
            <input type="text" name="email" value={formData.email} onChange={handleChange} style={{ width: "243px", height: "30px", border: "2px solid #CCDDF8", borderRadius: "16px", textAlign: "center" }} />
            <br />
            <label style={{ color: '#535862' }}>Type:</label>
            <br />
            <input type="text" name="account-type" value={formData.type} onChange={handleChange} style={{ width: "243px", height: "30px", border: "2px solid #CCDDF8", borderRadius: "16px" }} />
            <br />
            <br />
            <span style={{ width: "229px", height: "20px", font: "Inter", fontWeight: "400", fontSize: "14px", lineHeight: "20px", color: "#B6B5B5" }}>Account Created: xx/xx/xxxx</span>
        </form>
    );
};


export default AccountInfoComponent;