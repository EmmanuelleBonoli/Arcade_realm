import axios from "axios";
import { useEffect, useState } from "react";

function Events() {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const getEvent = async () => {
      const dataEvent = await axios.get(`
            ${import.meta.env.VITE_BACKEND_URL}/api/evenement`);
      setEvent(dataEvent.data);
    }
    getEvent();
  }, []);

  return (
    <div className="events">
      <h1>Evènements à venir</h1>
      <div className="affiches"></div>
    </div>
  );
}

export default Events;
