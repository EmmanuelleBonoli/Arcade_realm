import { useContext } from "react";
import GameContext from "../contexts/GameContext";
import GuitarHero from "./GuitarHero";

function ScreenArcade() {
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
            <img
              className={gameSelected[0]}
              src="/images/Jeux_ligne/guitar_hero.jpg"
              alt="Guitar Hero Game"
            />
            <img
              className={gameSelected[1]}
              src="/images/Jeux_ligne/donkey_kong.jpg"
              alt="Donkey Kong Game"
            />
            <img
              className={gameSelected[2]}
              src="/images/Jeux_ligne/smash_bros.webp"
              alt="Smash Bros Game"
            />
            <img
              className={gameSelected[3]}
              src="/images/Jeux_ligne/space_invader.jpg"
              alt="Space Invader Game"
            />
          </div>
        </div>
      ) : (
        ""
      )}

      {chooseScreen === "guitarHero" ? <GuitarHero /> : ""}
    </div>
  );
}

export default ScreenArcade;
