import React, { useEffect, useState } from "react";
import axios from "axios";

function Classement() {
  const [lots, setLots] = useState([]);
  const [lotsFuture, setLotsFuture] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const copylots = [...lots];
    const newlotsFuture = copylots.splice(4, 3);
    setLotsFuture(newlotsFuture);
  }, [lots]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/lot`)
      .then((response) => {
        const sortedLots = response.data.slice(0, 7);
        setLots(sortedLots);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/utilisateur`)
      .then((response) => {
        const sortedUsers = response.data
          .filter((user) => user.points > 0)
          .sort((a, b) => b.points - a.points)
          .slice(0, 6);

        const userData = sortedUsers.map((user) => ({
          id: user.id,
          pseudo: user.pseudo,
          image: user.image,
        }));
        setUsers(userData);
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
      });
  }, []);

  return (
    <div className="parent-container">
      <div className="classement-recompense">
        <div className="classement">
          <h1>Classement de la semaine</h1>
          <div className="top-3">
            {users[0] && users[1] && users[2] ? (
              <>
                <div className="winner2">
                  <p>{users[1].pseudo}</p>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${users[1].image}`}
                    alt={users[1].pseudo}
                  />
                </div>
                <div className="winner1">
                  <p>{users[0].pseudo}</p>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${users[0].image}`}
                    alt={users[0].pseudo}
                  />
                </div>
                <div className="winner3">
                  <p>{users[2].pseudo}</p>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${users[2].image}`}
                    alt={users[2].pseudo}
                  />
                </div>
              </>
            ) : (
              ""
            )}
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
              {users[0] &&
                users[1] &&
                users[2] &&
                lots[1] &&
                lots[2] &&
                lots[3] && (
                  <>
                    <div>
                      <img
                        className="medaille"
                        src="./images/Podium/1st.png"
                        alt="1st"
                      />
                      {users[0].pseudo}
                      {" - "}
                      {lots[1].name}
                      <img
                        className="imageLot"
                        src={`${import.meta.env.VITE_BACKEND_URL}${
                          lots[1].image
                        }`}
                        alt={lots[1].name}
                      />
                    </div>
                    <div>
                      <img
                        className="medaille"
                        src="./images/Podium/2nd.png"
                        alt="2nd"
                      />
                      {users[1].pseudo}
                      {" - "}
                      {lots[2].name}
                      <img
                        className="imageLot"
                        src={`${import.meta.env.VITE_BACKEND_URL}${
                          lots[2].image
                        }`}
                        alt={lots[2].name}
                      />
                    </div>
                    <div>
                      <img
                        className="medaille"
                        src="./images/Podium/3rd.png"
                        alt="3rd"
                      />
                      {users[2].pseudo}
                      {" - "}
                      {lots[3].name}
                      <img
                        className="imageLot"
                        src={`${import.meta.env.VITE_BACKEND_URL}${
                          lots[3].image
                        }`}
                        alt={lots[3].name}
                      />
                    </div>
                  </>
                )}
            </div>
            <div className="container-winners4-6">
              {users[3] && users[4] && users[5] && lots[0] ? (
                <>
                  <div className="winners4-6">
                    {users[3].pseudo}
                    {" - "}
                    {lots[0].name}
                    <img
                      className="imageLot"
                      src={`${import.meta.env.VITE_BACKEND_URL}${
                        lots[0].image
                      }`}
                      alt={lots[0].name}
                    />
                  </div>
                  <div className="winners4-6">
                    {users[4].pseudo}
                    {" - "}
                    {lots[0].name}
                    <img
                      className="imageLot"
                      src={`${import.meta.env.VITE_BACKEND_URL}${
                        lots[0].image
                      }`}
                      alt={lots[0].name}
                    />
                  </div>
                  <div className="winners4-6">
                    {users[5].pseudo}
                    {" - "}
                    {lots[0].name}
                    <img
                      className="imageLot"
                      src={`${import.meta.env.VITE_BACKEND_URL}${
                        lots[0].image
                      }`}
                      alt={lots[0].name}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="lots">
        <h2>Lots à gagner</h2>
        <div className="container-lotswin">
          <div className="tickets">
            <img
              className="imageLot"
              src={`${import.meta.env.VITE_BACKEND_URL}${lots[0].image}`}
              alt={lots[0].name}
            />
            {lots[0].name}
          </div>
          {lotsFuture.map((lot) => (
            <div key={lot.id} className="lotswin">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${lot.image}`}
                alt={lot.name}
              />
              <h3>{lot.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Classement;
