import React, { useState, useEffect } from "react";
import UploadAvatar from "../../components/Settings/UploadAvatar";
import UserName from "../../components/Settings/UserName";
import BasicModal from "../../components/Modal/BasicModal";
import UserEmail from "../../components/Settings/UserEmail";
import UserPassword from "../../components/Settings/UserPassword";
import "./Settings.scss";

export default function Settings(props) {
  const { user, setReloadApp } = props;
  const [showModal, setshowModal] = useState(false);
  const [titlemodal, setTitlemodal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  return (
    <div className="settings">
      <h1>Configuración</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} setReloadApp={setReloadApp} />
        <UserName
          user={user}
          setshowModal={setshowModal}
          setTitlemodal={setTitlemodal}
          setContentModal={setContentModal}
          setReloadApp={setReloadApp}
        />
      </div>
      <div>
        <UserEmail
          user={user}
          setshowModal={setshowModal}
          setTitlemodal={setTitlemodal}
          setContentModal={setContentModal}
        />
        <UserPassword
          setshowModal={setshowModal}
          setTitlemodal={setTitlemodal}
          setContentModal={setContentModal}
        />
        <BasicModal show={showModal} setShow={setshowModal} title={titlemodal}>
          {contentModal}
        </BasicModal>
      </div>
    </div>
  );
}
