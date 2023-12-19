// import MesLotsEchanges from "../components/MesLotsEchanges";
// import axios from "axios";
// import { Outlet } from "react-router-dom";
// import MeilleursScore from "../components/MeilleursScore";
import PropTypes from "prop-types";

function ProfileUser({ userConnected }) {
  return (
    <div className="home-profil">
      <div className="container-profil">
        <div className="profil-pt1">
          <h2>Données personnelles</h2>
          <h2>Mes meilleurs scores</h2>
          <h2>Mes Lots/Echanges</h2>
          <h2>Mes jeux favoris</h2>
        </div>
        <div className="profil-pt2">
          {/* <MeilleursScore /> <MesLotsEchanges /> */}
        </div>
      </div>
      <div className="avatar">
        <img src="/images/Login/GhostLogin.png" alt="avatar" />
      </div>
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
