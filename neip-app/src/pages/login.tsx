// pages/LoginPage.tsx
"use client";

import React, { useState } from 'react';
import AuthBox from '../components/AuthBox';
import AuthButton from '../components/AuthButton';
import AuthEntryBox from '../components/AuthEntryBox';
import { useRouter } from 'next/router';
import { createClerkClient } from "@clerk/clerk-sdk-node";

import { useSignIn, useAuth } from '@clerk/nextjs';

const LoginPage: React.FC = () => {

  const { signIn, isLoaded } = useSignIn();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const clerkClient = createClerkClient({
    secretKey: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API, 
  });

  const handleLogin = async () => {
    if (!isLoaded) return;
  
    if (isSignedIn) {
      alert("You are already logged in!");
      return;
    }
  
    try {
      const { data: users } = await clerkClient.users.getUserList();
      const user = users.find((u) => 
        u.emailAddresses.some((e) => e.emailAddress === userId)
      );
  
      if (!user) {
        alert("User not found. Please sign up first.");
        return;
      }
  
      const emailVerified = user.emailAddresses.some(
        (e) => e.emailAddress === userId && e.verification?.status === "verified"
      );
  
      if (!emailVerified) {
        alert("Your email is not verified. Please check your email and verify your account.");
        return;
      }
  
      const result = await signIn.create({
        identifier: userId,
        password: password,
        strategy: "password",
      });
  
      if (result.status === "complete") {
        router.push("/dashboard");
        alert("Login successful!");
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      alert(`Login failed. ${err.errors ? err.errors[0].message : "Please check your credentials."}`);
      router.push("/login");
    }
  };

  
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
            <AuthEntryBox placeholder="user ID" onChange={(e) => setUserId(e.target.value)} />
          </div>

          {/* Password Entry */}
          <div style={{ width: '100%', marginBottom: '5px' }}>
            <AuthEntryBox placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
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
          <AuthButton color="#3b82f6" filled={true} text="Login" onClick={handleLogin} />
        </div>
      }/>
    </div>
  );
}

export default LoginPage;
