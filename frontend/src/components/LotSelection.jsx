import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";

function LotSelection({ lotId, selectedLots, setSelectedLots }) {
  const [lotSelected, setLotSelected] = useState(
    selectedLots.includes(lotId)
      ? "images/Utilisateur/img-coche.png"
      : "images/Utilisateur/img-n-coche.png"
  );

  function handleSelect() {
    let updatedSelectedLots;
    if (selectedLots.includes(lotId)) {
      updatedSelectedLots = selectedLots.filter((id) => id !== lotId);
    } else if (selectedLots.length > 0 && !selectedLots.includes(lotId)) {
      updatedSelectedLots = [lotId];
    } else {
      updatedSelectedLots = [...selectedLots, lotId];
    }
    setSelectedLots(updatedSelectedLots);
  }

  useEffect(() => {
    setLotSelected(
      selectedLots.includes(lotId)
        ? "images/Utilisateur/img-coche.png"
        : "images/Utilisateur/img-n-coche.png"
    );
  }, [selectedLots, lotId]);

  return (
    <div className="elispe-coche">
      <img
        src={lotSelected}
        onClick={() => handleSelect()}
        alt="coche échange"
        role="presentation"
      />
    </div>
  );
}

LotSelection.propTypes = {
  lotId: PropTypes.number.isRequired,
  selectedLots: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelectedLots: PropTypes.func.isRequired,
};

export default LotSelection;
