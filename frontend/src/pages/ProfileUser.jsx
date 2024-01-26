import { NavLink, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

function ProfileUser() {
  const { userConnected } = useContext(UserContext);

  return (
    <div>
      {userConnected ? (
        <div className="home-profil">
          <div className="container-profil">
            <div className="profil-pt1">
              <NavLink to="/profilutilisateur">
                <p>Données personnelles</p>
                <img
                  src="/images/Utilisateur/Admin/infos.png"
                  alt="Données Personnelles"
                />
              </NavLink>
              <NavLink to="/profilutilisateur/meilleursscores">
                <p>Mes Meilleurs Scores</p>
                <img
                  src="/images/Utilisateur/Admin/CoupeScores.png"
                  alt="scores"
                />
              </NavLink>
              <NavLink to="/profilutilisateur/meslotsechanges">
                <p>Mes Lots/Echanges</p>
                <img src="/images/Utilisateur/Rectangle 139.png" alt="lots" />
              </NavLink>
              <NavLink to="/profilutilisateur/mesjeuxfavoris">
                <p>Mes Jeux Favoris</p>
                <img src="/images/Utilisateur/fav.png" alt="fav" />
              </NavLink>
            </div>
            <div className="profil-pt2">
              <div className="displayChoice">
                <Outlet />
              </div>
            </div>
          </div>
          <div className="avatar">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${userConnected.image}`}
              alt="avatar"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProfileUser;
