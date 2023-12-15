import { useState } from "react";

export default function Connexion({ onClose }) {
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);

  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };


    const handleInputClick = (e) => {

      e.stopPropagation();
    };
  

  return (
    <>
      <div className="container-connexion" onClick={onClose}>
        <div className="connexion-form"onClick={(e) => e.stopPropagation()}>
          <div className="header-container">
            <h1>Connexion</h1>
            <img
              src="/images/Login/GhostLogin.png"
              alt="GhostLogin"
              className="GhostLogin"
            />
          </div>
          <div className="login-container">
            <p>Entrez votre pseudo</p>
            <input type="text" className="pseudo" onClick={handleInputClick} />

            <p>Entrez votre mot de passe</p>
            <div className="mdp-container">
              <input
                type={motDePasseVisible ? "text" : "password"}
                className="motdepasse" onClick={handleInputClick}
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
              />
            </div>
            <button type="submit" className="btn-inscription">
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
