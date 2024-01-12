import { NavLink, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { useState, useContext, useEffect } from "react";
import Inscription from "./Inscription";
import Connexion from "./Connexion";
import UserContext from "../contexts/UserContext";

function NavBar() {
  const { userConnected } = useContext(UserContext);
  const navigate = useNavigate();
  const [connexionModal, setConnexionModal] = useState(false);
  const [inscriptionModal, setInscriptionModal] = useState(false);

  const openConnexionModal = () => {
    setConnexionModal(true);
  };

  const openInscriptionModal = () => {
    setInscriptionModal(true);
  };

  const closeInscriptionModal = () => {
    setInscriptionModal(false);
  };

  const closeConnexionModal = () => {
    setConnexionModal(false);
  };

  const handleProfile = () => {
    navigate("/profilutilisateur");
  };

  useEffect(() => {
    if (connexionModal || inscriptionModal) {
      // Ajouter la classe pour masquer le défilement lorsque la modal est ouverte
      document.body.classList.add("body-no-scroll");
    } else {
      // Retirer la classe lorsque la modal est fermée
      document.body.classList.remove("body-no-scroll");
    }
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [connexionModal, inscriptionModal]);

  return (
    <div className="navBar">
      <div className="Int-navBar">
        <nav className="nav-pt-1">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/Contact">CONTACT</NavLink>
        </nav>

        <div className="logo">
          <img src="/images/logo.png" alt="logo-arcade" />
        </div>

        {userConnected ? (
          <div className="nav-pt-2">
            <div className="avatar_user">
              <div className="pseudo">
                <p>
                  <strong>BONJOUR :</strong>
                </p>
                <p>{userConnected.pseudo}</p>
              </div>
              <div className="bloc-image">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${
                    userConnected.image
                  }`}
                  alt="avataruser"
                  role="presentation"
                  onClick={handleProfile}
                />
              </div>
            </div>
          </div>
        ) : (
          <nav className="nav-pt-2">
            <div className="inscription">
              <p onClick={openInscriptionModal} role="presentation">
                INSCRIPTION
              </p>
            </div>
            <p onClick={openConnexionModal} role="presentation">
              CONNEXION
            </p>
          </nav>
        )}

        {inscriptionModal && <Inscription onClose={closeInscriptionModal} />}
        {connexionModal && <Connexion onClose={closeConnexionModal} />}

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
