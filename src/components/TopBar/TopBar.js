import React, { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import UserImage from "../../assets/png/user.png";
import BasicModal from "../Modal/BasicModal/BasicModal";
import Logout from "../Logout";

import "./TopBar.scss";

function TopBar(props) {
  const { user, history } = props;
  const [showModal, setShowModal] = useState(false);

  const logout = () => {
    setShowModal(true);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar__left">
          <Icon name="angle left" onClick={goBack} />
        </div>
        <div className="top-bar__right">
          <Link to="/settings">
            <Image src={user.photoURL ? user.photoURL : UserImage} />
            {user.displayName}
          </Link>
          <Icon name="power off" onClick={logout} />
        </div>
      </div>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={"Cerrar Sesión"}
      >
        <Logout setShowModal={setShowModal} />
      </BasicModal>
    </>
  );
}

export default withRouter(TopBar);
