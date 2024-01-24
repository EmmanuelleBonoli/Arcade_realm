import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function MeilleursScore() {
  const { userConnected } = useContext(UserContext);
  const [scores, setScores] = useState([]);
  useEffect(() => {
    if (userConnected) {
      const getScores = async () => {
        const user = JSON.parse(localStorage.getItem("token"));
        try {
          const dataScores = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/score/email/${
              userConnected.id
            }`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setScores(dataScores.data);
        } catch (e) {
          console.error(e);
        }
      };
      getScores();
    }
  }, []);

  return (
    <div className="container-MeilleursScore">
      <div className="user-name">
        <img src="/images/Utilisateur/Rectangle 142.png" alt="rectangle" />
        <h1>{userConnected.pseudo}</h1>
      </div>
      <div className="liste-jeux-points">
        <div className="nom-jeux">
          {scores.map((score) => (
            <p key={score.name}>{score.name}</p>
          ))}
        </div>
        <div className="gl-trait">
          <div className="trait" />
        </div>
        <div className="user-point">
          {scores.length > 0 &&
            scores.map((score) => <p key={score.name}>{score.points}</p>)}
        </div>
      </div>
      {/* <div className="total-points">
        <p>Total points : 16163 pts</p>
      </div> */}
    </div>
  );
}

export default MeilleursScore;
