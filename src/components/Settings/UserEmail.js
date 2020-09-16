import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";

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

  const onSubmit = () => {
    console.log("enviando");
    setshowModal(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input defaultValue={email} type="text" />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Contraseña"
          type={showPassword ? "text" : "password"}
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
      <Button type="submit">Actualizar Contraseña</Button>
    </Form>
  );
}
