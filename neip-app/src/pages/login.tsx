// pages/LoginPage.tsx
"use client";

import React from 'react';
import AuthBox from '../app/components/AuthBox';
import AuthButton from '../app/components/AuthButton';
import AuthEntryBox from '../app/components/AuthEntryBox';

const LoginPage: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4',
    }}>
      <AuthBox prop={
        <div style={{ textAlign: 'center', width: '100%' }}>
          {/* Login Heading */}
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
            margin: '20px 0',
            color: '#333'
          }}>Login</h2>

          {/* User ID Entry */}
          <div style={{ width: '100%', marginBottom: '15px' }}>
            <AuthEntryBox placeholder="user ID" />
          </div>

          {/* Password Entry */}
          <div style={{ width: '100%', marginBottom: '5px' }}>
            <AuthEntryBox placeholder="password" type="password" />
          </div>

          {/* Reset Password Text */}
          <div style={{
            textAlign: 'right',
            width: '100%',
            fontSize: '12px',
            color: '#a3a3a3',
            cursor: 'pointer',
            marginBottom: '20px'
          }}>
            Reset password
          </div>

          {/* Login Button */}
          <AuthButton color="#3b82f6" filled={true} text="Login" href=''/>
        </div>
      }/>
    </div>
  );
}

export default LoginPage;
