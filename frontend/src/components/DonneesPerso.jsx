import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function DonneesPerso() {
  const navigate = useNavigate("");
  const { userConnected, setUserConnected, setAdminOrNot } =
    useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userUpdate, setUserUpdate] = useState(userConnected);
  const [isDeleted, setIsDeleted] = useState(false);
  const [file, setFile] = useState(undefined);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const userUpdated = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${userUpdate.id}`,
        userUpdate,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setUserConnected(userUpdated.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const data = new FormData();
      data.append("image", file);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/image`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/userbytoken`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setUserConnected(res.data[0]);
      setUserUpdate(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleted(true);
  };

  const handleCancelDelete = () => {
    setIsDeleted(false);
  };

  const handlelogout = () => {
    setUserConnected(null);
    setAdminOrNot(false);
    localStorage.removeItem("token");
  };

  const handleDeleteProfil = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${
          userConnected.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserConnected(null);
      localStorage.removeItem("token");
      navigate("/");
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
              onClick={isEditing ? handleCancelEdit : handleEdit}
              role="presentation"
            />
          </div>
          {!isEditing ? (
            <div className="information-user">
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
                </strong>
                {/* {userUpdate.password} */}
              </p>
              <div className="btn-logout">
                <button onClick={handlelogout} type="button">
                  <NavLink to="/">
                    <img src="/images/Utilisateur/logout.png" alt="logout" />
                    <p>Se déconnecter</p>
                  </NavLink>
                </button>
              </div>
              {!isDeleted ? (
                <div className="btn-profil">
                  <button
                    className="delete-user"
                    type="button"
                    onClick={handleDelete}
                  >
                    Supprimer le profil
                  </button>
                </div>
              ) : (
                <div className="alert-deleted">
                  <p className="text-alert">Êtes-vous sûr ?</p>
                  <div className="button-YN">
                    <button type="submit" onClick={handleDeleteProfil}>
                      Oui
                    </button>
                    <button type="submit" onClick={() => handleCancelDelete()}>
                      Non
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="upload">
                <form onSubmit={handleUpload}>
                  <input
                    name="filename"
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    id="file"
                    className="input-file"
                  />
                  <label htmlFor="file" className="label-file">
                    Choisir une image
                  </label>
                  <button type="submit">
                    <img
                      src="images/Utilisateur/upload-button.png"
                      alt="upload"
                    />
                  </button>
                </form>
              </div>
              <form
                id="form"
                className="information-user"
                onSubmit={handleEditProfile}
              >
                <p>
                  <strong>
                    <span>Pseudo :</span>
                  </strong>
                </p>
                <div className="input-scss">
                  <input
                    className="input-edit"
                    type="text"
                    value={userUpdate.pseudo}
                    onChange={(event) =>
                      setUserUpdate({
                        ...userUpdate,
                        pseudo: event.target.value,
                      })
                    }
                  />
                </div>

                <p>
                  <strong>
                    <span>E-mail :</span>
                  </strong>
                </p>
                <div className="input-scss">
                  <input
                    className="input-edit"
                    type="email"
                    value={userUpdate.email}
                    onChange={(event) =>
                      setUserUpdate({
                        ...userUpdate,
                        email: event.target.value,
                      })
                    }
                  />
                </div>

                <div className="edit-profil">
                  <button className="saveprofil" type="submit">
                    Enregistrer
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DonneesPerso;
