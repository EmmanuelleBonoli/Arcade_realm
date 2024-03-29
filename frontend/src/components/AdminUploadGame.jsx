import { PropTypes } from "prop-types";
import axios from "axios";
import { useState } from "react";

function AdminUploadGame({ onClose, setResetUploadGame, resetUploadGame }) {
  const [nameGame, setNameGame] = useState("");
  const [rulesGame, setRulesGame] = useState("");
  const [actifGame, setActifGame] = useState(0);
  const [realGame, setRealGame] = useState(0);
  const [dateGame, setDateGame] = useState("");
  const [nbBorneGame, setNbBorneGame] = useState(0);
  const [descGame, setDescGame] = useState("");
  const [file, setFile] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const data = new FormData();
      data.append("name", nameGame);
      data.append("image", file);
      data.append("regles", rulesGame);
      data.append("actif", actifGame);
      data.append("physique", realGame);
      data.append("date", dateGame);
      data.append("nbBorne", nbBorneGame);
      data.append("description", descGame);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/jeu/addjeu`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setFile(res.data[0]);
      setResetUploadGame(!resetUploadGame);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="adminUploadGame" onClick={onClose} role="presentation">
      <div
        className="upload-form"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div className="header-container">
          <h1>Création d'un nouveau jeu</h1>
        </div>

        <form onSubmit={handleSubmit} className="upload-container">
          <div className="uploadp1">
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
            <div className="actif-real">
              <div className="actif">
                <p>Actif</p>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="inputSelect">
                  <input
                    type="checkbox"
                    checked={actifGame === 1}
                    onChange={(event) =>
                      setActifGame(event.target.checked ? 1 : 0)
                    }
                    onClick={handleInputClick}
                  />
                  <svg viewBox="0 0 64 64" height="2em" width="2em">
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      pathLength="575.0541381835938"
                      className="path"
                    />
                  </svg>
                </label>
              </div>
              <div className="real">
                <p>Jeu physique</p>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="inputSelect">
                  <input
                    type="checkbox"
                    checked={realGame === 1}
                    onChange={(event) =>
                      setRealGame(event.target.checked ? 1 : 0)
                    }
                    onClick={handleInputClick}
                  />
                  <svg viewBox="0 0 64 64" height="2em" width="2em">
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      pathLength="575.0541381835938"
                      className="path"
                    />
                  </svg>
                </label>
              </div>
            </div>
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
          </div>
          <div className="uploadp2">
            <input
              name="filename"
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
            />
            {/* <input
            type="file"
            // onChange={(event) => setImageLot(event.target.files[0])}
            accept=".png, .jpg,.jpeg"
          /> */}

            <button type="submit" className="btn-inscription">
              Valider la création
            </button>
          </div>
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
