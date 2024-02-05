import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function PresentationGame() {
  const game = useLoaderData();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const { userConnected } = useContext(UserContext);
  const [userFavorites, setUserFavorites] = useState([]);
  const param = useParams();

  const favoriteUser = async () => {
    if (userConnected) {
      const user = JSON.parse(localStorage.getItem("token"));
      try {
        const favorite = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/favoris/${
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

  useEffect(() => {
    if (userFavorites.length > 0) {
      const resultat = userFavorites.find(
        (jeu) => jeu.jeuId.toString() === param.id
      );
      if (resultat) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [userFavorites]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFavoriteClick = async (jeuIdSelected) => {
    const user = JSON.parse(localStorage.getItem("token"));
    if (isFavorite) {
      try {
        const utilisateurId = userConnected.id;
        await axios.delete(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/favoris/${utilisateurId}/${jeuIdSelected}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      const NewFavorite = {
        jeuId: jeuIdSelected,
        utilisateurId: userConnected.id,
      };
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/favoris`,
          NewFavorite,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
    favoriteUser();
  };

  return (
    <div className="container-games">
      <div className="descGames">
        <h2>Nos Jeux</h2>
        <div className="containerGames">
          <div className="containerGames2">
            <button type="button" className="retourpicture">
              <img
                src="/images/Utilisateur/retour 1.png"
                alt="Retour"
                className="firstimage"
                onClick={handleBackClick}
                role="presentation"
              />
            </button>
          </div>
          <div className="containerGames3">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${game[0].image}`}
              alt={game[0].name}
              className="secondimage"
            />
            <div className="descriptionGames">
              {userFavorites && (
                <img
                  onClick={() => handleFavoriteClick(param.id)}
                  role="presentation"
                  src={
                    isFavorite
                      ? "/images/Utilisateur/heartFavorite.png"
                      : "/images/Utilisateur/heartnotfavorite.png"
                  }
                  alt=""
                />
              )}

              <p>
                <strong>Nom :</strong> {game[0].name}
              </p>
              <p>
                <strong>Date :</strong> {game[0].date.substring(0, 10)}
              </p>
              <p>
                <strong>Nombre de bornes :</strong> {game[0].nb_borne}
              </p>
              <p>
                <strong>Description :</strong> {game[0].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const loadPresentationGame = async ({ params }) => {
  try {
    const presentationGame = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/jeu/${params.id}`
    );
    return presentationGame.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
export default PresentationGame;
