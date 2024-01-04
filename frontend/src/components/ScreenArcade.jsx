import { useContext } from "react";
import { PropTypes } from "prop-types";
import GameContext from "../contexts/GameContext";
import GuitarHero from "./GuitarHero";

function ScreenArcade({ gamesOnline }) {
  const {
    setChooseScreen,
    chooseScreen,
    gameSelected,
    scorePlayer,
    setScorePlayer,
    setMissedArrow,
  } = useContext(GameContext);

  function handleNewGameGuitarHero() {
    setScorePlayer(0);
    setMissedArrow([]);
    setChooseScreen("guitarHero");
  }

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

      {chooseScreen === "guitarHero" ? <GuitarHero /> : ""}
      {chooseScreen === "guitarHeroGameOver" ? (
        <div className="gameOverGuitarHero">
          <h2>Game Over</h2>
          <p>Your score is {scorePlayer}</p>
          <button type="button" onClick={handleNewGameGuitarHero}>
            New Game ?
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

ScreenArcade.propTypes = {
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
