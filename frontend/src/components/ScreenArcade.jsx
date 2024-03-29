import { useContext } from "react";
import { PropTypes } from "prop-types";
import GameContext from "../contexts/GameContext";
import GuitarHero from "./GuitarHero";
import JurassicPark from "./JurassicPark";

function ScreenArcade({
  audio2,
  gamesOnline,
  gamePlayed,
  setGameOver,
  gameOver,
}) {
  const { chooseScreen, gameSelected } = useContext(GameContext);

  return (
    <div className="insideScreen">
      {chooseScreen === "start" ? (
        <img
          className="gameStart"
          src="/images/Jeux_ligne/GameStart.png"
          alt="gameStart"
        />
      ) : (
        ""
      )}
      {chooseScreen === "menu" ? (
        <div className="menuScreen">
          <h2>Choose your game</h2>
          <div className="games">
            {gamesOnline.map((game, indexOfGame) => {
              return (
                <img
                  className={
                    indexOfGame === gameSelected ? "choose" : "notChoose"
                  }
                  key={game.id}
                  src={`${import.meta.env.VITE_BACKEND_URL}${game.image}`}
                  alt={game.name}
                />
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
      {chooseScreen === "JurassicPark" ? (
        <JurassicPark
          audio2={audio2}
          gamePlayed={gamePlayed}
          gameOverJP={gameOver}
          setGameOverJP={setGameOver}
        />
      ) : (
        ""
      )}
      {chooseScreen === "guitarHero" ? (
        <GuitarHero
          gamePlayed={gamePlayed}
          gameOverGH={gameOver}
          setGameOverGH={setGameOver}
        />
      ) : (
        ""
      )}
    </div>
  );
}

ScreenArcade.propTypes = {
  audio2: PropTypes.shape({
    src: PropTypes.string.isRequired,
  }).isRequired,
  gameOver: PropTypes.bool.isRequired,
  setGameOver: PropTypes.func.isRequired,
  gamePlayed: PropTypes.number.isRequired,
  gamesOnline: PropTypes.arrayOf(
    PropTypes.shape({
      actif: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nb_borne: PropTypes.number.isRequired,
      physique: PropTypes.number.isRequired,
      regles: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ScreenArcade;
