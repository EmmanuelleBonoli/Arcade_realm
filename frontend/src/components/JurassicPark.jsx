import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PropTypes } from "prop-types";
import GameContext from "../contexts/GameContext";
import userContext from "../contexts/UserContext";

export default function JurassicPark({
  gamePlayed,
  gameOverJP,
  setGameOverJP,
}) {
  const { userConnected } = useContext(userContext);
  const { setChooseScreen } = useContext(GameContext);

  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);
  const [size, setSize] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(null);
  const [getScoreUser, setGetScoreUser] = useState({});

  // const [cursorX, setCursorX] = useState();
  // const [cursorY, setCursorY] = useState();
  // const [gameStarted, setGameStarted] = useState(false);

  // const cursorWidth = 1300;
  // const cursorHeight = 530;

  // useEffect(() => {
  //   window.addEventListener("mousemove", (e) => {
  //     if (gameStarted) {
  //       setCursorX(e.pageX - cursorWidth / 2);
  //       setCursorY(e.pageY - cursorHeight / 2);
  //     }
  //   });
  // }, [gameStarted]);

  // const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setGameOverJP(true);
    }
  }, [timer]);

  useEffect(() => {
    if (gameOverJP === true) {
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
  }, [gameOverJP]);

  useEffect(() => {
    if (score > 0) {
      const tmpScore = getScoreUser.filter(
        (scoreSearch) => scoreSearch.name === "Jurassic Parc"
      );
      if (tmpScore.length === 0) {
        const postScore = async () => {
          const user = JSON.parse(localStorage.getItem("token"));
          try {
            const NewScore = {
              utilisateurId: userConnected.id,
              jeuId: 9,
              points: score,
            };

            const NewUser = {
              pseudo: userConnected.pseudo,
              email: userConnected.email,
              password: userConnected.password,
              image: userConnected.image,
              admin: userConnected.admin,
              points: userConnected.points + score,
              podium: userConnected.podium,
              tickets: userConnected.tickets,
            };

            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/score`,
              NewScore,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
            await axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${
                userConnected.id
              }`,
              NewUser
            );
          } catch (err) {
            console.error(err);
          }
        };
        postScore();
      } else if (score > tmpScore[0].points) {
        const postScore = async () => {
          const user = JSON.parse(localStorage.getItem("token"));
          try {
            const UpdatedScore = {
              utilisateurId: userConnected.id,
              jeuId: gamePlayed,
              points: score,
            };
            await axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/api/score/${
                tmpScore[0].ScoreId
              }`,
              UpdatedScore,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
          } catch (err) {
            console.error(err);
          }
        };
        postScore();
      }
    }
  }, [getScoreUser]);

  const imageUrls = [
    "/images/Jeux_ligne/JurassicPark/allosaurus.webp",
    "/images/Jeux_ligne/JurassicPark/carnotorus.png",
    "/images/Jeux_ligne/JurassicPark/t_rex.png",
    "/images/Jeux_ligne/JurassicPark/Baryonyx.webp",
    "/images/Jeux_ligne/JurassicPark/Concenvenato.webp",
    "/images/Jeux_ligne/JurassicPark/Giganotosaurus.webp",
    "/images/Jeux_ligne/JurassicPark/Proceratosaurus.webp",
    "/images/Jeux_ligne/JurassicPark/ScorpiosRex.webp",
    "/images/Jeux_ligne/JurassicPark/spinosaures.png",
    "/images/Jeux_ligne/JurassicPark/Troodon.webp",
    "/images/Jeux_ligne/JurassicPark/Tyrannosaurus.png",
    "/images/Jeux_ligne/JurassicPark/VelociRaptor.webp",
    "/images/Jeux_ligne/JurassicPark/Brachiosauru.webp",
    "/images/Jeux_ligne/JurassicPark/Dilophosaurus.webp",
    "/images/Jeux_ligne/JurassicPark/Dimorphodon.webp",
    "/images/Jeux_ligne/JurassicPark/Edmontosaurus.webp",
    "/images/Jeux_ligne/JurassicPark/gallimimus.webp",
    "/images/Jeux_ligne/JurassicPark/indominus_rex.webp",
    "/images/Jeux_ligne/JurassicPark/Indoraptor.webp",
    "/images/Jeux_ligne/JurassicPark/Metriacanthosaurus.webp",
    "/images/Jeux_ligne/JurassicPark/Pachycephalosaurus.webp",
    "/images/Jeux_ligne/JurassicPark/Parasaurolophus.webp",
    "/images/Jeux_ligne/JurassicPark/Proceratosaurus.webp",
    "/images/Jeux_ligne/JurassicPark/Stegosaurus.webp",
    "/images/Jeux_ligne/JurassicPark/Stygimoloch.webp",
    "/images/Jeux_ligne/JurassicPark/Proceratosaurus.webp",
    "/images/Jeux_ligne/JurassicPark/Triceratops.webp",
  ];
  const [dino, setDino] = useState(imageUrls[0]);
  const randomSize = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const randomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const decreaseTimer = (i) => {
    setTimeout(() => {
      setTimer(30 - i);
    }, 1000 * i);
  };
  const launchTimer = () => {
    //  setGameStarted(true);
    for (let i = 30; i > 0; i -= 1) {
      decreaseTimer(i);
    }
  };

  const handleGame = (e) => {
    const leftPosition = randomNumber(0, 75);
    const topPosition = randomNumber(0, 75);
    setLeft(leftPosition);
    setTop(topPosition);
    const newSize = randomSize(80, 200);
    setSize(newSize);
    setAnimationKey((prevKey) => prevKey + 1);
    setScore(score + 100);
    setDino(getRandomElement(imageUrls));
    e.stopPropagation();
  };

  const resetTimer = () => {
    setGameOverJP(false);
    setTimer(30);
  };

  function closeGame() {
    setChooseScreen("menu");
    setScore(0);
  }

  return (
    <div className="bord-jeux">
      <div className="int-jeux">
        {/* {gameStarted ? (
          <div
            className="cursor"
            style={{
              left: `${cursorX}px`,
              top: `${cursorY}px`,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        ) : null} */}
        <div className="information-jeux">
          {/* <h3>Name :</h3> */}
          <h3>
            Score :{" "}
            {score > 0 ? (
              <span style={{ color: "#DD6E42" }}>{score}</span>
            ) : null}
          </h3>
          <h3>
            Time : <span style={{ color: "#DD6E42" }}>{timer}</span>
          </h3>
          <img
            className="closeGame"
            src="/images/Jeux_ligne/x.png"
            onClick={closeGame}
            role="presentation"
            alt="closeGame"
          />
        </div>
        {timer && timer > 0 ? (
          <button
            type="button"
            className="target"
            onClick={handleGame}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animation: "target 3s forwards",
            }}
          >
            <img
              key={animationKey}
              src={dino}
              alt="Dino Img"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </button>
        ) : (
          <div className="luncher">
            <button
              type="button"
              className="launchGameButton"
              onClick={() => {
                resetTimer();
                launchTimer();
                setScore(0);
              }}
            >
              GO
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
JurassicPark.propTypes = {
  gameOverJP: PropTypes.bool.isRequired,
  setGameOverJP: PropTypes.func.isRequired,
  gamePlayed: PropTypes.number.isRequired,
};
