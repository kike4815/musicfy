import React from "react";
import { Form, Button, Icon, Input } from "semantic-ui-react";
import firebase from "../../../utils/firebase";
import "firebase/auth";

import "./RegisterForm.scss";

export default function RegsiterForm(props) {
  const { setSelectedForm } = props;

  const onSubmit = () => {
    console.log("Formulario enviado...");
  };

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis</h1>
      <Form onSubmit={onsubmit}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="correo electrónico"
            icon="mail outline"
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            icon="eye"
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="nombre que desees poner"
            icon="user circle outline"
          />
        </Form.Field>
        <Button type="submit">Continuar</Button>
      </Form>
      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          ¿Ya tienes Musicfy?
          <span onClick={() => setSelectedForm("login")}>Iniciar Sesión</span>
        </p>
      </div>
    </div>
  );
}
