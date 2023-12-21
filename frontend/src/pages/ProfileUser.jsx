import { NavLink, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
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
              <NavLink to="/profilutilisateur">Données personnelles</NavLink>
              <NavLink to="/profilutilisateur/meilleursscores">
                Mes Meilleurs Scores
              </NavLink>
              <NavLink to="/profilutilisateur/meslotsechanges">
                Mes Lots/Echanges
              </NavLink>
              <NavLink to="/profilutilisateur/mesjeuxfavoris">
                Mes Jeux Favoris
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

ProfileUser.propTypes = {
  userConnected: PropTypes.shape({
    id: PropTypes.number.isRequired,
    pseudo: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    admin: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProfileUser;
