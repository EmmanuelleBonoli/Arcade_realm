import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// import axios from "axios";
import UserContext from "../contexts/UserContext";

function DonneesPerso() {
  // const [nameEdit, setNameEdit] = useState("");
  // const [emailEdit, setEmailEdit] = useState("");
  // const [passwordEdit, setPasswordEdit] = useState("");
  const { userConnected, setUserConnected } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState({
    pseudo: userConnected.pseudo,
    email: userConnected.email,
    password: userConnected.password,
  });

  const handletest = () => {
    setUserConnected(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Implement logic to save changes
    setIsEditing(false);
    // Save changes using editedText state
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const data = {
  //       name: nameEdit,
  //       email: emailEdit,
  //       password: passwordEdit,
  //     };
  //     await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur`,
  //       data
  //     );
  //     // onClose();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
                {editedText.pseudo}
              </p>
              <p>
                <strong>
                  <span>Email :</span>
                </strong>{" "}
                {editedText.email}
              </p>
              <p>
                <strong>
                  <span>Mot de passe :</span>
                </strong>{" "}
                {editedText.password}
              </p>
              <div className="btn-logout">
                <button onClick={handletest} type="button">
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
            <div className="edit-user">
              <p>
                <strong>
                  <span>Pseudo :</span>
                </strong>{" "}
                <input
                  className="input-edit"
                  type="text"
                  // value={editedText.pseudo}
                  onChange={(event) => setNameEdit(event.target.value)}
                />
              </p>

              <p>
                <strong>
                  <span>E-mail :</span>
                </strong>{" "}
                <input
                  className="input-edit"
                  type="text"
                  // value={editedText.email}
                  onChange={(event) => setEmailEdit(event.target.value)}
                />
              </p>

              <p>
                <strong>
                  <span>Mot de passe :</span>
                </strong>{" "}
                <input
                  className="input-edit"
                  type="text"
                  // value={editedText.password}
                  onChange={(event) => setPasswordEdit(event.target.value)}
                />
              </p>
            </div>
          )}
          {isEditing && (
            <div className="edit-profil">
              <button className="saveprofil" type="button" onClick={handleSave}>
                Enregistrer
              </button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DonneesPerso;
