import React from "react";
import { Button } from "semantic-ui-react";
import firebase from "../../utils/firebase";
import "firebase/auth";

import "./Logout.scss";

export default function Logout(props) {
  const { setShowModal } = props;

  const logOut = () => {
    firebase.auth().signOut();
  };
  const cancelLogOut = () => {
    setShowModal(false);
  };
  return (
    <div className="log-out">
      <p>¿Está seguro que quiere cerrar la sesión?</p>

      <Button className="accept" onClick={logOut}>
        Si
      </Button>
      <Button className="cancel" onClick={cancelLogOut}>
        No
      </Button>
    </div>
  );
}
