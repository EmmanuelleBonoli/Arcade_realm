import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";

function PresentationGame() {
  const game = useLoaderData();

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="games">
      <div className="descGames">
        <h2>Nos Jeux</h2>
        <div className="containerGames">
          <div className="containerGames2">
            {" "}
            <button
              type="submit"
              className="retourpicture"
              onClick={handleBackClick}
            >
              <img
                src="../images/Utilisateur/retour 1.png"
                alt="Bonjour"
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
              {/* <img src="../images/Utilisateur/heartFavorite.png" alt="" /> */}

              <p>
                <strong>Nom :</strong> {game[0].name}
              </p>
              <p>
                <strong>Date :</strong> {game[0].date.substring(0, 10)}
              </p>
              <p>
                <strong>Nombre de borne :</strong> {game[0].nb_borne}
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
