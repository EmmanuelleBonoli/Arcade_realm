import React, { useEffect, useState } from "react";
import axios from "axios";

function Classement() {
  const [lots, setLots] = useState([]);
  const [usersPodium, setUsersPodium] = useState([]);

  useEffect(() => {
    const getLots = async () => {
      try {
        const fetchLots = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/lot`
        );
        setLots(fetchLots.data);
      } catch (err) {
        console.error(err);
      }
    };

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
    getLots();
    getPodium();
  }, []);

  return (
    <div className="parent-container">
      <div className="classement-recompense">
        <div className="classement">
          <h1>Classement de la semaine</h1>
          <div className="top-3">
            <div className="winner2">
              {usersPodium
                .filter((userFiltered) => userFiltered.podium === 2)
                .map((user) => (
                  <div key={user.id}>
                    <p>{user.pseudo}</p>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${user.image}`}
                      alt={user.pseudo}
                    />
                  </div>
                ))}
            </div>
            <div className="winner1">
              {usersPodium
                .filter((userFiltered) => userFiltered.podium === 1)
                .map((user) => (
                  <div key={user.id}>
                    <p>{user.pseudo}</p>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${user.image}`}
                      alt={user.pseudo}
                    />
                  </div>
                ))}
            </div>
            <div className="winner3">
              {usersPodium
                .filter((userFiltered) => userFiltered.podium === 3)
                .map((user) => (
                  <div key={user.id}>
                    <p>{user.pseudo}</p>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${user.image}`}
                      alt={user.pseudo}
                    />
                  </div>
                ))}
            </div>
          </div>

          <img
            className="podium-img"
            src="/images/Podium/podiumvector.png"
            alt="podium"
          />
        </div>
        <div className="recompenses">
          <h2>Récompenses</h2>
          <div className="winners">
            <div className="container-winner1-3">
              <div className="winners">
                <img
                  className="medaille"
                  src="/images/Podium/1st.png"
                  alt="1st"
                />
                {usersPodium
                  .filter((userFiltered) => userFiltered.podium === 1)
                  .map((user) => (
                    <p key={user.id} className="playerNames">
                      {user.pseudo}
                    </p>
                  ))}
                {" - "}
                {lots
                  .filter((lotFiltered) => lotFiltered.podium === 1)
                  .map((lot) => {
                    return (
                      <div className="imageLotContainer" key={lot.id}>
                        <p>{lot.name}</p>
                        <img
                          className="imageLot"
                          src={`${import.meta.env.VITE_BACKEND_URL}/${
                            lot.image
                          }`}
                          alt={lot.name}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="winners">
                <img
                  className="medaille"
                  src="/images/Podium/2nd.png"
                  alt="2nd"
                />
                {usersPodium
                  .filter((userFiltered) => userFiltered.podium === 2)
                  .map((user) => (
                    <p key={user.id} className="playerNames">
                      {user.pseudo}
                    </p>
                  ))}
                {" - "}
                {lots
                  .filter((lotFiltered) => lotFiltered.podium === 2)
                  .map((lot) => {
                    return (
                      <div className="imageLotContainer" key={lot.id}>
                        <p>{lot.name}</p>
                        <img
                          className="imageLot"
                          src={`${import.meta.env.VITE_BACKEND_URL}/${
                            lot.image
                          }`}
                          alt={lot.name}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="winners">
                <img
                  className="medaille"
                  src="/images/Podium/3rd.png"
                  alt="3rd"
                />
                {usersPodium
                  .filter((userFiltered) => userFiltered.podium === 3)
                  .map((user) => (
                    <p key={user.id} className="playerNames">
                      {user.pseudo}
                    </p>
                  ))}
                {" - "}
                {lots
                  .filter((lotFiltered) => lotFiltered.podium === 3)
                  .map((lot) => {
                    return (
                      <div className="imageLotContainer" key={lot.id}>
                        <p>{lot.name}</p>
                        <img
                          className="imageLot"
                          src={`${import.meta.env.VITE_BACKEND_URL}/${
                            lot.image
                          }`}
                          alt={lot.name}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="container-winners4-6">
              <div className="winners4-6">
                {usersPodium
                  .filter((userFiltered) => userFiltered.podium === 4)
                  .map((user) => (
                    <p key={user.id} className="playerNames">
                      {user.pseudo}
                    </p>
                  ))}
                {" - "}
                <p>5x Tickets gratuits</p>
                <img
                  className="imageLot"
                  src="/images/Utilisateur/ticketgratuit.png"
                  alt="tickets gratuits à gagner"
                />
              </div>
              <div className="winners4-6">
                {usersPodium
                  .filter((userFiltered) => userFiltered.podium === 5)
                  .map((user) => (
                    <p key={user.id} className="playerNames">
                      {user.pseudo}
                    </p>
                  ))}
                {" - "}
                <p>5x Tickets gratuits</p>
                <img
                  className="imageLot"
                  src="/images/Utilisateur/ticketgratuit.png"
                  alt="tickets gratuits à gagner"
                />
              </div>
              <div className="winners4-6">
                {usersPodium
                  .filter((userFiltered) => userFiltered.podium === 6)
                  .map((user) => (
                    <p key={user.id} className="playerNames">
                      {user.pseudo}
                    </p>
                  ))}
                {" - "}
                <p>5x Tickets gratuits</p>
                <img
                  className="imageLot"
                  src="/images/Utilisateur/ticketgratuit.png"
                  alt="tickets gratuits à gagner"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lots">
        <h2>Lots à gagner</h2>
        <div className="container-lotswin">
          <div className="tickets">
            {lots
              .filter((lotsFiltered) => lotsFiltered.win === 0)
              .map((lot) => {
                return (
                  <div key={lot.id} className="ticketsAvailables">
                    <img
                      className="imageLot"
                      src={`${import.meta.env.VITE_BACKEND_URL}/${lot.image}`}
                      alt={lot.name}
                    />
                    <p>{lot.name} </p>
                  </div>
                );
              })}
            <div className="ticketsAvailables">
              <img
                src="/images/Utilisateur/ticketgratuit.png"
                alt="tickets gratuits à gagner"
              />
              <p>5x Tickets gratuits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classement;
