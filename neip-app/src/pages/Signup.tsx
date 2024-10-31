import React, { useState } from 'react';
import AuthEntryBox from '../components/AuthEntryBox';
import AuthButton from '../components/AuthButton';
import AuthBox from '../components/AuthBox';


const Signup: React.FC = () => {
    return (
        <AuthBox prop={<SignupContent />}/>
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
                    paddingBottom: '5px',
                    marginTop: '-19px',
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
                padding: '10px',
            }}>
                 <AuthButton color='#43b4ef' filled={true} text='Sign Up' href="/signupConfirmation"/>
            </div>
        </div>
    );
}

export default Signup;
