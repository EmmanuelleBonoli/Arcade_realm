import { NavLink } from "react-router-dom";

function Echange() {
  return (
    <div className="home-echange">
      <div className="container-echange">
        <NavLink to="/profilutilisateur/meslotsechanges">
          <div className="retour-page">Retour à mon profil</div>
        </NavLink>
        <div className="mes-lots">
          <h1>Wild_Gamer</h1>
          <div className="lots-user">
            <div className="lots-scores">
              <p>Mes lot à échanger :</p>
              <div className="images-recompense">
                <img src="images/SuperNes3.png" alt="" />
                <div className="elispe-coché">
                  <img src="images/Utilisateur/img-coche.png" alt="" />
                </div>
              </div>
            </div>
            <div className="gl-trait-echange">
              <div className="trait-echange" />
            </div>
            <div className="user-score">
              <p>
                <strong>Score : </strong>
              </p>
              <p>24 500 pts</p>
            </div>
          </div>
        </div>
        <div className="image-echangeur">
          <img src="images/Utilisateur/echangeur.png" alt="echangeur" />
        </div>
        <div className="echange-joueur">
          <div className="Joueurs-p1">
            <h1>Joueurs</h1>
            <p>Les lots disponibles :</p>
            <div className="lots-disponibles">
              <div className="images-echange">
                <img src="images/SuperNes3.png" alt="" />
                <div className="elispe-coché-echange">
                  <img src="images/Utilisateur/img-coche.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="gl-trait-echange-2">
            <div className="trait-echange-2" />
          </div>
          <div className="Joueurs-p2">
            <h1>MYSTERY BOX</h1>
            <img src="/images/Utilisateur/mystery_box.png" alt="mystery_box" />
            <p>50 000 pts</p>
          </div>
        </div>
      </div>
      <div className="avatar">
        <img src="/images/Login/GhostLogin.png" alt="avatar" />
      </div>
    </div>
  );
}

export default Echange;
