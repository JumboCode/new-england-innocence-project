"use client";

import React, { useState } from "react";
import AuthBox from "../components/AuthBox";
import AuthButton from "../components/AuthButton";
import AuthEntryBox from "../components/AuthEntryBox";
import Modal from '@/components/ChangePasswordModal'
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";

const LoginPage: React.FC = () => {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  // Get redirect path from query string: ?redirect=/dashboard
  const redirectTo = typeof router.query.redirect === "string" ? router.query.redirect : "/";

  const handleLogin = async () => {
    if (!isLoaded) return;

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

      if (signInResult.status === "complete") {
        router.push(redirectTo); // ✅ use dynamic redirect
      } else {
        alert("Login incomplete. Please try again.");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      alert(`Login failed. ${err.errors ? err.errors[0].message : "Please check your credentials."}`);
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
