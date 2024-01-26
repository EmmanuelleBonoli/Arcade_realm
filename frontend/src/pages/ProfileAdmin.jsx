import { NavLink, Outlet } from "react-router-dom";
import React, { useContext } from "react";

import UserContext from "../contexts/UserContext";

function ProfileAdmin() {
  const { userConnected } = useContext(UserContext);

  return (
    <div>
      {userConnected ? (
        <div className="profileAdmin">
          <div className="avatar">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${userConnected.image}`}
              alt="avatar"
              role="presentation"
            />
          </div>

          <div className="adminLayout">
            <div className="buttonsChoice">
              <NavLink to="/profilutilisateur" className="">
                <p>Données Personnelles</p>
                <img
                  src="/images/Utilisateur/Admin/infos.png"
                  alt="Données Personnelles"
                />
              </NavLink>

              <NavLink to="/profilutilisateur/adminservices" className="">
                <p>Gestion de la salle</p>
                <img src="" alt="" />
              </NavLink>
              <NavLink to="/profilutilisateur/gestiondesconcours" className="">
                <p>Gestion des concours</p>
                <img
                  src="/images/Utilisateur/Admin/CoupeScores.png"
                  alt="Gestion des concours"
                />
              </NavLink>
              <NavLink to="/profilutilisateur/gestiondeslots" className="">
                <p>Gestion des lots</p>
                <img src="/images/Utilisateur/Admin/lotIcone.png" alt="" />
              </NavLink>
              <NavLink to="/profilutilisateur/gestionprofils" className="">
                <p>Gestion des profils</p>
                <img
                  src="/images/Utilisateur/Admin/users.png"
                  alt="Gestion des concours"
                />
              </NavLink>
            </div>
            <div className="displayChoice">
              <div className="displaycenter">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProfileAdmin;
