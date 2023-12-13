import { NavLink } from "react-router-dom";
import { push as Menu } from "react-burger-menu";
import { useState, useEffect } from "react";

function NavBar() {
  const [positionMenu, setPositionMenu] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setPositionMenu(2);
      } else {
        setPositionMenu(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="navBar">
      <div className="Int-navBar">
        {positionMenu === 1 ? (
          <>
            <nav className="nav-pt-1">
              <NavLink to="/">HOME</NavLink>
              <NavLink to="/Contact">CONTACT</NavLink>
            </nav>
            <div className="logo">
            <img src="./images/logo.png" alt="logo-arcade" /></div>
            <nav className="nav-pt-2">
              <p>INSCRIPTION</p>
              <p>CONNEXION</p>
            </nav>
          </>
        ) : (
          <>
            <nav className="nav-pt-2">
              <p>INSCRIPTION</p>
              <p>CONNEXION</p>
            </nav>
            <img src="./images/logo.png" alt="logo-arcade" />
            <Menu width="300px">
              <NavLink to="/" className="menu-item">
                HOME
              </NavLink>
              <NavLink to="/presentationarcaderealm" className="menu-item">
                Présentation de la salle
              </NavLink>
              <NavLink to="/evenement" className="menu-item">
                Les Evènements
              </NavLink>
              <NavLink to="/" className="menu-item">
                Jeux en ligne
              </NavLink>
              <NavLink to="/classementetlots" className="menu-item">
                Classement et Lots
              </NavLink>
              <NavLink to="/contact" className="menu-item">
                Contact
              </NavLink>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
