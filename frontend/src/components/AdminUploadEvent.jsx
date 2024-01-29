import { PropTypes } from "prop-types";
import { useState } from "react";
import axios from "axios";

function AdminUploadEvent({ onClose, resetUploadEvent, setResetUploadEvent }) {
  // resetUploadEvent, setResetUploadEvent
  // const [nameEvent, setNameEvent] = useState("");
  // const [setImageLot] = useState("");
  const [file, setFile] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const data = new FormData();
      data.append("image", file);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/evenement/addevent`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setFile(res.data[0]);
      setResetUploadEvent(!resetUploadEvent);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="adminUploadEvent" onClick={onClose} role="presentation">
      <div
        className="upload-form"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div className="header-container">
          <h1>Création d'un nouvel évènement</h1>
        </div>
        {/* <form onSubmit={handleSubmit} className="upload-container">
          <p>Nom de l'évènement</p> */}
        <div className="upload">
          <form onSubmit={handleSubmit}>
            <input
              name="filename"
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
            />

            <button type="submit" className="btn-validate-event">
              Valider la création
            </button>
          </form>
        </div>

        {/* </form> */}
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
