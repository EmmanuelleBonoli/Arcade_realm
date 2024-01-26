import axios from "axios";
import { useEffect, useState } from "react";
import AdminUploadEvent from "./AdminUploadEvent";
import AdminUploadGame from "./AdminUploadGame";

function AdminServices() {
  const [dataEvents, setDataEvents] = useState([]);
  const [dataGames, setDataGames] = useState([]);
  const [uploadEventModal, setUploadEventModal] = useState(false);
  const [resetUploadEvent, setResetUploadEvent] = useState(false);
  const [uploadGameModal, setUploadGameModal] = useState(false);
  const [resetUploadGame, setResetUploadGame] = useState(false);

  const handleDeleteDataEvents = async (data) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/evenement/${data}`
      );
      setDataEvents(dataEvents.filter((event) => event.id !== data));
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteDataGames = async (data) => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/jeu/${data}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDataGames(dataGames.filter((game) => game.id !== data));
    } catch (err) {
      console.error(err);
    }
  };

  const getGames = async () => {
    try {
      const fetchGames = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/jeu`
      );
      setDataGames(fetchGames.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchEvents = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/evenement/`
        );
        setDataEvents(fetchEvents.data);
      } catch (err) {
        console.error(err);
      }
    };

    getEvents();
    getGames();
  }, [resetUploadEvent, resetUploadGame]);

  const openUploadEventModal = () => {
    setUploadEventModal(true);
  };

  const closeUploadEventModal = () => {
    setUploadEventModal(false);
  };
  const openUploadGameModal = () => {
    setUploadGameModal(true);
  };

  const closeUploadGameModal = () => {
    setUploadGameModal(false);
  };

  return (
    <div className="adminServices">
      {uploadEventModal && (
        <AdminUploadEvent
          onClose={closeUploadEventModal}
          setResetUploadEvent={setResetUploadEvent}
          resetUploadEvent={resetUploadEvent}
        />
      )}
      {uploadGameModal && (
        <AdminUploadGame
          onClose={closeUploadGameModal}
          setResetUploadGame={setResetUploadGame}
          resetUploadGame={resetUploadGame}
        />
      )}
      <h2>Les évènements</h2>
      <div className="events">
        {dataEvents.map((event) => {
          return (
            <div className="itemServices eventsContainer" key={event.id}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${event.image}`}
                alt="evenement à venir"
              />
              <img
                className="suppr"
                src="/images/Utilisateur/delete.png"
                alt="suppr"
                onClick={() => handleDeleteDataEvents(event.id)}
                role="presentation"
              />
            </div>
          );
        })}
        <div
          onClick={openUploadEventModal}
          role="presentation"
          className="itemServices addBox"
        >
          <img
            className="add"
            src="/images/Utilisateur/plus.png"
            alt="ajout doc"
          />
        </div>
      </div>
      <h2>Les jeux</h2>
      <div className="games">
        <div
          role="presentation"
          className="itemServices addBox"
          onClick={openUploadGameModal}
        >
          <img
            className="add"
            src="/images/Utilisateur/plus.png"
            alt="ajout doc"
          />
        </div>
        {dataGames.map((game) => {
          return (
            <div className="itemServices" key={game.id}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${game.image}`}
                alt="jeux"
              />
              <img
                className="suppr"
                src="/images/Utilisateur/delete.png"
                alt="suppr"
                onClick={() => handleDeleteDataGames(game.id)}
                role="presentation"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminServices;
