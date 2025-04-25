import React, { useEffect } from "react";
import AuthBox from '../components/AuthBox';
import AuthButton from "../components/AuthButton";
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';

const WelcomePage: React.FC = () => {

  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(`/login?redirect=${encodeURIComponent('/welcome')}`);
    }
  }, [isLoaded, isSignedIn, router]);

  const textStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
    marginTop: "20px",
    marginBottom: "30px",
    color: '#333',
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "15px",
    marginTop: "20px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      {/* Using AuthBox to wrap content */}
      <AuthBox
        prop={
          <div style={{ textAlign: "center" }}>
            <div style={textStyle}>Welcome!</div>

            {/* Buttons for Login and Signup */}
            <div style={buttonContainerStyle}>
              <AuthButton color="#1E90FF" filled={true} text="Login" href="/login" />
              <AuthButton color="#1E90FF" filled={false} text="Signup" href="/Signup" />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default WelcomePage;
