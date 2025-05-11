import DeleteInternAccountModal from "./DeleteInternAccountModal"
import React, { useState } from 'react'

interface UsersProps {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    type: string; // Name will be passed as a string prop
    dateCreated: string,
    reload: () => void
}

const UsersComponent: React.FC<UsersProps> = ({ userId, firstName, lastName, email, type, dateCreated, reload }) => {
    const [isDeleteInternOpen, setOpenDeleteIntern] = useState(false);
    //css styles for account info items
    const divStyle: React.CSSProperties = {
        width: "260px",
        height: "162x",
        top: "258px",
        left: "610px",
        border: "1px solid #B6B5B5",
        margin: "1.5em",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        gap: "5px"
    }

    const threeDotsStyles: React.CSSProperties = {
        height: "23px",
        top: "259px",
        left: "815px",
        display: "flex",
        justifyContent: "flex-end"
    }

    const emailStyles: React.CSSProperties = {
        width: "Hug (178px)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        height: "Hug (20px)",
        font: "Inter",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "20px", 
        color: "black"
    }

    const nameStyles: React.CSSProperties = {
        width: "221px",
        height: "20px",
        font: "Inter",
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#535862"
    }

    const typeTextStyle: React.CSSProperties = {
        font: "Inter",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "20px",
        letterSpacing: "0",
        color: '#535862'
    }

    const adminTypeStyle: React.CSSProperties = {
        width: "100px",
        height: "22px",
        top: "369px",
        left: "689px",
        border: "1px solid #E9D7FE",
        borderRadius: "16px",
        padding: "2px 8px",
        backgroundColor: "#F9F5FF",
        color: "#6941C6",
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

    return (
        <>
            {type === "administration" &&
                <div style={divStyle}>
                    {<span style={threeDotsStyles}>...</span>}
                    {(lastName && firstName) && <span style={nameStyles}>{lastName}, {firstName}</span>}
                    {email && <span style={emailStyles}>{email}</span>}
                    <div><span style={typeTextStyle}>Type: </span><span style={adminTypeStyle}>Administration</span></div>
                    <span style={accountCreatedStyle}>Account Created: {dateCreated}</span>
                </div>
            }
            {type === "intern" &&
                <div style={divStyle}>
                    {<span style={threeDotsStyles} onClick={() => {
                        console.log("hello");
                        console.log(isDeleteInternOpen);
                        setOpenDeleteIntern(true)
                    }}>X</span>}
                    <DeleteInternAccountModal usersId={userId} isOpen={isDeleteInternOpen} onClose={() => { setOpenDeleteIntern(false) }} reload={reload} />
                    {(lastName && firstName) && <span style={nameStyles}>{lastName}, {firstName}</span>}
                    {email && <span style={emailStyles}>{email}</span>}
                    <div><span style={typeTextStyle}>Type: </span><span style={internTypeStyle}>Intern</span></div>
                    <span style={accountCreatedStyle}>Account Created: {dateCreated}</span>
                </div>
            }
            {/* css styles for placeholder text in text input */}
            <style jsx>{`
                   input::placeholder {
                   color: #000;
                   }
               `}</style>
        </>
    );
};


export default UsersComponent;