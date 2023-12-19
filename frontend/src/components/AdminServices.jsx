import axios from "axios";
import { useEffect, useState } from "react";

function AdminServices() {
  const [dataEvents, setDataEvents] = useState([]);
  const [dataLots, setDataLots] = useState([]);
  const [dataGames, setDataGames] = useState([]);

  const handleDeleteDataLots = async (data) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/lot/${data}`);
      setDataLots(dataLots.filter((lot) => lot.id !== data));
    } catch (err) {
      console.error(err);
    }
  };
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
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/jeu/${data}`);
      setDataGames(dataGames.filter((game) => game.id !== data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchEvents = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/evenement`
        );
        setDataEvents(fetchEvents.data);
      } catch (err) {
        console.error(err);
      }
    };

    const getLots = async () => {
      try {
        const fetchLots = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/lot`
        );
        setDataLots(fetchLots.data);
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
    getEvents();
    getLots();
    getGames();
  }, []);

  return (
    <div className="adminServices">
      <div className="lots">
        <div className="itemServices addBox">
          <img
            className="add"
            src="/images/Utilisateur/plus.png"
            alt="ajout doc"
          />
        </div>
        {dataLots.map((lot) => {
          return (
            <div className="itemServices" key={lot.id}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${lot.image}`}
                alt="lot à gagner"
              />
              <img
                className="suppr"
                src="/images/Utilisateur/delete.png"
                alt="suppr"
                onClick={() => handleDeleteDataLots(lot.id)}
                role="presentation"
              />
            </div>
          );
        })}
      </div>
      <div className="events">
        {dataEvents.map((event) => {
          return (
            <div className="itemServices" key={event.id}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${event.image}`}
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
        <div className="itemServices addBox">
          <img
            className="add"
            src="/images/Utilisateur/plus.png"
            alt="ajout doc"
          />
        </div>
      </div>
      <div className="games">
        <div className="itemServices addBox">
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
                src={`${import.meta.env.VITE_BACKEND_URL}${game.image}`}
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
