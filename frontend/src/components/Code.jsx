import { PropTypes } from "prop-types";

export default function Code({ onClose }) {
  return (
    <div className="container-modale-qr" onClick={onClose} role="presentation">
      <div
        className="img-qr"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <img src="/images/Utilisateur/QR_Code.png" alt="qrcode" />
      </div>
    </div>
  );
}

Code.propTypes = {
  onClose: PropTypes.func.isRequired,
};
