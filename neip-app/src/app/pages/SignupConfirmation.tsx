import React, { useState } from 'react';
import AuthEntryBox from '../components/AuthEntryBox';
import AuthButton from '../components/AuthButton';

const SignupConfirmation: React.FC = () => {
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
            {/* <div> */}
                {/* User credentials text */}
                {/* <h2 style = {{
                    textAlign: 'center',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: 'black',
                }}>
                    User Credentials
                </h2>
            </div> */}
            {/* Account Made! Box */}
            <div style = {{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#C6DEC7',
                borderRadius: '8px',
                padding: '5px 20px',
                marginBottom: '15px',
                width: '400px', 
                height: '45px',         
            }}> 
            {/* Account Made! text */}
            <h2 style = {{
                    textAlign: 'center',
                    fontSize: '25px',
                    fontWeight: 'bold',
                    color: 'black',
                    paddingBottom: '10px',
                }}>
                    Account Made!
                </h2>
                {/* <AuthEntryBox placeholder="user ID" type="number" /> */}
            </div >
            {/* email input */}
            {/* <div style = {{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                height: '20px',
                width: '375px',
                padding: '30px',
            }}>
                <AuthEntryBox placeholder="email" type="email" />
            </div> */}
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