import { useState } from "react";

export default function Connexion({ onClose }) {
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);

  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3310/api/utilisateur",
        {
          pseudo:pseudo,
          password: password,
        }
      );

      if (response.data.success) {
        alert("Connexion réussie");
        // Rediriger ou effectuer d'autres actions après la connexion réussie
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la connexion", error);
      alert("Une erreur s'est produite lors de la connexion.");
    }
  };

  return (
    <>
      <div className="container-connexion" onClick={onClose}>
        <div className="connexion-form" onClick={(e) => e.stopPropagation()}>
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
            <input
              type="text"
              className="pseudo"
              onClick={handleInputClick}
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />

            <p>Entrez votre mot de passe</p>
            <div className="mdp-container">
              <input
                type={motDePasseVisible ? "text" : "password"}
                className="motdepasse"
                value={password}
                onClick={handleInputClick}
                onChange={(e) => setPassword(e.target.value)}
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
            <button
              onClick={handleLogin}
              type="submit"
              className="btn-inscription"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
