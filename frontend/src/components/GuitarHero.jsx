import { useEffect, useContext } from "react";
import GameContext from "../contexts/GameContext";

function GuitarHero() {
  const {
    // launchGuitarHero,
    // setLaunchGuitarHero,
    setChooseScreen,
    chooseArrow,
    setChooseArrow,
    scorePlayer,
  } = useContext(GameContext);

  useEffect(() => {
    // if (launchGuitarHero) {
    const newGame = setInterval(() => {
      const randomArrow = Math.floor(Math.random() * 4);
      const newChooseArrow = [...chooseArrow];
      newChooseArrow[randomArrow] = !newChooseArrow[randomArrow];
      setChooseArrow(newChooseArrow);
      setTimeout(() => {
        setChooseArrow([false, false, false, false]);
      }, 950);
    }, 1000);
    return () => clearInterval(newGame);
    // }
  }, [
    // launchGuitarHero,
    chooseArrow,
  ]);

  function closeGame() {
    setChooseScreen("menu");
    // setLaunchGuitarHero(false);
  }

  return (
    <div className="guitarHero">
      <div className="infosJeu">
        <img
          className="closeGame"
          src="/images/Jeux_ligne/x.png"
          onClick={closeGame}
          role="presentation"
          alt="closeGame"
        />
        <div className="score">
          <p>Score : {scorePlayer}</p>
        </div>
        <div className="missedArrow">
          <p>Missed :</p>
        </div>
      </div>

      <div className="spaceArrows">
        {chooseArrow[0] ? (
          <div>
            <img
              className="arrowBlue"
              src="/images/Jeux_ligne/GuitarHero/flecheBleue.png"
              alt="Fleche"
            />
            <div className="emptyDiv" />
            <div className="emptyDiv" />
            <div className="emptyDiv" />
          </div>
        ) : (
          ""
        )}
        {chooseArrow[1] ? (
          <div>
            <div className="emptyDiv" />
            <img
              className="arrowGreen"
              src="/images/Jeux_ligne/GuitarHero/flecheVerte.png"
              alt="Fleche"
            />
            <div className="emptyDiv" />
            <div className="emptyDiv" />
          </div>
        ) : (
          ""
        )}
        {chooseArrow[2] ? (
          <div>
            <div className="emptyDiv" />
            <div className="emptyDiv" />
            <img
              className="arrowYellow"
              src="/images/Jeux_ligne/GuitarHero/flecheJaune.png"
              alt="Fleche"
            />
            <div className="emptyDiv" />
          </div>
        ) : (
          ""
        )}
        {chooseArrow[3] ? (
          <div>
            <div className="emptyDiv" />
            <div className="emptyDiv" />
            <div className="emptyDiv" />
            <img
              className="arrowRed"
              src="/images/Jeux_ligne/GuitarHero/flecheRouge.png"
              alt="Fleche"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default GuitarHero;
