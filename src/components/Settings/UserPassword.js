import React from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";

export default function UserPassword(props) {
  const { setshowModal, setTitlemodal, setContentModal } = props;

  const onEdit = () => {
    setTitlemodal("Actualizar Contraseña");
    setContentModal(<ChangePassword />);
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

function ChangePassword() {
  const onSubmit = () => {
    console.log("cambiando contraseña");
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Contraseña actual"
          type="password"
          icon={<Icon name="eye" link />}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Nueva contraseña"
          type="password"
          icon={<Icon name="eye" link />}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Repetir Nueva contraseña"
          type="password"
          icon={<Icon name="eye" link />}
        />
      </Form.Field>
      <Button type="submit">Actualizar contraseña</Button>
    </Form>
  );
}
