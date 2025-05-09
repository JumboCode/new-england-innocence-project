"use client";

import { FC, ReactNode } from "react";
import Image from "next/image";
// import logo from "./caseview_logo.png";
import logo from "./exonereenetwork_logo.png";

interface AuthBoxProps {
    prop: ReactNode; // The prop is a React component
    height?: {height: string}; // Allows for height adjustment
    width?: {width: string};
}

const AuthBox: FC<AuthBoxProps> = ({ prop, height, width }) => {
    return (
        <div style={{
            // Create the rectangular shape for the AuthBox
            width: width?.width || '400px', 
            height: height?.height || '525px', // Adjuted height or given height
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
            {/* Import logo at top of the page */}
            <div style={{marginTop: '20px'}}>
                <Image src={logo} alt="CaseView Logo" width={300}/>
            </div>

            {/* Allows for prop to be passed */}
            <div style={{padding: '10px'}}>
                {prop}
            </div>
        </div>
    );
}

export default AuthBox;