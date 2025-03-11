import React from "react";
import { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    changePassword: (password: string) => void;
}

const modalOverlay: React.CSSProperties = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const modalContent: React.CSSProperties = {
    width: "307px",
    height: "268px",
    top: "195px",
    left: "105px",
    backgroundColor: "#FFFFFF",
    padding: "20px",
    border: "1px solid #B6B5B5",
}

const closeBtn: React.CSSProperties = {
    width: "100%",
    top: "10px",
    right: "10px",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "flex-end"
}

const submitBtnStyle: React.CSSProperties = {
    font: 'Inter',
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#535862",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #000000"
}

const labelStyles: React.CSSProperties = {
    font: 'Inter',
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#535862"
}

const textInputStyle: React.CSSProperties = {
    width: "252px",
    height: "30px",
    borderRadius: "16px",
    border: "1px solid #CCDDF8"
}
const innerModalContent: React.CSSProperties = {
    width: "252px",
    height: "215px",
    top: "210px",
    left: "133px",
    display: "flex",
    flexDirection: "column",
    gap: "13px",
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    justifyContent: "flex-start",
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, changePassword }) => {
    if (!isOpen) return null;
    const [displayCurrPassword, setCurrPassword] = useState("")
    const [displayNewPassword, setNewPassword] = useState("")
    const [displayConfirmPassword, setConfirmPassword] = useState("")

    // const currPassToAsterisks = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setCurrPassword("*".repeat(e.target.value.length))
    // }
    // const newPassToAsterisks = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setNewPassword("*".repeat(e.target.value.length))
    // }
    // const confirmPassToAsterisks = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setConfirmPassword("*".repeat(e.target.value.length))
    // }

    const storeCurrPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrPassword(e.target.value)
    }
    const storeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value)
    }
    const storeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        changePassword(displayNewPassword); //returns the new password
    }

    return (
        <div style={modalOverlay} onClick={onClose}>
            <div style={modalContent} onClick={(e) => e.stopPropagation()}>
                {/* <button style={closeBtn} onClick={onClose}>x</button> */}
                <div style={innerModalContent}>\
                    <form onSubmit={handleSubmit}>
                        <label style={labelStyles}>Current Password: </label>
                        <input type="password" name="curr_password" value={displayCurrPassword} style={textInputStyle} onChange={storeCurrPassword} />
                        <label style={labelStyles}>New Password: </label>
                        <input type="password" name="new_password" value={displayNewPassword} style={textInputStyle} onChange={storeNewPassword} />
                        <label style={labelStyles}>Confirm Password: </label>
                        <input type="password" name="confirm_password" value={displayConfirmPassword} style={textInputStyle} onChange={storeConfirmPassword} />
                        <button style={submitBtnStyle}>Submit</button>
                    </form>

                </div>
            </div>
        </div>

    );
};

export default Modal