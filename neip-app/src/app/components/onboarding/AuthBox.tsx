"use client";

import { FC, ReactNode } from "react";
import Image from "next/image";
import logo from "../caseview_logo.png";

interface AuthBoxProps {
    prop: ReactNode; // The prop is a React component
}

const AuthBox: FC<AuthBoxProps> = ({ prop }) => {
    return (
        <div style={{
            // Create the rectangular shape for the AuthBox
            width: '400px', 
            height: '475px',
            border: '2.5px solid', // Gray edge on the border
            borderColor: 'rgba(200,200,200,255)', // Border color
            borderRadius: '20px', // Curved edge on the border
            backgroundColor: 'white', // Color of rectangle
            display: 'flex',
            flexDirection: 'column', // Change the direction to column
            justifyContent: 'flex-start', // Align items to the top
            alignItems: 'center', // Center items horizontally
            padding: '15px'
        }}>
            {/* <div style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '20px', // Add margin to move it down from the top
                marginBottom: '10px' // Add space below the logo and the prop below
            }}> */}

                {/* Import logo at top of the page */}
                    <div style={{marginTop: '20px'}}>
                        <Image src={logo} alt="CaseView Logo" width={180} height={60}/>
                    </div>

                    <div style={{padding: '30px'}}>
                        {prop}
                    </div>
        
            {/* </div> */}
        </div>
    );
}

export default AuthBox;