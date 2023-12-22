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
                Données Personnelles
              </NavLink>

              <NavLink to="/profilutilisateur/adminservices" className="">
                Gestion des services
              </NavLink>
              {/* <NavLink to="/profilutilisateur/gestionprofils" className="">
                Gestion des profils
              </NavLink> */}
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
