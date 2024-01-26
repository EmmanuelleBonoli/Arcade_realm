import { PropTypes } from "prop-types";
import axios from "axios";
import { useState } from "react";

function AdminUploadLot({ onClose, resetUploadLot, setResetUploadLot }) {
  const [nameLot, setNameLot] = useState("");
  const [descLot, setDescLot] = useState("");
  const [file, setFile] = useState(undefined);
  // const [setImageLot] = useState("");

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const formData = new FormData();

      formData.append("name", nameLot);
      formData.append("description", descLot);
      formData.append("disponible", false);
      formData.append("image", file);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setResetUploadLot(!resetUploadLot);
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
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
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
  setResetUploadLot: PropTypes.func.isRequired,
  resetUploadLot: PropTypes.bool.isRequired,
};

export default AdminUploadLot;
