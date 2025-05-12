import React, { useState } from "react";
import { SquareCheckBig } from "lucide-react";
import "./auth.css";
import LoginForm from "../components/loginForm";
import SignupForm from "../components/registerForm";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-header">
        <div className="logo">
          <SquareCheckBig color="#3b82f6" size={34} />
          <h1>ToDo App</h1>
        </div>
        <p>จัดระเบียบกิจกรรมของคุณ ทำให้ชีวิตคุณง่ายขึ้น</p>
      </div>
      <div className="auth-container">
        {showLogin ? (
          <LoginForm onSwitchToSignup={() => setShowLogin(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default Auth;
