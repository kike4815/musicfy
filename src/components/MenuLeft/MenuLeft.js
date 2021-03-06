import React, { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { isUserAdmin } from "../../utils/api";
import BasicModal from "../Modal/BasicModal/BasicModal";
import AddArtistForm from "../Artists/AddArtistForm/AddArtistForm";
import AddAlbumForm from "../Album/AddAlbumForm";
import AddSongForm from "../Songs";

import "./MenuLeft.scss";

function MenuLeft(props) {
  const { user, location } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  useEffect(() => {
    isUserAdmin(user.uid).then((response) => {
      setUserAdmin(response);
    });
  }, [user]);

  const handleMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  const handleModal = (type) => {
    switch (type) {
      case "artist":
        setTitleModal("Nuevo Artista");
        setContentModal(<AddArtistForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "album":
        setTitleModal("Nuevo Álbum");
        setContentModal(<AddAlbumForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "song":
        setTitleModal("Nueva Canción");
        setContentModal(<AddSongForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      default:
        setTitleModal(null);
        setContentModal(null);
        setShowModal(false);
        break;
    }
  };

  return (
    <>
      <Menu className="menu-left" vertical>
        <div className="top">
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeMenu === "/"}
            onClick={handleMenu}
          >
            <Icon name="home" /> Inicio
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/artists"
            name="artists"
            active={activeMenu === "/artists"}
            onClick={handleMenu}
          >
            <Icon name="user" /> Artistas
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/albums"
            name="albums"
            active={activeMenu === "/albums"}
            onClick={handleMenu}
          >
            <Icon name="window maximize outline" /> Albums
          </Menu.Item>
        </div>
        {userAdmin && (
          <div className="footer">
            <Menu.Item onClick={() => handleModal("artist")}>
              <Icon name="plus square outline" />
              Nuevo Artista
            </Menu.Item>
            <Menu.Item onClick={() => handleModal("album")}>
              <Icon name="plus square outline" />
              Nuevo Álbum
            </Menu.Item>
            <Menu.Item onClick={() => handleModal("song")}>
              <Icon name="plus square outline" />
              Nueva Canción
            </Menu.Item>
          </div>
        )}
      </Menu>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}
export default withRouter(MenuLeft);
