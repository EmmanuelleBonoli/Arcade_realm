import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PropTypes } from "prop-types";
import UserContext from "../contexts/UserContext";

export default function Connexion({ onClose }) {
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const { userConnected, setUserConnected, setAdminOrNot } =
    useContext(UserContext);
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };



  const handleConnexion = async (e) => {
    e.preventDefault();
    const userlogin = {
      pseudo: inputPseudo,
      password: inputPassword,
    };

    try {
      const dataUser = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login/`,
        userlogin
      );

      if (dataUser.data.pseudo !== inputPseudo) {
        console.error("Incorrect pseudo case. Please enter the correct case.");
        return;
      }
      setUserConnected(dataUser.data);
      if (dataUser.data.admin === 1) {
        setAdminOrNot(true);
      }
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (userConnected && userConnected.admin === 1) {
      setAdminOrNot(true);
    } else {
      setAdminOrNot(false);
    }
  }, [userConnected]);

  return (
    <div className="container-connexion" onClick={onClose} role="presentation">
      <div
        className="connexion-form"
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header-container">
          <h1>Connexion</h1>
          <img
            src="/images/Login/GhostLogin.png"
            alt="GhostLogin"
            className="GhostLogin"
          />
        </div>
        <form onSubmit={handleConnexion} className="login-container">
          <p>Entrez votre pseudo</p>
          <input
            type="text"
            className="pseudo"
            onClick={handleInputClick}
            onChange={(event) => setInputPseudo(event.target.value)}
          />

          <p>Entrez votre mot de passe</p>
          <div className="mdp-container">
            <input
              type={motDePasseVisible ? "text" : "password"}
              className="motdepasse"
              onClick={handleInputClick}
              onChange={(event) => setInputPassword(event.target.value)}
            />
            <img
              src={
                motDePasseVisible
                  ? "/images/Login/Mdp_unsee.png"
                  : "/images/Login/Mdp_see.png"
              }
              alt="eye"
              className="mdp"
              onClick={toggleMotDePasseVisibility}
              role="presentation"
            />
          </div>
          <button type="submit" className="btn-connexion">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

Connexion.propTypes = {
  onClose: PropTypes.func.isRequired,
};
