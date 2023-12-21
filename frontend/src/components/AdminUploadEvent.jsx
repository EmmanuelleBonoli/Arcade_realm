import { PropTypes } from "prop-types";
import axios from "axios";
// import { useState } from "react";

function AdminUploadEvent({ onClose, resetUploadEvent, setResetUploadEvent }) {
  //   const [nameEvent, setNameEvent] = useState("");
  // const [setImageLot] = useState("");

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        image: `/images/Evenements/affiche_accueil.png`,
      };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/evenement`,
        data
      );
      setResetUploadEvent(!resetUploadEvent);
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
          <h1>Création d'un nouvel évènement</h1>
        </div>
        <form onSubmit={handleSubmit} className="upload-container">
          <p>Nom de l'évènement</p>
          <input
            type="text"
            // onChange={(event) => setNameEvent(event.target.value)}
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

AdminUploadEvent.propTypes = {
  onClose: PropTypes.func.isRequired,
  setResetUploadEvent: PropTypes.func.isRequired,
  resetUploadEvent: PropTypes.bool.isRequired,
};

export default AdminUploadEvent;
