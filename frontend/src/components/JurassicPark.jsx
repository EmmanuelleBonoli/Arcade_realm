import { useState } from "react";

export default function App() {
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);
  const [size, setSize] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(null);
  const [dino, setDino] = useState(null);

  const imageUrls = [
    "/images/allosaurus.webp",
    "/images/carnotorus.png",
    "/images/t_rex.png",
    "/images/Baryonyx.webp",
    "/images/Concenvenato.webp",
    "/images/Giganotosaurus.webp",
    "/images/Proceratosaurus.webp",
    "/images/ScorpiosRex.webp",
    "p/images/spinosaures.png",
    "/images/Troodon.webp",
    "/images/Tyrannosaurus.png",
    "/images/VelociRaptor.webp",
    "/images/Brachiosauru.webp",
    "/images/Dilophosaurus.webp",
    "/images/Dimorphodon.webp",
    "/images/Edmontosaurus.webp",
    "/images/gallimimus.webp",
    "/images/indominus_rex.webp",
    "/images/Indoraptor.webp",
    "/images/Metriacanthosaurus.webp",
    "/images/Pachycephalosaurus.webp",
    "/images/Parasaurolophus.webp",
    "/images/Proceratosaurus.webp",
    "/images/Stegosaurus.webp",
    "/images/Stygimoloch.webp",
    "/images/Proceratosaurus.webp",
    "/images/Triceratops.webp",
  ];

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
    setScore(score + 10);
    setDino(getRandomElement(imageUrls));
    e.stopPropagation();
  };

  const resetTimer = () => {
    setTimer(30);
  };

  return (
    <div className="bord-jeux">
      <div className="int-jeux">
        <div className="information-jeux">
          <h3>Name :</h3>
          <h3>
            Score :{" "}
            {score > 0 ? (
              <span style={{ color: "#DD6E42" }}>{score}</span>
            ) : null}
          </h3>
          <h3>
            Time : <span style={{ color: "#DD6E42" }}>{timer}</span>
          </h3>
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
                width: "100%", // Assurez-vous que l'image occupe tout l'espace du bouton
                height: "100%",
              }}
            />
          </button>
        ) : (
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
        )}
      </div>
    </div>
  );
}
