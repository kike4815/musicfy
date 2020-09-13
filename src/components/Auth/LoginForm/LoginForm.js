import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/validation";
import firebase from "../../../utils/firebase";
import "firebase/auth";

import "./LoginForm.scss";

export default function LoginForm(props) {
  const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValues());
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [formError, setFormError] = useState({});
  const [userActive, setUserActive] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

    setFormError(errors);

    if (formOk) {
      console.log("logging correcto");
    }
  };

  function defaultValues() {
    return {
      email: "",
      password: "",
    };
  }

  function ButtonreSendEmailVerification(props) {
    const { user, setUserActive, setIsLoading } = props;

    const resendEmailVerification = () => {
      user
        .sendEmailVerification()
        .then(() => {
          toast.success("Se ha enviado el email de verificación");
        })
        .catch((error) => {
          //Error
        })
        .finally(() => {
          setIsLoading(false);
          setUserActive(true);
        });
    };
    return (
      <div className="resend-verification-email">
        <p>
          Si no has recibido el email de confirmación puedes volver a enviarlo
          desde <span onClick={resendEmailVerification}>aquí</span>
        </p>
      </div>
    );
  }

  return (
    <div className="login-form">
      <h1>Música para todos</h1>

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
              Por favor, pon un correo electrónico correcto
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="contraseña"
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
              Por favor, pon una contraseña superior a 5 caracteres
            </span>
          )}
        </Form.Field>
        <Button type="submit">Iniciar sesión</Button>
      </Form>
      <div className="login-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          No tienes cuenta?{" "}
          <span onClick={() => setSelectedForm("register")}>Regístrate</span>
        </p>
      </div>
    </div>
  );
}
