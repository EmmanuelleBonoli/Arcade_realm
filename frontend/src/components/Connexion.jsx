export default function Connexion() {
    return (
      <>
        <div className="container-connexion">
          <div className="connexion-form">
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
              <input type="text" className="pseudo" />
  
              <p>Entrez votre mot de passe</p>
              <input type="text" className="motdepasse" />
  
              <button type="submit" className="btn-inscription">
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  