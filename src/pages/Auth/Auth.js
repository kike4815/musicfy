import React, { useState } from "react";
import AuthOptions from "../../components/Auth/AuthOptions";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";

export default function Auth() {
  const [loginForm, setLoginForm] = useState(null);

  const handleForm = () => {
    switch (loginForm) {
      case "login":
        return <LoginForm />;

      case "register":
        return <RegisterForm />;

      default:
        return <AuthOptions />;
    }
  };

  return <div className="auth"></div>;
}
