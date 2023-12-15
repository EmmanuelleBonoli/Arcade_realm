import React, { useEffect, useState } from "react";
import axios from "axios";
function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvent = async () => {
      const dataEvent = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/evenement`
      );
      setEvents(dataEvent.data);
    };
    getEvent();
  }, []);

  return (
    <div className="events">
      <h1>Evènements à venir</h1>
      <div className="container-affiches">
        {events.map((event) => (
          <div className="affiches" key={event.id}>
            <img
              key={event.id}
              src={`${import.meta.env.VITE_BACKEND_URL}${event.image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
