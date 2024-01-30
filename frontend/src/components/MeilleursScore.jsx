import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import Code from "./Code";

function MeilleursScore() {
  const { userConnected } = useContext(UserContext);
  const [scores, setScores] = useState([]);
  const [codeModal, setCodeModal] = useState(false);

  const openCodeModal = () => {
    setCodeModal(true);
  };

  const closeCodeModal = () => {
    setCodeModal(false);
  };

  useEffect(() => {
    if (codeModal) {
      // Ajouter la classe pour masquer le défilement lorsque la modal est ouverte
      document.body.classList.add("body-no-scroll");
    } else {
      // Retirer la classe lorsque la modal est fermée
      document.body.classList.remove("body-no-scroll");
    }
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [codeModal]);

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
      <div className="btn-qr-code">
        <button type="button" className="btn-score" onClick={openCodeModal}>
          Ajouter un score +
        </button>
        {codeModal && <Code onClose={closeCodeModal} />}
      </div>
    </div>
  );
}

export default MeilleursScore;
