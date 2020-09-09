import React, { useState } from "react";
import AuthOptions from "../../components/Auth/AuthOptions";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";

import BackgroundAuth from "../../assets/jpg/background-auth.jpg";
import LogoNamewhite from "../../assets/png/logo-name-white.png";

import "./Auth.scss";

export default function Auth() {
  const [selectedForm, setSelectedForm] = useState(null);

  const handleForm = () => {
    switch (selectedForm) {
      case "login":
        return <LoginForm />;

      case "register":
        return <RegisterForm setSelectedForm={setSelectedForm} />;

      default:
        return <AuthOptions setSelectedForm={setSelectedForm} />;
    }
  };

  return (
    <div className="auth" style={{ backgroundImage: `url(${BackgroundAuth})` }}>
      <div className="auth__dark" />
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={LogoNamewhite} alt="MusicFy" />
        </div>
        {handleForm()}
      </div>
    </div>
  );
}
