import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Icon, Dropdown } from "semantic-ui-react";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";
import { map } from "lodash";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import "./AddSongForm.scss";

const db = firebase.firestore(firebase);

export default function AddSongForm(props) {
  const { setShowModal } = props;
  const [albums, setAlbums] = useState([]);
  const [file, setFile] = useState(null);
  const [formDAta, setFormDAta] = useState(initialvalueForm());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    db.collection("album")
      .get()
      .then((response) => {
        const albumArray = [];
        map(response?.docs, (album) => {
          const data = album.data();
          albumArray.push({
            key: album.id,
            value: album.id,
            text: data.name,
          });
        });
        setAlbums(albumArray);
      });
  }, []);

  const uploadImage = (filename) => {
    const ref = firebase.storage().ref().child(`song/${filename}`);
    return ref.put(file);
  };

  const resetForm = () => {
    setFormDAta(initialvalueForm());
    setFile(null);
    setAlbums([]);
  };

  const onSubmit = () => {
    if (!formDAta.name || !formDAta.album) {
      toast.warning(
        "El nombre de la canción y el álbum al que pertenece son obligatorios"
      );
    } else if (!file) {
      toast.warning("la canción es obligatoria");
    } else {
      setIsLoading(true);
      const fileName = uuidv4();
      uploadImage(fileName)
        .then(() => {
          db.collection("songs")
            .add({
              name: formDAta.name,
              album: formDAta.album,
              fileName: fileName,
            })
            .then(() => {
              toast.success("Canción subida correctamente");
              resetForm();
              setIsLoading(false);
              setShowModal(false);
            })
            .catch(() => {
              toast.error("error al subir la canción");
              setIsLoading(false);
            });
        })
        .catch(() => {
          toast.error("error al subir la canción");
          setIsLoading(false);
        });
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    accept: ".mp3, .m4a",
    noKeyboard: true,
    onDrop,
  });

  return (
    <Form className="add-song-form" onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Nombre de la canción"
          onChange={(e) => setFormDAta({ ...formDAta, name: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Dropdown
          placeholder="asigna la canción a un album"
          search
          selection
          lazyLoad
          options={albums}
          onChange={(e, data) =>
            setFormDAta({ ...formDAta, album: data.value })
          }
        />
      </Form.Field>
      <Form.Field>
        <div className="song-upload" {...getRootProps()}>
          <input {...getInputProps()} />
          <Icon name="cloud upload" className={file && "load"} />
          <div>
            <p>
              Arrastre su canción o haz click <span>aquí</span>.
            </p>
            {file && (
              <p>
                Canción subida: <span>{file.name}</span>
              </p>
            )}
          </div>
        </div>
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Subir canción
      </Button>
    </Form>
  );
}

function initialvalueForm() {
  return {
    name: "",
    album: "",
  };
}
