import { PropTypes } from "prop-types";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";

export default function Inscription({ onClose }) {
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inscription, setInscription] = useState("");
  const { setUserConnected, setAdminOrNot } = useContext(UserContext);
  const [formValid, setFormValid] = useState(true);

  const validateForm = () => {
    if (!inputPseudo || !inputEmail || !inputPassword) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  };

  // mot de passe visible ou non //
  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

  useEffect(() => {
    validateForm();
  }, [inputPseudo, inputEmail, inputPassword]);

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    if (user) {
      const dataUser = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/userbytoken`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserConnected(dataUser.data[0]);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    validateForm();
    if (formValid) {
      const userSignin = {
        pseudo: inputPseudo,
        email: inputEmail,
        password: inputPassword,
        image: `/images/Avatar/Avatar.png`,
        admin: false,
        points: 0,
        podium: 0,
        tickets: 0,
      };

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/signin/`,
          userSignin
        );

        const userLocal = {
          token: res.data.token,
        };
        localStorage.setItem(
          "token",
          JSON.stringify({
            ...userLocal,
          })
        );
        fetchUser();
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
    } else {
      setInscription("Veuillez remplir tous les champs.");
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
            onChange={(event) => setInputPseudo(event.target.value)}
          />

          <p>Entrez votre e-mail</p>
          <input
            type="email"
            className="pseudo"
            onChange={(event) => setInputEmail(event.target.value)}
          />

          <p>Choisissez votre mot de passe</p>
          <div className="mdp-container">
            <input
              type={motDePasseVisible ? "text" : "password"}
              className="motdepasse"
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
