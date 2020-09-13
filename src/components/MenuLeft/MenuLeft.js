import React, { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { isUserAdmin } from "../../utils/api";

import "./MenuLeft.scss";

function MenuLeft(props) {
  const { user, location } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);

  useEffect(() => {
    isUserAdmin(user.uid).then((response) => {
      setUserAdmin(response);
    });
  }, [user]);

  const handleMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  return (
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
          <Icon name="music" /> Artistas
        </Menu.Item>
      </div>
      {userAdmin && (
        <div className="footer">
          <Menu.Item>
            <Icon name="plus square outline" />
            Nuevo Artista
          </Menu.Item>
          <Menu.Item>
            <Icon name="plus square outline" />
            Nueva Canción
          </Menu.Item>
        </div>
      )}
    </Menu>
  );
}
export default withRouter(MenuLeft);
