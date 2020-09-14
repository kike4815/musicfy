import React, { useState, useEffect } from "react";
import UploadAvatar from "../../components/Settings/UploadAvatar";
import "./Settings.scss";

export default function Settings(props) {
  const { user } = props;

  return (
    <div className="settings">
      <h1>Configuración</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} />
        <h2>User Name</h2>
      </div>
    </div>
  );
}
