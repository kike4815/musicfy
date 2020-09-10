import React, { useState } from "react";
import { Form, Button, Icon, Input } from "semantic-ui-react";
import { validateEmail } from "../../../utils/validation";
import firebase from "../../../utils/firebase";
import "firebase/auth";

import "./RegisterForm.scss";

export default function RegsiterForm(props) {
  const { setSelectedForm } = props;
  const [formData, setFormData] = useState(defautlValuesForm());
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
    if (!formData.username) {
      errors.username = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log("Registro completado");
        })
        .catch(() => {
          console.log("Error al registrarse");
        })
        .finally(() => {
          setIsLoading(false);
          setSelectedForm(null);
        });
    }
  };

  function defautlValuesForm() {
    return {
      email: "",
      password: "",
      username: "",
    };
  }

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="correo electrónico"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, introduce un email válido
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            error={formError.password}
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
          {formError.password && (
            <span className="error-text">
              Por favor, introduce un password de longitud igual o superior a 6
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="nombre que desees poner"
            icon="user circle outline"
            error={formError.username}
          />
          {formError.username && (
            <span className="error-text">Por favor, introduce un usuario</span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Continuar
        </Button>
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
