"use client";

import React, { useEffect } from 'react'; 
import dynamic from 'next/dynamic'; // Import dynamic for client-side rendering
import AuthButton from '../components/AuthButton';
import AuthBox from '../components/AuthBox';

// Dynamically import the Checkmark component with SSR disabled
const Checkmark = dynamic(() => import('react-checkmark').then(mod => mod.Checkmark), { ssr: false });

const SignupConfirmation: React.FC = () => {
    return (
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f4f4f4',
        }}
        >
            <AuthBox prop={<SignupConfirmationContent />}/>
        </div>
    );
}

const SignupConfirmationContent: React.FC = () => {
    useEffect(() => {
        console.log("Signup Confirmation Page Mounted");
    }, []);

    return (
        <div style = {{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            width: '100%', 
            padding: '10px',
        }}>
            {/* Sign Up Title */}
                <h1 style = {{
                    fontSize: '25px',
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                }}>
                    Signup
                </h1>

            {/* Account made! Box */}
            <div style = {{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#C6DEC7',
                width: '300px',
                height: '35px',
                marginBottom: '-40px',
                gap: '10px', 
            }}> 

            {/* Checkmark */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
            }}>
            <Checkmark size="medium" color="#49C151" /> 
            </div>

            {/* Account made! text */}
            <div style ={{
                flex: 1, // Take up the remaining space to push content to the center
                display: 'flex',
                padding: '15%',
            }}>
            <h2 style = {{
                fontSize: '17px',
                color: '#49C151',
                margin: 0,
                }}>
                    Account made!
                </h2>
            </div>
        </div>

            {/* Informational Text */}
            <div
                style={{
                    width: '375px',
                    textAlign: 'left',
                    color: '#B6B5B5',
                    fontSize: '15px',
                    padding: '39px',
                    lineHeight: '3',
                }}
            >
                <p>You will get an email confirmation...</p>
                <p style={{ 
                    fontStyle: 'italic', 
                }}>
                    *Please note that you can manage users
                </p>
                <p style={{ 
                    fontStyle: 'italic',
                }}>
                    in the users section of the profile page
                </p>
            </div>

            {/* Next Button */}
            <div style = {{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                padding: '30px',
                marginTop: '-75px',
            }}>
                {/* <Link href="TBD - it doesn't need to link to anything for now"> */}
                    <AuthButton color = '#43b4ef' filled = {true} text = 'Next'/>
                 {/* </Link> */}
            </div>
        </div>
    );
}

export default SignupConfirmation;