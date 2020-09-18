import React, { useState, useCallback } from "react";
import { Form, Button, Input, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import NoImage from "../../../assets/png/no-image.png";
import { toast } from "react-toastify";
import firebase from "../../../utils/firebase";
import "firebase/storage";
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import "./AddArtistForm.scss";

const db = firebase.firestore(firebase);

export default function AddArtistForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialValuesForm());
  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFile(file);
    setBanner(URL.createObjectURL(file));
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const uploadImage = (filename) => {
    const ref = firebase.storage().ref().child(`artists/${filename}`);
    return ref.put(file);
  };

  const onSbumit = () => {
    if (!formData.name) {
      toast.warning("Añade el nombre del artista");
    } else if (!file) {
      toast.warning("añade la imagen del artista");
    } else {
      setIsLoading(true);
      const filename = uuidv4();
      uploadImage(filename)
        .then(() => {
          db.collection("artists")
            .add({ name: formData.name, banner: filename })
            .then(() => {
              toast.success("artista creado correctamente");
              resetForm();
              setIsLoading(false);
              setShowModal(false);
            })
            .catch(() => {
              toast.error("error al crear al artista");
              setIsLoading(false);
            });
        })
        .catch(() => {
          toast.error("error al subir la imagen");
          setIsLoading(false);
        });
    }
  };

  const resetForm = () => {
    setFormData(initialValuesForm());
    setFile(null);
    setBanner(null);
  };

  return (
    <Form className="add-artist-form" onSubmit={onSbumit}>
      <Form.Field className="artist-banner">
        <div
          {...getRootProps()}
          className="banner"
          style={{ backgroundImage: `url(${banner})` }}
        />
        <input {...getInputProps()} />
        {!banner && <Image src={NoImage} />}
      </Form.Field>
      <Form.Field className="artist-avatar">
        <div
          className="avatar"
          style={{ backgroundImage: `url(${banner ? banner : NoImage})` }}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="nombre del artista"
          onChange={(e) => setFormData({ name: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Crear Artista
      </Button>
    </Form>
  );
}

function initialValuesForm() {
  return {
    name: "",
  };
}
