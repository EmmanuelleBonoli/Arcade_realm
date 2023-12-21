import { PropTypes } from "prop-types";
import axios from "axios";
import { useState } from "react";

function AdminUploadLot({ onClose }) {
  const [nameLot, setNameLot] = useState("");
  const [descLot, setDescLot] = useState("");
  // const [setImageLot] = useState("");

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        name: nameLot,
        description: descLot,
        image: `/images/Lots/InvadersMug.png`,
        disponible: false,
      };
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/lot`, data);
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
          <h1>Création d'un nouveau lot</h1>
        </div>
        <form onSubmit={handleSubmit} className="upload-container">
          <p>Nom du lot</p>
          <input
            type="text"
            onChange={(event) => setNameLot(event.target.value)}
            onClick={handleInputClick}
          />

          <p>Description du lot</p>
          <input
            type="text"
            onChange={(event) => setDescLot(event.target.value)}
            onClick={handleInputClick}
          />

          <input
            type="file"
            // onChange={(event) => setImageLot(event.target.files[0])}
            accept=".png, .jpg,.jpeg"
          />

          <button type="submit" className="btn-inscription">
            Valider la création
          </button>
        </form>
      </div>
    </div>
  );
}

AdminUploadLot.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AdminUploadLot;
