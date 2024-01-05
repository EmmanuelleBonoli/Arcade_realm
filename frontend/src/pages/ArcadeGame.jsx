import { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { uid } from "uid";
import GameContext from "../contexts/GameContext";
import ScreenArcade from "../components/ScreenArcade";

function ArcadeGame() {
  const navigate = useNavigate();
  const {
    isJoystickSelected,
    setIsJoystickSelected,
    setIsPressedRed,
    setIsPressedBlue,
    setIsPressedGreen,
    setIsPressedYellow,
    isPressedYellow,
    isPressedGreen,
    isPressedBlue,
    isPressedRed,
    openGames,
    setOpenGames,
    chooseScreen,
    setChooseScreen,
    gameSelected,
    setGameSelected,
    chooseArrow,
    setChooseArrow,
    scorePlayer,
    setScorePlayer,
    // count,
    // setCount,
  } = useContext(GameContext);

  const audio = useRef(null);
  const chooseArrowRef = useRef(chooseArrow);
  const [bestScoresOnline, setBestScoresOnline] = useState([]);
  const [gamesOnline, setGamesOnline] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const fetchGames = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/jeu/online`
        );
        setGamesOnline(fetchGames.data);
      } catch (err) {
        console.error(err);
      }
    };
    getGames();
  }, []);

  useEffect(() => {
    const getScoresGamesOnline = async () => {
      try {
        const fetchScoresGames = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/jeu/online/scores`
        );
        setBestScoresOnline(fetchScoresGames.data);
      } catch (err) {
        console.error(err);
      }
    };
    getScoresGamesOnline();
  }, []);

  useEffect(() => {
    chooseArrowRef.current = chooseArrow;
  }, [chooseArrow]);

  function handleClose() {
    setOpenGames(!openGames);
    setChooseScreen("start");
    navigate("/");
  }
  useEffect(() => {
    if (chooseScreen === "guitarHero") {
      if (audio.current != null) {
        audio.current.muted = false;
        audio.current.play();
      }
    } else {
      audio.current.muted = true;
    }
  }, [chooseScreen]);

  function handlePushBlue() {
    setIsPressedBlue(true);
    setTimeout(() => {
      setIsPressedBlue(false);
    }, 100);

    if (chooseScreen === "guitarHero" && chooseArrowRef.current[0]) {
      const newChooseArrow = [false, false, false, false];
      setChooseArrow(newChooseArrow);
      setScorePlayer(scorePlayer + 100);
    }
  }
  function handlePushRed() {
    setIsPressedRed(true);
    setTimeout(() => {
      setIsPressedRed(false);
    }, 100);
    if (chooseScreen === "start") {
      setChooseScreen("menu");
    }
    if (chooseScreen === "menu" && gameSelected === 0) {
      setChooseScreen("guitarHero");
    }
    if (chooseScreen === "menu" && gameSelected === 1) {
      setChooseScreen("JurassicPark");
    }
    if (chooseScreen === "guitarHero" && chooseArrowRef.current[3]) {
      const newChooseArrow = [false, false, false, false];
      setChooseArrow(newChooseArrow);
      setScorePlayer(scorePlayer + 100);
    }
  }
  function handlePushGreen() {
    setIsPressedGreen(true);
    setTimeout(() => {
      setIsPressedGreen(false);
    }, 100);
    if (chooseScreen === "guitarHero" && chooseArrowRef.current[1]) {
      const newChooseArrow = [false, false, false, false];
      setChooseArrow(newChooseArrow);
      setScorePlayer(scorePlayer + 100);
    }
  }
  function handlePushYellow() {
    setIsPressedYellow(true);
    setTimeout(() => {
      setIsPressedYellow(false);
    }, 100);
    if (chooseScreen === "guitarHero" && chooseArrowRef.current[2]) {
      const newChooseArrow = [false, false, false, false];
      setChooseArrow(newChooseArrow);
      setScorePlayer(scorePlayer + 100);
    }
  }

  function handleNavigateJoystick() {
    setIsJoystickSelected(true);
    setTimeout(() => {
      setIsJoystickSelected(false);
    }, 100);
    if (chooseScreen === "menu") {
      if (gameSelected < gamesOnline.length - 1) {
        setGameSelected((prevGameSelected) => prevGameSelected + 1);
      } else {
        setGameSelected(0);
      }
    }
  }

  return (
    <div className="container-gameOnline">
      <div className="gameOnline">
        <img
          className="closeButton"
          onClick={handleClose}
          role="presentation"
          src="/images/Jeux_ligne/x.png"
          alt="Exit"
        />
        <div className="spaceRules">
          <h2>Règles</h2>
          <img src="/images/Jeux_ligne/manetteRules.png" alt="manette" />
          {chooseScreen === "start" ? (
            <p>Cliquez sur le bouton rouge pour démarrer la borne.</p>
          ) : (
            ""
          )}
          {chooseScreen === "menu" ? (
            <p>
              Choisissez votre jeu en naviguant avec le joystick et sélectionnez
              avec le bouton rouge.
            </p>
          ) : (
            ""
          )}
          {chooseScreen === "JurassicPark" ? (
            <p>
              Shoot les dinosaures le plus vite possible et gagne un max de
              points !
            </p>
          ) : (
            ""
          )}
          {chooseScreen === "guitarHero" ? (
            <p>Cliquez sur le bon bouton à l'apparition de la note!</p>
          ) : (
            ""
          )}
        </div>
        <div className="spaceBorne">
          <img
            className="borne"
            src="/images/Jeux_ligne/borne6.png"
            alt="borne arcade en ligne"
          />
          <div className="screenArcade">
            <ScreenArcade gamesOnline={gamesOnline} />
          </div>

          <img
            className="joystick"
            role="presentation"
            onClick={handleNavigateJoystick}
            style={{
              transform: isJoystickSelected
                ? "rotate(20deg) translateX(21px)"
                : "none",
              transition: "transform 0.1s ease-out, background 0.1s ease-out",
            }}
            src="/images/Jeux_ligne/Joystick2.png"
            alt="borne arcade en ligne"
          />
          <img
            className="buttonBlue"
            src="/images/Jeux_ligne/boutonBleu2.png"
            alt="borne arcade en ligne"
            onClick={handlePushBlue}
            role="presentation"
            style={{
              transform: isPressedBlue ? "translateY(4px)" : "none",
              transition: "transform 0.1s ease-out, background 0.1s ease-out",
            }}
          />
          <img
            className="buttonYellow"
            onClick={handlePushYellow}
            role="presentation"
            style={{
              transform: isPressedYellow ? "translateY(4px)" : "none",
              transition: "transform 0.1s ease-out, background 0.1s ease-out",
            }}
            src="/images/Jeux_ligne/BoutonJaune2.png"
            alt="borne arcade en ligne"
          />
          <img
            onClick={handlePushRed}
            role="presentation"
            style={{
              transform: isPressedRed ? "translateY(4px)" : "none",
              transition: "transform 0.1s ease-out, background 0.1s ease-out",
            }}
            className="buttonRed"
            src="/images/Jeux_ligne/Boutonrouge2.png"
            alt="borne arcade en ligne"
          />
          <audio className="acdcGuitarHero" ref={audio} muted>
            <track kind="captions" />
            <source src="/sons/ACDC.mp3" type="audio/mp3" />
          </audio>
          <img
            className="buttonGreen"
            onClick={handlePushGreen}
            role="presentation"
            style={{
              transform: isPressedGreen ? "translateY(4px)" : "none",
              transition: "transform 0.1s ease-out, background 0.1s ease-out",
            }}
            src="/images/Jeux_ligne/boutonVert2.png"
            alt="borne arcade en ligne"
          />
        </div>
        <div className="areaScores">
          <div className="spaceScores">
            <h2>Meilleurs scores</h2>
            <img src="/images/Jeux_ligne/CoupeScores.png" alt="coupe" />

            {chooseScreen === "start"
              ? ""
              : bestScoresOnline
                  .filter((gameFilter, indexOfGame) => {
                    return indexOfGame === gameSelected;
                  })
                  .map((game) => {
                    return (
                      <div key={game.id}>
                        {game.meilleursScores.map((score) => {
                          return (
                            <p key={uid(5)}>
                              {score.utilisateur} - {score.score}pts
                            </p>
                          );
                        })}
                      </div>
                    );
                  })}
          </div>
        </div>
        <div className="RulesScoresResponsive">
          <div className="spaceRules2">
            <h2>Règles</h2>
            <img src="/images/Jeux_ligne/manetteRules.png" alt="manette" />
            {chooseScreen === "start" ? (
              <p>Cliquez sur le bouton rouge pour démarrer la borne.</p>
            ) : (
              ""
            )}
            {chooseScreen === "menu" ? (
              <p>
                Choisissez votre jeu avec le joystick et sélectionnez avec le
                bouton rouge.
              </p>
            ) : (
              ""
            )}
            {chooseScreen === "JurassicPark" ? (
              <p>
                Shoot les dinosaures le plus vites possible et gagne un max de
                point !
              </p>
            ) : (
              ""
            )}
            {chooseScreen === "guitarHero" ? (
              <p>Cliquez sur le bon bouton à l'apparition de la note!</p>
            ) : (
              ""
            )}
          </div>
          <div className="spaceScores2">
            <h2>Meilleurs scores</h2>
            <img src="/images/Jeux_ligne/CoupeScores.png" alt="coupe" />
            <p>1 - Rondoudou - 1350 pts</p>
            <p>2 - Gertrude - 1275 pts</p>
            <p>3 - Max - 899 pts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArcadeGame;
