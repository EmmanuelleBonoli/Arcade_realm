import { PropTypes } from "prop-types";
import axios from "axios";
import { useState } from "react";

export default function Inscription({ onClose }) {
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const userSignin = {
      pseudo: inputPseudo,
      email: inputEmail,
      password: inputPassword,
      image: `/images/Avatar/Avatar.png`,
      admin: false,
      points: 0,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/signin/`,
        userSignin
      );

      if (res.status === 201) {
        alert("inscription réussie");
      }
    } catch (error) {
      console.error(error);
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
        <form onSubmit={handleSignIn} className="login-container">
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
            type="password"
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
