import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Image, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import NoImage from "../../../assets/png/no-image.png";
import firebase from "../../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";
import "./AddAlbumForm.scss";
import { map } from "lodash";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const db = firebase.firestore(firebase);

export default function AddAlbum(props) {
  const { setShowModal } = props;
  const [albumImage, setAlbumImage] = useState(null);
  const [file, setFile] = useState(null);
  const [artists, setArtists] = useState([]);
  const [formData, setFormData] = useState(initialValueForm);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        const ArrayArtists = [];
        map(response?.docs, (artist) => {
          const data = artist.data();
          ArrayArtists.push({
            key: artist.id,
            value: artist.id,
            text: data.name,
          });
        });
        setArtists(ArrayArtists);
      });
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setAlbumImage(URL.createObjectURL(file));
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    accept: "image/jpeg,image/png",
    noKeyboard: true,
    onDrop,
  });

  const uploadImage = (filename) => {
    const ref = firebase.storage().ref().child(`album/${filename}`);
    return ref.put(file);
  };

  const resetForm = () => {
    setFormData(initialValueForm());
    setFile(null);
    setAlbumImage(null);
  };

  const onSubmit = () => {
    if (!formData.name || !formData.artist) {
      toast.warning("El nombre del album y del artista son obligatorios");
    } else if (!file) {
      toast.warning("La imagen del album es obligatoria");
    } else {
      setIsLoading(true);
      const fileName = uuidv4();
      uploadImage(fileName)
        .then(() => {
          db.collection("album")
            .add({
              name: formData.name,
              artist: formData.artist,
              banner: fileName,
            })
            .then(() => {
              setIsLoading(false);
              toast.success("album creado");
              resetForm();
              setShowModal(false);
            })
            .catch(() => {
              toast.warning("Error al crear el album");
              setIsLoading(false);
            });
        })
        .catch(() => {
          toast.warning("Error al subir la imagen");
          setIsLoading(false);
        });
    }
  };
  return (
    <Form className="add-album-form" onSubmit={onSubmit}>
      <Form.Group>
        <Form.Field className="album-avatar" width={5}>
          <div
            {...getRootProps()}
            className="avatar"
            style={{ backgroundImage: `url('${albumImage}')` }}
          />
          <input {...getInputProps()} />
          {!albumImage && <Image src={NoImage} />}
        </Form.Field>
        <Form.Field className="album-inputs" width={11}>
          <Input
            placeholder="nombre del album"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Dropdown
            placeholder="el album pertenece..."
            search
            fluid
            selection
            options={artists}
            lazyLoad
            onChange={(e, data) =>
              setFormData({ ...formData, artist: data.value })
            }
          />
        </Form.Field>
      </Form.Group>
      <Button type="submit" loading={isLoading}>
        Crear Album
      </Button>
    </Form>
  );
}

function initialValueForm() {
  return {
    name: "",
    artist: "",
  };
}
