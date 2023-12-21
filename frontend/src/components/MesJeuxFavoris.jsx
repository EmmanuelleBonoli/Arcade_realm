import { useContext } from "react";
import UserContext from "../contexts/UserContext";

function MesJeuxFavoris() {
  const { userConnected } = useContext(UserContext);
  return (
    <div className="container-jfav">
      <div className="pseudo-joueur">
        <img src="/images/Utilisateur/heartFavorite.png" alt="favoris-coeur" />
        <h1>{userConnected.pseudo}</h1>
      </div>
      <div className="jeux-favoris">
        <p>▶︎ Mortal Kombat</p>
        <p>▶︎ Space Invaders</p>
        <p>▶︎ Metal Slug</p>
        <p>▶︎ Pacman</p>
      </div>
    </div>
  );
}

export default MesJeuxFavoris;
