import { PropTypes } from "prop-types";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Inscription({ onClose }) {
  const handleInputClick = (e) => {
    e.stopPropagation();
  };
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const handleInscription = async (e) => {
    e.preventDefault();
    const usersignin = {
      pseudo: inputPseudo,
      email: inputEmail,
      password: inputPassword,
    };
    try {
      const dataUser = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/signin/`,
        usersignin
      );

      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      className="container-inscription"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="inscription-form"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div className="header-container">
          <h1>Inscription</h1>
          <img
            src="/images/Login/GhostLogin.png"
            alt="GhostLogin"
            className="GhostLogin"
          />
        </div>
        <form onSubmit={handleInscription} className="login-container">
          <p>Choisissez votre pseudo</p>
          <input
            type="text"
            className="pseudo"
            onClick={handleInputClick}
            onChange={(event) => setInputPseudo(event.target.value)}
          />

          <p>Entrez votre e-mail</p>
          <input
            type="text"
            className="pseudo"
            onClick={handleInputClick}
            onChange={(event) => setInputEmail(event.target.value)}
          />
          <p>Choisissez votre mot de passe</p>
          <input
            type="text"
            className="motdepasse"
            onClick={handleInputClick}
            onChange={(event) => setInputPassword(event.target.value)}
          />

          <div className="container-button">
            <button type="submit" className="btn-inscription">
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Inscription.propTypes = {
  onClose: PropTypes.func.isRequired,
};
