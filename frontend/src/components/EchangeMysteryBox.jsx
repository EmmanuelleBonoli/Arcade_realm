import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function EchangeMysteryBox({ lotMystery }) {
  const [displayMario, setDisplayMario] = useState("mario");
  const [displayMysteryBox, setDisplayMysteryBox] = useState("boxMystery");
  const [displayLotMystery, setDisplayLotMystery] = useState("lotMystery");

  useEffect(() => {
    setTimeout(() => {
      setDisplayMario("mario2");
    }, 2000);
    setTimeout(() => {
      setDisplayMysteryBox("boxMystery2");
    }, 2000);
    setTimeout(() => {
      setDisplayMario("mario3");
    }, 3000);
    setTimeout(() => {
      setDisplayLotMystery("lotMystery2");
    }, 4000);
    setTimeout(() => {
      setDisplayMysteryBox("boxMystery3");
    }, 5000);
  }, []);

  return (
    <div className="echangeMysteryBox">
      {lotMystery.map((lot) => (
        <div className="lotMysteryContainer" key={lot.id}>
          <img
            className={displayLotMystery}
            src={`${import.meta.env.VITE_BACKEND_URL}${lot.image}`}
            alt={lot.name}
          />
          <h2 className={displayLotMystery}>{lot.name}</h2>
        </div>
      ))}

      <img
        className={displayMysteryBox}
        src="/images/Utilisateur/mystery_box.png"
        alt="Mystery Box"
      />

      <img
        className={displayMario}
        src="/images/Echange/MarioSaut.png"
        alt="Mario"
      />
    </div>
  );
}
EchangeMysteryBox.propTypes = {
  lotMystery: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      exchange: PropTypes.number.isRequired,
      podium: PropTypes.number.isRequired,
      utilisateur_id: PropTypes.number,
      win: PropTypes.number.isRequired,
      mystery: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default EchangeMysteryBox;
