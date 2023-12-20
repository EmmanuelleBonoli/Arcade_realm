import { useOutletContext } from "react-router-dom";

function DonneesPerso() {
  const userConnected = useOutletContext();

  return (
    <div>
      {userConnected ? (
        <div className="container-user">
          <div className="header-wrapper">
            <div className="img-wrapper">
              <img src="/images/Edit.png" alt="edit-img" />
            </div>
            <h1>Admin</h1>
          </div>

          <div className="information-user">
            <p>
              <strong>
                <span>Pseudo</span>
              </strong>{" "}
              : {userConnected.pseudo}
            </p>
            <p>
              <strong>
                <span>Email</span>
              </strong>{" "}
              : {userConnected.email}
            </p>
            <p>
              <strong>
                <span>Mot de passe</span>
              </strong>{" "}
              : {userConnected.password}
            </p>
          </div>
          <div className="btn-profil">
            <button className="deleteprofil" type="button">
              Supprimer le profil
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DonneesPerso;
