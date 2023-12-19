// import axios from "axios";
// import { Outlet } from "react-router-dom";
// import MeilleursScore from "../components/MeilleursScore";

function Profile() {
  return (
    <div className="home-profil">
      <div className="container-profil">
        <div className="profil-pt1">
          <h2>Données personnelles</h2>
          <h2>Mes meilleurs scores</h2>
          <h2>Mes Lots/Echanges</h2>
          <h2>Mes jeux favoris</h2>
        </div>
        <div className="profil-pt2">{/* <MeilleursScore /> */}</div>
      </div>
      <div className="avatar">
        <img src="/images/Login/GhostLogin.png" alt="avatar" />
      </div>
    </div>
  );
}

export default Profile;
