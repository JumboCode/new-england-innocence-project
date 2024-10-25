import React, { useState } from 'react';
import AuthEntryBox from '../app/components/AuthEntryBox';
import AuthButton from '../app/components/AuthButton';
import AuthBox from '../app/components/AuthBox';
import Link from 'next/link';

// const [login, email, pasword] = useState('')



const Signup: React.FC = () => {
    return (
        <AuthBox prop={<SignupContent />} size={{height: '525px' }} />
    );
}

const SignupContent = () => {
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
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: 'black',
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
                padding: '30px',
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
                padding: '30px',
            }}>
                <AuthEntryBox placeholder="email" type="email" />
            </div>
            <div style = {{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                height: '20px',
                width: '375px',
                padding: '30px',
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
                padding: '30px',
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
                <Link href="/signupConfirmation">
                    <AuthButton color = '#43b4ef' filled = {true} text = 'Sign Up'/>
                 </Link>
            </div>
        </div>
    );
}

export default Signup;
 

