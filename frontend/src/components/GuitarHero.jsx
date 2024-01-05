import { useEffect, useContext, useRef } from "react";
import { uid } from "uid";
import GameContext from "../contexts/GameContext";

function GuitarHero() {
  const {
    setChooseScreen,
    chooseArrow,
    setChooseArrow,
    scorePlayer,
    setScorePlayer,
    missedArrow,
    setMissedArrow,
  } = useContext(GameContext);

  const chooseArrowRef = useRef(chooseArrow);

  useEffect(() => {
    chooseArrowRef.current = chooseArrow;
  }, [chooseArrow]);

  useEffect(() => {
    const newGame = setInterval(() => {
      const randomArrow = Math.floor(Math.random() * 4);
      const newChooseArrow = [...chooseArrowRef.current];
      newChooseArrow[randomArrow] = !newChooseArrow[randomArrow];
      setChooseArrow(newChooseArrow);
    }, 3000);

    if (missedArrow.length === 3) {
      clearInterval(newGame);
    }
    return () => clearInterval(newGame);
  }, [missedArrow]);

  useEffect(() => {
    setTimeout(() => {
      if (chooseArrowRef.current.includes(true)) {
        setChooseArrow([false, false, false, false]);
        const newMissedArrow = [...missedArrow];
        newMissedArrow.push("missed");
        setMissedArrow(newMissedArrow);
      }
    }, 2950);
  }, [chooseArrow]);

  function closeGame() {
    setChooseScreen("menu");
    setMissedArrow([]);
    setScorePlayer(0);
  }

  function handleNewGameGuitarHero() {
    setScorePlayer(0);
    setMissedArrow([]);
    setChooseScreen("guitarHero");
  }

  return (
    <div className="guitarHero">
      {missedArrow.length !== 3 ? (
        <div className="guitarHeroGame">
          {" "}
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
              <p>
                Missed :
                {missedArrow.map(() => {
                  return (
                    <img
                      key={uid(5)}
                      src="/images/Jeux_ligne/GuitarHero/redCross.png"
                      alt="missed"
                    />
                  );
                })}
              </p>
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
      ) : (
        <div className="gameOverGuitarHero">
          <h2>Game Over</h2>
          <p>Your score is {scorePlayer}</p>
          <button type="button" onClick={handleNewGameGuitarHero}>
            New Game ?
          </button>
        </div>
      )}
    </div>
  );
}

export default GuitarHero;
