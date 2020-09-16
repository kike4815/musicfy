import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate } from "../../utils/api";
import firebase from "../../utils/firebase";
import "firebase/auth";
import alertErrors from "../../utils/alertError";

export default function UserEmail(props) {
  const { user, setshowModal, setTitlemodal, setContentModal } = props;

  const onEdit = () => {
    setTitlemodal("Actualizar Email");
    setContentModal(
      <ChangeEmailForm email={user.email} setshowModal={setshowModal} />
    );
    setshowModal(true);
  };
  return (
    <div className="user-email">
      <h3>Email : {user.email}</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}

function ChangeEmailForm(props) {
  const { email, setshowModal } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (!formData.email) {
      toast.warning("El email es el mismo");
    } else {
      setIsLoading(true);
      reauthenticate(formData.password)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updateEmail(formData.email)
            .then(() => {
              toast.success("Email actualizado");
              setIsLoading(false);
              setshowModal(false);
              currentUser.sendEmailVerification().then(() => {
                firebase.auth().signOut();
              });
            })
            .catch((err) => {
              alertErrors(err?.code);
              setIsLoading(false);
            });
        })
        .catch((err) => {
          alertErrors(err?.code);
          setIsLoading(false);
        });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={email}
          type="text"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Contraseña"
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          icon={
            showPassword ? (
              <Icon
                name="eye slash outline"
                link
                onClick={handleShowPassword}
              />
            ) : (
              <Icon name="eye" link onClick={handleShowPassword} />
            )
          }
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Actualizar Email
      </Button>
    </Form>
  );
}
