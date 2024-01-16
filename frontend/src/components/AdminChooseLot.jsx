import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";

function AdminChooseLot({
  onClose,
  setResetUploadLot,
  resetUploadLot,
  dataLots,
  savePlacePodiumLot,
  setConfirmPodium,
  confirmPodium,
}) {
  const [usersPodium, setUsersPodium] = useState([]);

  useEffect(() => {
    const getPodium = async () => {
      try {
        const fetchUsers = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/podium`
        );
        setUsersPodium(fetchUsers.data);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };
    getPodium();
  }, []);

  const handleSaveLotPodium = async (lot) => {
    const winningUser = usersPodium.find(
      (user) => user.podium === savePlacePodiumLot
    );

    try {
      const updatedLot = {
        id: lot.id,
        name: lot.name,
        image: lot.image,
        description: lot.description,
        utilisateurId: winningUser.id,
        win: 1,
        exchange: lot.exchange,
        podium: savePlacePodiumLot,
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot/${lot.id}`,
        updatedLot
      );
    } catch (err) {
      console.error(err);
    }

    setResetUploadLot(!resetUploadLot);
    onClose();
  };

  function handleDeclarationAdmin() {
    setConfirmPodium(1);
  }
  function handleDeclarationAdmin2() {
    setConfirmPodium(2);
  }
  function handleDeclarationAdmin3() {
    setConfirmPodium(0);
    onClose();
  }

  return (
    <div className="adminChooseLots">
      <div className="ChooseLots">
        {confirmPodium === 0 && (
          <div className="confirmPodium">
            <h2>Le podium des joueurs a-t-il été actualisé ?</h2>
            <div className="confirmButtons">
              <button type="button" onClick={handleDeclarationAdmin2}>
                Oui
              </button>
              <button type="button" onClick={handleDeclarationAdmin}>
                Non
              </button>
            </div>
          </div>
        )}

        {confirmPodium === 1 && (
          <div className="confirmPodium2">
            <h2>
              L'actualisation du podium est nécessaire sinon les lots seront
              affectés aux mauvais joueurs. Rendez-vous dans la section "Gestion
              des concours".
            </h2>
            <button type="button" onClick={handleDeclarationAdmin3}>
              Ok
            </button>
          </div>
        )}

        {confirmPodium === 2 && (
          <div className="confirmPodium3">
            <img
              className="close"
              onClick={handleDeclarationAdmin3}
              role="presentation"
              src="/images/Jeux_ligne/x.png"
              alt="fermer la fenetre"
            />
            <h2>Choisissez le lot parmis les lots disponibles suivants :</h2>
            <div className="lotsContainer">
              {dataLots
                .filter((lotFiltered) => lotFiltered.win === 0)
                .map((lot) => {
                  return (
                    <div className="itemServices" key={lot.id}>
                      <img
                        onClick={() => handleSaveLotPodium(lot)}
                        src={`${import.meta.env.VITE_BACKEND_URL}${lot.image}`}
                        alt={lot.image}
                        role="presentation"
                        className="lots"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

AdminChooseLot.propTypes = {
  onClose: PropTypes.func.isRequired,
  setResetUploadLot: PropTypes.func.isRequired,
  resetUploadLot: PropTypes.bool.isRequired,
  savePlacePodiumLot: PropTypes.number.isRequired,
  setConfirmPodium: PropTypes.func.isRequired,
  confirmPodium: PropTypes.number.isRequired,
  dataLots: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      exchange: PropTypes.number.isRequired,
      podium: PropTypes.number.isRequired,
      utilisateur_id: PropTypes.number,
      win: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default AdminChooseLot;
