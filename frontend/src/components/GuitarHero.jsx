import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { PropTypes } from "prop-types";
import { uid } from "uid";
import GameContext from "../contexts/GameContext";
import userContext from "../contexts/UserContext";

function GuitarHero({ gamePlayed, gameOverGH, setGameOverGH }) {
  const {
    setChooseScreen,
    chooseArrow,
    setChooseArrow,
    scorePlayer,
    setScorePlayer,
    missedArrow,
    setMissedArrow,
  } = useContext(GameContext);

  const { userConnected } = useContext(userContext);

  const [getScoreUser, setGetScoreUser] = useState({});

  useEffect(() => {
    if (gameOverGH === true) {
      if (userConnected) {
        const getScore = async () => {
          try {
            const fetchScore = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/score/email/${
                userConnected.id
              }`
            );
            setGetScoreUser(fetchScore.data);
          } catch (err) {
            console.error(err);
          }
        };
        getScore();
      }
    }
  }, [gameOverGH]);

  useEffect(() => {
    if (scorePlayer > 0) {
      const tmpScore = getScoreUser.filter(
        (score) => score.name === "Guitar Hero"
      );
      if (tmpScore.length === 0) {
        const postScore = async () => {
          try {
            const NewScore = {
              utilisateurId: userConnected.id,
              jeuId: 4,
              points: scorePlayer,
            };
            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/score`,
              NewScore
            );
          } catch (err) {
            console.error(err);
          }
        };
        postScore();
      } else if (scorePlayer > tmpScore[0].points) {
        const postScore = async () => {
          try {
            const UpdatedScore = {
              utilisateurId: userConnected.id,
              jeuId: gamePlayed,
              points: scorePlayer,
            };
            await axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/api/score/${
                tmpScore[0].ScoreId
              }`,
              UpdatedScore
            );
          } catch (err) {
            console.error(err);
          }
        };
        postScore();
      }
    }
  }, [getScoreUser]);

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
      setGameOverGH(true);
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
    setGameOverGH(false);
  }

  function handleNewGameGuitarHero() {
    setGameOverGH(false);
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
              <p>
                Score : <span style={{ color: "black" }}>{scorePlayer}</span>
              </p>
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

GuitarHero.propTypes = {
  gameOverGH: PropTypes.bool.isRequired,
  setGameOverGH: PropTypes.func.isRequired,
  gamePlayed: PropTypes.number.isRequired,
};

export default GuitarHero;
