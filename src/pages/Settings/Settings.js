import React, { useState, useEffect } from "react";
import UploadAvatar from "../../components/Settings/UploadAvatar";
import UserName from "../../components/Settings/UserName";

import "./Settings.scss";

export default function Settings(props) {
  const { user, setReloadApp } = props;

  return (
    <div className="settings">
      <h1>Configuración</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} setReloadApp={setReloadApp} />
        <UserName user={user} />
      </div>
    </div>
  );
}
