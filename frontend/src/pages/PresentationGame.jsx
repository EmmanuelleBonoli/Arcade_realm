// import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
// import UserContext from "../contexts/UserContext";

function PresentationGame() {
  const game = useLoaderData();
  const navigate = useNavigate();
  // const [isFavorite, setIsFavorite] = useState(false);
  // const { userConnected } = useContext(UserContext);
  // const [userFavorites, setUserFavorites] = useState([]);
  // useEffect(() => {
  //   const favoriteUser = async () => {
  //     try {
  //       const favorite = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URL}/api/favoris/${userConnected.id}`
  //       );
  //       setUserFavorites(favorite.data);
  //       console.log(favorite.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   favoriteUser();
  // }, []);
  const handleBackClick = () => {
    navigate(-1);
  };
  // const handleFavoriteClick = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/favoris`,
  //       {
  //         utilisateurId: userConnected.id,
  //         jeuId: game[0].id,
  //         favori: !isFavorite,
  //       }
  //     );
  //     if (response.status === 200) {
  //       setIsFavorite((prevState) => !prevState);
  //     } else {
  //       console.error("Échec de la requête POST");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className="games">
      <div className="descGames">
        <h2>Nos Jeux</h2>
        <div className="containerGames">
          <div className="containerGames2">
            <button
              type="button"
              className="retourpicture"
              onClick={handleBackClick}
            >
              <img
                src="../images/Utilisateur/retour 1.png" // Vérifiez le chemin de l'image
                alt="Retour"
                className="firstimage"
              />
            </button>
          </div>
          <div className="containerGames3">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${game[0].image}`}
              alt={game[0].name}
              className="secondimage"
            />
            <div className="descriptionGames">
              {/* <label htmlFor="favoriteButton"> </label>
              <button
                type="button"
                id="favoriteButton"
                onClick={handleFavoriteClick}
              > */}
              {/* <img
                  src={
                    isFavorite
                      ? "../images/Utilisateur/heartnotfavorite.png" // Vérifiez le chemin de l'image
                      : "../images/Utilisateur/heartFavorite.png" // Vérifiez le chemin de l'image
                  }
                  alt=""
                />
              </button> */}
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
