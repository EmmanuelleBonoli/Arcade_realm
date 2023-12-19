import PropTypes from "prop-types";
// import DonneesPerso from "../components/DonneesPerso";
import AdminUserProfile from "../components/AdminUserProfile";

function ProfileAdmin({ userConnected }) {
  return (
    <div>
      {userConnected ? (
        <div className="profileAdmin">
          <div className="avatar">
            <img
              key={userConnected.id}
              src={`${import.meta.env.VITE_BACKEND_URL}${userConnected.image}`}
              alt="avatar"
            />
          </div>

          <div className="adminLayout">
            <div className="buttonsChoice">
              <button type="button" className="">
                Données Personnelles
              </button>

              <button type="button" className="">
                Gestion des services
              </button>
              <button type="button" className="">
                Gestion des profils
              </button>
            </div>
            <div className="displayChoice">
              {/* <DonneesPerso /> */}
              <AdminUserProfile />
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

ProfileAdmin.propTypes = {
  userConnected: PropTypes.objectOf.isRequired,
};
