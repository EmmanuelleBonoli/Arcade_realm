import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function DonneesPerso() {
  const { userConnected, setUserConnected } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userUpdate, setUserUpdate] = useState(userConnected);
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);

  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handlelogout = () => {
    setUserConnected(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userUpdated = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${userUpdate.id}`,
        userUpdate
      );

      setUserConnected(userUpdated.data);
      setIsEditing(false);

      console.log("Informations utilisateur mises à jour avec succès");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {userConnected ? (
        <div className="container-user">
          <div className="header-wrapper">
            <h1>Profil</h1>
            <img
              src="/images/Utilisateur/Edit.png"
              alt="edit-img"
              onClick={handleEdit}
              role="presentation"
            />
          </div>
          {!isEditing ? (
            <form className="information-user">
              <p>
                <strong>
                  <span>Pseudo :</span>
                </strong>{" "}
                {userUpdate.pseudo}
              </p>
              <p>
                <strong>
                  <span>Email :</span>
                </strong>{" "}
                {userUpdate.email}
              </p>
              <p>
                <strong>
                  <span>Mot de passe :</span>
                </strong>{" "}
                {userUpdate.password}
              </p>
              <div className="btn-logout">
                <button onClick={handlelogout} type="button">
                  <NavLink to="/">
                    <img src="/images/Utilisateur/logout.png" alt="logout" />
                    <p>Se déconnecter</p>
                  </NavLink>
                </button>
              </div>
              <div className="btn-profil">
                <button className="deleteprofil" type="button">
                  Supprimer le profil
                </button>
              </div>
            </form>
          ) : (
            <form
              id="form"
              className="information-user"
              onSubmit={handleSubmit}
            >
              <p>
                <strong>
                  <span>Pseudo :</span>
                </strong>{" "}
                <input
                  className="input-edit"
                  type="text"
                  value={userUpdate.pseudo}
                  onChange={(event) =>
                    setUserUpdate({ ...userUpdate, pseudo: event.target.value })
                  }
                />
              </p>

              <p>
                <strong>
                  <span>E-mail :</span>
                </strong>{" "}
                <input
                  className="input-edit"
                  type="email"
                  value={userUpdate.email}
                  onChange={(event) =>
                    setUserUpdate({ ...userUpdate, email: event.target.value })
                  }
                />
              </p>

              <p>
                <strong>
                  <span>Mot de passe :</span>
                </strong>{" "}
                <div className="mdp-container">
                  <input
                    className="input-edit"
                    type={motDePasseVisible ? "text" : "password"}
                    value={userUpdate.password}
                    onChange={(event) =>
                      setUserUpdate({
                        ...userUpdate,
                        password: event.target.value,
                      })
                    }
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
              </p>

              <div className="edit-profil">
                <button className="saveprofil" type="submit">
                  Enregistrer
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DonneesPerso;
