import axios from "axios";
import { useEffect, useState } from "react";

function AdminServices() {
  const [dataEvents, setDataEvents] = useState([]);
  const [dataLots, setDataLots] = useState([]);
  const [dataGames, setDataGames] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const fetchEvents = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/evenement`
      );
      setDataEvents(fetchEvents.data);
    };

    const getLots = async () => {
      const fetchLots = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot`
      );
      setDataLots(fetchLots.data);
    };
    const getGames = async () => {
      const fetchGames = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/jeu`
      );
      setDataGames(fetchGames.data);
    };
    getEvents();
    getLots();
    getGames();
  }, []);

  return (
    <div className="adminServices">
      <div className="lots">
        {dataLots.map((lot) => {
          return (
            <div className="itemServices" key={lot.id}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${lot.image}`}
                alt="lot à gagner"
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
            </div>
          );
        })}
        <div className="itemServices">+</div>
      </div>
      <div className="games" />
    </div>
  );
}

export default AdminServices;
