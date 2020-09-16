import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/firebase";
import "firebase/auth";

export default function UserName(props) {
  const {
    user,
    setshowModal,
    setTitlemodal,
    setContentModal,
    setReloadApp,
  } = props;

  const onEdit = () => {
    setTitlemodal("Actualizar Nombre de Usuario");
    setContentModal(
      <ChangeDisplayNameform
        displayName={user.displayName}
        setshowModal={setshowModal}
        setReloadApp={setReloadApp}
      />
    );
    setshowModal(true);
  };

  return (
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}

function ChangeDisplayNameform(props) {
  const { displayName, setshowModal, setReloadApp } = props;
  const [formData, setFormData] = useState({ displayName: displayName });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (!formData.displayName || formData.displayName === displayName) {
      setshowModal(false);
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: formData.displayName })
        .then(() => {
          setReloadApp((prevState) => !prevState);
          toast.success("Nombre actualizado");
          setIsLoading(false);
          setshowModal(false);
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("error al actualizar el nombre");
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={displayName}
          onChange={(e) => setFormData({ displayName: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Actualizar nombre
      </Button>
    </Form>
  );
}
