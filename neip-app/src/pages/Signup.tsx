import React, { useState } from 'react';
import AuthEntryBox from '../app/components/AuthEntryBox';
import AuthButton from '../app/components/AuthButton';
import AuthBox from '../app/components/AuthBox';
import { useRouter } from 'next/router';
import Link from 'next/link';


const Signup: React.FC = () => {
    return (
        <AuthBox prop={<SignupContent />} size={{height: '538px' }} />
    );
}

const SignupContent = () => {
    // const router = useRouter(); 

    // const handleSignup = () => {
    //     router.push('/signupConfirmation');
    // };

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

            <div>
                {/* User credentials text */}
                <h2 style = {{
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'black',
                    paddingBottom: '10px',
                }}>
                    User Credentials
                </h2>
            </div>

            {/* user ID input */}
            <div style = {{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                height: '20px',
                width: '375px',
                padding: '27px',
            }}>
                <AuthEntryBox placeholder="user ID" type="text" />
            </div >

            {/* email input */}
            <div style = {{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                height: '20px',
                width: '375px',
                padding: '27px',
            }}>
                <AuthEntryBox placeholder="email" type="email" />
            </div>

            {/* position input */}
            <div style = {{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                height: '20px',
                width: '375px',
                padding: '27px',
            }}>
                <AuthEntryBox placeholder="new user position" type="text" />
            </div>

            {/* password input */}
            <div style = {{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                height: '20px',
                width: '375px',
                padding: '27px',
            }}>
                <AuthEntryBox placeholder="password" type="password" /> 
            </div>

            {/* sign up button */}
            <div style = {{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                padding: '15px',
            }}>
                 <AuthButton color='#43b4ef' filled={true} text='Sign Up' href="/signupConfirmation"/>
            </div>
        </div>
    );
}

export default Signup;
