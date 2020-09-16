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
  const [userActive, setUserActive] = useState(true);

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
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          setUser(response.user);
          setUserActive(response.user.emailVerified);
          if (!response.user.emailVerified) {
            toast.warning("Para poder loggear antes debes verificar la cuenta");
          }
        })
        .catch((err) => {
          handleErrors(err.code);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
          handleErrors(error.code);
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

  function handleErrors(code) {
    switch (code) {
      case "auth/wrong-password":
        toast.warning("El usuario o contraseña son incorrectos");
        break;
      case "auth/too-many-requests":
        toast.warning(
          "has enviado demasiadas solicitudes de reenvio del email de confimarción en poco tiempo"
        );
        break;
      case "auth/user-not-found": {
        toast.warning("El usuario o contraseña son incorrectos");
        break;
      }
      default:
        break;
    }
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
        <Button type="submit" loading={isLoading}>
          Iniciar sesión
        </Button>
      </Form>
      {!userActive && (
        <ButtonreSendEmailVerification
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
        />
      )}
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
