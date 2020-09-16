import { toast } from "react-toastify";

export default function alertErrors(type) {
  switch (type) {
    case "auth/wrong-password":
      toast.warning("La contraseña introducida no es correcta");
      break;
    case "auth/email-already-in-use":
      toast.warning("el nuevo email ya está en uso");
      break;

    default:
      toast.warning("Error en el servidor, intentelo más tarde");
      break;
  }
}
