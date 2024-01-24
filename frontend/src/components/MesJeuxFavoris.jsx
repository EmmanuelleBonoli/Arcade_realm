import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function MesJeuxFavoris() {
  const { userConnected } = useContext(UserContext);
  const [userFavorites, setUserFavorites] = useState([]);

  const favoriteUser = async () => {
    if (userConnected) {
      const user = JSON.parse(localStorage.getItem("token"));
      try {
        const favorite = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/favoris/game/${
            userConnected.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUserFavorites(favorite.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    favoriteUser();
  }, []);

  return (
    <div className="container-jfav">
      <div className="pseudo-joueur">
        <img src="/images/Utilisateur/heartFavorite.png" alt="favoris-coeur" />
        <h1>{userConnected.pseudo}</h1>
      </div>
      <div className="jeux-favoris">
        {userFavorites.map((jeu) => (
          <p key={jeu.jeuId}>▶︎ {jeu.name}</p>
        ))}
      </div>
    </div>
  );
}

export default MesJeuxFavoris;
