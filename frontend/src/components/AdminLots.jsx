import { useEffect, useState } from "react";
import axios from "axios";
import AdminUploadLot from "./AdminUploadLot";
import AdminChooseLot from "./AdminChooseLot";
import AdminUploadLotMystery from "./AdminUploadLotMystery";

function AdminLots() {
  const [dataLots, setDataLots] = useState([]);
  const [uploadLotModal, setUploadLotModal] = useState(false);
  const [resetUploadLot, setResetUploadLot] = useState(false);
  const [chooseLotModal, setChooseLotModal] = useState(false);
  const [uploadLotModalMystery, setUploadLotModalMystery] = useState(false);
  const [savePlacePodiumLot, setSavePlacePodiumLot] = useState(0);
  const [confirmPodium, setConfirmPodium] = useState(0);

  const getLots = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const fetchLots = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataLots(fetchLots.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLots();
  }, [resetUploadLot]);

  const handleDeleteLots = async (data) => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot/${data}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataLots(dataLots.filter((lot) => lot.id !== data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLotsPodium = async (lot) => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const updatedLot = {
        id: lot.id,
        name: lot.name,
        image: lot.image,
        description: lot.description,
        utilisateurId: lot.utilisateur_id,
        win: lot.win,
        exchange: lot.exchange,
        podium: 0,
        mystery: lot.mystery,
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot/${lot.id}`,
        updatedLot,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getLots();
    } catch (err) {
      console.error(err);
    }
  };

  const openUploadLotModal = () => {
    setUploadLotModal(true);
  };

  const closeUploadLotModal = () => {
    setUploadLotModal(false);
  };

  const openChooseLotModal = (placePodium) => {
    setSavePlacePodiumLot(placePodium);
    setChooseLotModal(true);
  };

  const closeChooseLotModal = () => {
    setChooseLotModal(false);
  };

  const openUploadLotModalMystery = () => {
    setUploadLotModalMystery(true);
  };

  const closeUploadLotModalMystery = () => {
    setUploadLotModalMystery(false);
  };

  return (
    <div className="adminLots">
      {uploadLotModalMystery && (
        <AdminUploadLotMystery
          onClose={closeUploadLotModalMystery}
          setResetUploadLot={setResetUploadLot}
          resetUploadLot={resetUploadLot}
        />
      )}
      {uploadLotModal && (
        <AdminUploadLot
          onClose={closeUploadLotModal}
          setResetUploadLot={setResetUploadLot}
          resetUploadLot={resetUploadLot}
        />
      )}
      {chooseLotModal && (
        <AdminChooseLot
          confirmPodium={confirmPodium}
          setConfirmPodium={setConfirmPodium}
          onClose={closeChooseLotModal}
          setResetUploadLot={setResetUploadLot}
          resetUploadLot={resetUploadLot}
          dataLots={dataLots}
          savePlacePodiumLot={savePlacePodiumLot}
        />
      )}
      <div className="lotsUploads">
        <div className="allLots">
          <h2>Les lots à gagner</h2>

          <div
            className="itemServices addBox"
            onClick={openUploadLotModal}
            role="presentation"
          >
            <img
              className="add"
              src="/images/Utilisateur/plus.png"
              alt="ajout doc"
            />
          </div>
          {dataLots
            .filter((lotfilter) => lotfilter.win === 0)
            .map((lot) => {
              return (
                <div className="itemServices" key={lot.id}>
                  <img
                    className="lots"
                    src={`${import.meta.env.VITE_BACKEND_URL}/${lot.image}`}
                    alt="jeux"
                  />
                  <img
                    className="suppr"
                    src="/images/Utilisateur/delete.png"
                    alt="suppr"
                    onClick={() => handleDeleteLots(lot.id)}
                    role="presentation"
                  />
                </div>
              );
            })}
        </div>
        <div className="allLots">
          <h2>Mystery Box</h2>

          {dataLots
            .filter((lotfilter) => lotfilter.mystery === 1)
            .map((lot) => {
              return (
                <div className="itemServices" key={lot.id}>
                  <img
                    className="lots"
                    src={`${import.meta.env.VITE_BACKEND_URL}/${lot.image}`}
                    alt="jeux"
                  />
                  <img
                    className="suppr"
                    src="/images/Utilisateur/delete.png"
                    alt="suppr"
                    onClick={() => handleDeleteLots(lot.id)}
                    role="presentation"
                  />
                </div>
              );
            })}
          {dataLots.filter((lotfilter) => lotfilter.mystery === 1).length ===
            0 && (
            <div
              className="itemServices addBox"
              onClick={() => openUploadLotModalMystery()}
              role="presentation"
            >
              <img
                className="add"
                src="/images/Utilisateur/plus.png"
                alt="ajout doc"
              />
            </div>
          )}
        </div>
      </div>
      <h2>Les lots du podium</h2>
      <div className="podium">
        <div className="firstPlace">
          <p className="placePlayer">1er</p>
          {dataLots
            .filter((lotfilter) => lotfilter.podium === 1)
            .map((lot) => {
              return (
                <div className="itemServices" key={lot.id}>
                  <img
                    className="lots"
                    src={`${import.meta.env.VITE_BACKEND_URL}/${lot.image}`}
                    alt="jeux"
                  />
                  <img
                    className="suppr"
                    src="/images/Utilisateur/delete.png"
                    alt="suppr"
                    onClick={() => handleDeleteLotsPodium(lot)}
                    role="presentation"
                  />
                </div>
              );
            })}
          {dataLots.filter((lotfilter) => lotfilter.podium === 1).length ===
            0 && (
            <div
              className="itemServices addBox"
              onClick={() => openChooseLotModal(1)}
              role="presentation"
            >
              <img
                className="add"
                src="/images/Utilisateur/plus.png"
                alt="ajout doc"
              />
            </div>
          )}
        </div>
        <div className="secondPlace">
          <p className="placePlayer">2ème</p>
          {dataLots
            .filter((lotfilter) => lotfilter.podium === 2)
            .map((lot) => {
              return (
                <div className="itemServices" key={lot.id}>
                  <img
                    className="lots"
                    src={`${import.meta.env.VITE_BACKEND_URL}/${lot.image}`}
                    alt="jeux"
                  />
                  <img
                    className="suppr"
                    src="/images/Utilisateur/delete.png"
                    alt="suppr"
                    onClick={() => handleDeleteLotsPodium(lot)}
                    role="presentation"
                  />
                </div>
              );
            })}
          {dataLots.filter((lotfilter) => lotfilter.podium === 2).length ===
            0 && (
            <div
              className="itemServices addBox"
              onClick={() => openChooseLotModal(2)}
              role="presentation"
            >
              <img
                className="add"
                src="/images/Utilisateur/plus.png"
                alt="ajout doc"
              />
            </div>
          )}
        </div>
        <div className="thirdPlace">
          <p className="placePlayer">3ème</p>
          {dataLots
            .filter((lotfilter) => lotfilter.podium === 3)
            .map((lot) => {
              return (
                <div className="itemServices" key={lot.id}>
                  <img
                    className="lots"
                    src={`${import.meta.env.VITE_BACKEND_URL}/${lot.image}`}
                    alt="jeux"
                  />
                  <img
                    className="suppr"
                    src="/images/Utilisateur/delete.png"
                    alt="suppr"
                    onClick={() => handleDeleteLotsPodium(lot)}
                    role="presentation"
                  />
                </div>
              );
            })}
          {dataLots.filter((lotfilter) => lotfilter.podium === 3).length ===
            0 && (
            <div
              className="itemServices addBox"
              onClick={() => openChooseLotModal(3)}
              role="presentation"
            >
              <img
                className="add"
                src="/images/Utilisateur/plus.png"
                alt="ajout doc"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminLots;
