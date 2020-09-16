import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/firebase";
import "firebase/auth";
import { reauthenticate } from "../../utils/api";
import AlertError from "../../utils/alertError";

export default function UserPassword(props) {
  const { setshowModal, setTitlemodal, setContentModal } = props;

  const onEdit = () => {
    setTitlemodal("Actualizar Contraseña");
    setContentModal(<ChangePassword setshowModal={setshowModal} />);
    setshowModal(true);
  };
  return (
    <div className="user-password">
      <h3>Contraseña: *** *** ***</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}

function ChangePassword(props) {
  const { setshowModal } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const onSubmit = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      toast.warning("Las contraseñas no pueden estar vacías");
    } else if (formData.currentPassword === formData.newPassword) {
      toast.warning("la nueva contraseña no puede ser igual a la anterior");
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      toast.warning("las nuevas contraseñas deben ser iguales");
    } else if (formData.newPassword.length < 6) {
      toast.warning("la contraseña debe tener mínimo 6 caracteres");
    } else {
      setIsLoading(true);
      reauthenticate(formData.currentPassword)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updatePassword(formData.newPassword)
            .then(() => {
              toast.success("Contraseña actualizada");
              setIsLoading(false);
              setshowModal(false);
              firebase.auth().signOut();
            })
            .catch((err) => {
              AlertError(err?.code);
              setIsLoading(false);
            });
        })
        .catch((err) => {
          AlertError(err?.code);
          setIsLoading(false);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Contraseña actual"
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Nueva contraseña"
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Repetir Nueva contraseña"
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setFormData({ ...formData, repeatNewPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Actualizar contraseña
      </Button>
    </Form>
  );
}
