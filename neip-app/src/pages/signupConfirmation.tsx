// "use client";

import React, { useState, useEffect } from 'react';
// import AuthEntryBox from '../app/components/AuthEntryBox';
import AuthButton from '../app/components/AuthButton';
import AuthBox from '../app/components/AuthBox';
import Link from 'next/link';
// import { Checkmark } from 'react-checkmark' //importing the checkmark

const SignupConfirmation: React.FC = () => {
    return (
        <AuthBox prop={<SignupConfirmationContent />}/>
    );
}

const SignupConfirmationContent: React.FC = () => {
    //chat: React.FC
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
                    // paddingBottom: '10px',
                }}>
                    Signup
                </h1>

            {/* Account made! Box */}
            <div style = {{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#C6DEC7',
                // padding: '10px 20px',
                width: '300px',
                height: '35px',
                // marginTop: '15px',
                marginBottom: '-40px',
                // top: '238px',
                // left: '69px',    
            }}> 

            {/* Account made! text */}
            <h2 style = {{
                fontSize: '17px',
                color: '#49C151',
                margin: 0,
                }}>
                    Account made!
                </h2>
            </div >

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