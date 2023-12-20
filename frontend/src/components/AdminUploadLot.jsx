import { PropTypes } from "prop-types";

function AdminUploadLot({ onClose }) {
  const handleInputClick = (e) => {
    e.stopPropagation();
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
        <div className="upload-container">
          <p>Nom du lot</p>
          <input type="text" onClick={handleInputClick} />

          <p>Description du lot</p>
          <input type="text" onClick={handleInputClick} />

          <button type="submit" className="btn-inscription">
            Télécharger une image
          </button>
        </div>
      </div>
    </div>
  );
}

AdminUploadLot.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AdminUploadLot;
