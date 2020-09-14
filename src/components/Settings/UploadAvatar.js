import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import NoAvatar from "../../assets/png/user.png";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import firebase from "../../utils/firebase";
import "firebase/storage";
import "firebase/auth";

export default function UploadAvatar(props) {
  const { user } = props;
  const [avatarURL, setAvatarURL] = useState(user.photoURL);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setAvatarURL(URL.createObjectURL(file));
    upLoadImage(file).then(() => {
      updatedUserAvatar();
    });
  });

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const upLoadImage = (file) => {
    const ref = firebase.storage().ref().child(`avatar/${user.uid}`);
    return ref.put(file); //ponemos el return para no cortar la ejecución de la funcion onDrop
  };

  const updatedUserAvatar = () => {
    firebase
      .storage()
      .ref(`avatar/${user.uid}`)
      .getDownloadURL()
      .then((response) => {
        firebase.auth().currentUser.updateProfile({ photoURL: response });
      })
      .catch(() => {
        toast.error("Error al actualizar el avatar");
      });
  };

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoAvatar} />
      ) : (
        <Image src={avatarURL ? avatarURL : NoAvatar} />
      )}
    </div>
  );
}
