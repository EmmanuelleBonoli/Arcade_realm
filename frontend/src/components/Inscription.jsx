import { PropTypes } from "prop-types";
import axios from "axios";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Inscription({ onClose }) {
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inscription, setInscription] = useState("");
  const { setUserConnected, setAdminOrNot } = useContext(UserContext);

  // mot de passe visible ou non //
  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

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
      podium: false,
      tickets: 0,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/signin/`,
        userSignin
      );
      setUserConnected(res.data);
      const userLocal = {
        ...res.data,
        token: res.data.token,
      };
      console.log(res.data);
      localStorage.setItem(
        "token",
        JSON.stringify({
          ...userLocal,
        })
      );

      if (res.data.admin === 1) {
        setAdminOrNot(true);
      }

      if (res.status === 201) {
        setInscription("Inscription réussie !");
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="container-inscription "
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
          {inscription && (
            <p
              style={{
                color: "#fbb169",
                fontSize: "17px",
                fontFamily: "var(--secondary-font)",
                fontWeight: "bold",
              }}
            >
              {inscription}
            </p>
          )}
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
            type="email"
            className="pseudo"
            onClick={handleInputClick}
            onChange={(event) => setInputEmail(event.target.value)}
          />

          <p>Choisissez votre mot de passe</p>
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
