"use client";

import React, { useState, useEffect } from "react";
import AuthBox from "../components/AuthBox";
import AuthButton from "../components/AuthButton";
import AuthEntryBox from "../components/AuthEntryBox";
import Modal from '@/components/ChangePasswordModal'
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs';

const LoginPage: React.FC = () => {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [redirectTo, setRedirectTo] = useState("/");
  useEffect(() => {
    console.log('IN THIS USE EFFECT');
    if (!isLoaded) return;
    console.log(`At login page`)
    console.log(`isLoaded: ${isLoaded}`)
    console.log(`isSignedIn: ${isSignedIn}`)
    if (isSignedIn) {
      router.push(`/`);
    }
    console.log(redirectTo)
  }, [isLoaded, isSignedIn, router, redirectTo]);

  useEffect(() => {
    console.log("HI")
    console.log(`isSignedIn: ${isSignedIn}`)
  }, [isSignedIn]);

  useEffect(() => {
    if (typeof router.query.redirect === "string") {
      setRedirectTo(router.query.redirect)
    }


  }, [router.query.redirect]);

  const handleLogin = async () => {
    if (!isLoaded) return;
    console.log(`handling login`)
    console.log(`isSignedInNow before login: ${isSignedIn}`)

    try {
      const response = await fetch("/api/auth/checkUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.error || "Error checking user");
        return;
      }

      if (!result.emailVerified) {
        alert("Your email is not verified. Please verify your email.");
        return;
      }

      const signInResult = await signIn.create({
        identifier: email,
        password,
        strategy: "password",
      });

      console.log("sign in result:", signInResult.status)
      if (signInResult.status === "complete") {
        alert("Successfully logged in!");

        window.location.reload();
      } else {

        alert("Login incomplete. Please try again.");
        router.push('/login');
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      alert(`Login failed. ${err.errors ? err.errors[0].message : "Please check your credentials."}`);
      router.push('/login');
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
    }}>
      <AuthBox prop={
        <div style={{ textAlign: "center", width: "100%" }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            margin: "20px 0",
            color: "#333"
          }}>Login</h2>

          <div style={{ width: "100%", marginBottom: "15px" }}>
            <AuthEntryBox placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div style={{ width: "100%", marginBottom: "5px" }}>
            <AuthEntryBox placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div style={{
            textAlign: "right",
            width: "100%",
            fontSize: "12px",
            color: "#a3a3a3",
            cursor: "pointer",
            marginBottom: "20px"
          }}>
            <button onClick={() => setModalOpen(true)}>
              Reset Password
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
          </div>

          <AuthButton color="#3b82f6" filled={true} text="Login" onClick={handleLogin} />
        </div>
      } />
    </div>
  );
};

export default LoginPage;
