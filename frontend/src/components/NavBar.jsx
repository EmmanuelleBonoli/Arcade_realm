import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

function NavBar() {
  return (
    <div className="navBar">
      <div className="Int-navBar">
        <nav className="nav-pt-1">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/Contact">CONTACT</NavLink>
        </nav>
        <div className="logo">
        <img src="./images/logo.png" alt="logo-arcade" />
        </div>
        <nav className="nav-pt-2">
          <p>INSCRIPTION</p>
          <p>CONNEXION</p>
        </nav>
        <div className="menuBurger">
          <Menu right width="300px">
            <NavLink to="/" className="menu-item">
              <span style={{ color: "#fbb169" }}>H</span>ome
            </NavLink>
            <NavLink to="/presentationarcaderealm" className="menu-item">
              <span style={{ color: "#fbb169" }}>P</span>résentation de la salle
            </NavLink>
            <NavLink to="/evenements" className="menu-item">
              <span style={{ color: "#fbb169" }}>L</span>es Evènements
            </NavLink>
            <NavLink to="/classementetlots" className="menu-item">
              <span style={{ color: "#fbb169" }}>C</span>lassement et Lots
            </NavLink>
            <NavLink to="/contact" className="menu-item">
              <span style={{ color: "#fbb169" }}>C</span>ontact
            </NavLink>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
