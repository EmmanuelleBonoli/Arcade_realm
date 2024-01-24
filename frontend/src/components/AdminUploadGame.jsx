import { PropTypes } from "prop-types";
import axios from "axios";
import { useState } from "react";

function AdminUploadGame({ onClose, resetUploadGame, setResetUploadGame }) {
  const [nameGame, setNameGame] = useState("");
  // const [imageGame, setImageGame] = useState("");
  const [rulesGame, setRulesGame] = useState("");
  const [actifGame, setActifGame] = useState(false);
  const [realGame, setRealGame] = useState(false);
  const [dateGame, setDateGame] = useState("");
  const [nbBorneGame, setNbBorneGame] = useState(0);
  const [descGame, setDescGame] = useState("");

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const data = {
        name: nameGame,
        image: `/images/Evenements/affiche_accueil.png`,
        regles: rulesGame,
        actif: actifGame,
        physique: realGame,
        date: dateGame,
        nbborne: nbBorneGame,
        description: descGame,
      };
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/jeu`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setResetUploadGame(!resetUploadGame);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="adminUploadLot" onClick={onClose} role="presentation">
      <div
        className="upload-form"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div className="header-container">
          <h1>Création d'un nouveau jeu</h1>
        </div>
        <form onSubmit={handleSubmit} className="upload-container">
          <p>Nom du jeu</p>
          <input
            type="text"
            onChange={(event) => setNameGame(event.target.value)}
            onClick={handleInputClick}
          />
          <p>Règles du jeu</p>
          <input
            type="text"
            onChange={(event) => setRulesGame(event.target.value)}
            onClick={handleInputClick}
          />
          <p>Actif</p>
          <input
            type="text"
            onChange={(event) => setActifGame(event.target.value)}
            onClick={handleInputClick}
          />
          <p>Jeu physique</p>
          <input
            type="text"
            onChange={(event) => setRealGame(event.target.value)}
            onClick={handleInputClick}
          />
          <p>Date de création du jeu</p>
          <input
            type="date"
            onChange={(event) => setDateGame(event.target.value)}
            onClick={handleInputClick}
          />
          <p>Nombre de bornes disponibles</p>
          <input
            type="text"
            onChange={(event) => setNbBorneGame(event.target.value)}
            onClick={handleInputClick}
          />
          <p>Description du jeu</p>
          <input
            type="text"
            onChange={(event) => setDescGame(event.target.value)}
            onClick={handleInputClick}
          />

          {/* <input
            type="file"
            // onChange={(event) => setImageLot(event.target.files[0])}
            accept=".png, .jpg,.jpeg"
          /> */}

          <button type="submit" className="btn-inscription">
            Valider la création
          </button>
        </form>
      </div>
    </div>
  );
}

AdminUploadGame.propTypes = {
  onClose: PropTypes.func.isRequired,
  setResetUploadGame: PropTypes.func.isRequired,
  resetUploadGame: PropTypes.bool.isRequired,
};

export default AdminUploadGame;
