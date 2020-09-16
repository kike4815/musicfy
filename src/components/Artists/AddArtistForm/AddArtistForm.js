import React from "react";
import { Form, Button, Input, Image } from "semantic-ui-react";

import "./AddArtistForm.scss";

export default function AddArtistForm() {
  const onSbumit = () => {
    console.log("creando artista...");
  };

  return (
    <Form className="add-artist-form" onSubmit={onSbumit}>
      <Form.Field className="artist-banner">
        <Input type="file" />
      </Form.Field>
      <Form.Field className="artist-avatar">
        <div>Avatar</div>
      </Form.Field>
      <Form.Field>
        <Input placeholder="nombre del artista" />
      </Form.Field>
      <Button type="submit">Crear Artista</Button>
    </Form>
  );
}
