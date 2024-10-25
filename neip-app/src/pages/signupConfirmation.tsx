import React, { useState } from 'react';
import AuthEntryBox from '../app/components/AuthEntryBox';
import AuthButton from '../app/components/AuthButton';
import AuthBox from '../app/components/AuthBox';
import Link from 'next/link';

// import { Checkmark } from 'react-checkmark'

const SignupConfirmation: React.FC = () => {
    return (
        <AuthBox prop={<SignupConfirmationContent />}/>
    );
}

const SignupConfirmationContent = () => {
    return (
        <div>
            <div>
                {/* Sign up text */}
                <h1 style = {{
                    textAlign: 'center',
                    fontSize: '25px',
                    fontWeight: 'bold',
                    color: 'black',
                    paddingBottom: '10px',
                }}>
                    Signup
                </h1>
            </div>
                {/* Account made! Box */}
                <div style = {{
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'flex-start',
                backgroundColor: '#C6DEC7',
                // borderRadius: '8px',
                // padding: '5px 20px',
                // marginBottom: '15px',
                width: '400px', 
                height: '45px',
                top: '238px',
                left: '69px',    
                
            }}> 
            {/* Account made! text */}
            <h2 style = {{
                textAlign: 'center',
                fontSize: '20px',
                color: '#49C151',
                height: '60px',
                // paddingBottom: '5px',
                weight: '500px',
                align: 'center',
                }}>
                    Account made!
                </h2>
                {/* <AuthEntryBox placeholder="user ID" type="number" /> */}
            </div >
            {/* You will get an email confirmation... text */}
            <h3 style = {{
                display: 'flex',
                justifyContent: 'left', 
                alignItems: 'center',
                height: '20px',
                width: '375px',
                padding: '30px',
                color: '#B6B5B5',
            }}>
                You will get an email confirmation...
            </h3>
            {/* Please note that you can manage users */}
            <h3 style = {{
                display: 'flex',
                justifyContent: 'left', 
                alignItems: 'center',
                height: '20px',
                width: '375px',
                padding: '30px',
                color: '#B6B5B5',
                fontStyle: 'italic',
            }}>
                *Please note that you can manage users
            </h3>
            {/* in the users section of the profile page */}
            <h3 style = {{
                display: 'flex',
                justifyContent: 'left', 
                alignItems: 'center',
                height: '20px',
                width: '375px',
                padding: '30px',
                color: '#B6B5B5',
                fontStyle: 'italic',
            }}>
                in the users section of the profile page
            </h3>
            {/* <div>
                
            </div> */}
            {/* password input */}
            {/* <div style = {{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                height: '20px',
                width: '375px',
                padding: '30px',
            }}>
                <AuthEntryBox placeholder="password" type="password" /> 
            </div> */}
            {/* Next Button */}
            <div style = {{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                padding: '30px',
            }}>
                {/* <Link href="TBD - it doesn't need to link to anything for now"> */}
                    <AuthButton color = '#43b4ef' filled = {true} text = 'Next'/>
                 {/* </Link> */}
            </div>
        </div>
    );
}

export default SignupConfirmation;