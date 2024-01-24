import { useState, useEffect } from "react";
import axios from "axios";

function AdminCompetition() {
  const [usersPodium, setUsersPodium] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);
  const [EmptyPodium, setEmptyPodium] = useState(false);

  const getPodium = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const fetchUsers = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/podium`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUsersPodium(fetchUsers.data);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  const getTopPlayers = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const fetchTopPlayers = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/topPlayers`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTopPlayers(fetchTopPlayers.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPodium();
    getTopPlayers();
  }, []);

  const handleDeletePodium = async () => {
    try {
      const updateUserPromises = usersPodium.map(async (user) => {
        const updatedUser = {
          pseudo: user.pseudo,
          email: user.email,
          image: user.image,
          admin: user.admin,
          points: user.points,
          podium: 0,
          tickets: user.tickets,
        };
        const userA = JSON.parse(localStorage.getItem("token"));
        return axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${user.id}`,
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${userA.token}`,
            },
          }
        );
      });
      await Promise.all(updateUserPromises);
      getPodium();
      setEmptyPodium(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewConcours = async () => {
    const userA = JSON.parse(localStorage.getItem("token"));
    try {
      const updateUserPromises = topPlayers.map(async (user, index) => {
        const updatedUser = {
          pseudo: user.pseudo,
          email: user.email,
          image: user.image,
          admin: user.admin,
          points: user.points,
          podium: index + 1,
          tickets: user.tickets,
        };

        return axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${user.id}`,
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${userA.token}`,
            },
          }
        );
      });
      await Promise.all(updateUserPromises);
      getPodium();
      setEmptyPodium(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="adminCompetition">
      {!EmptyPodium ? (
        <div className="adminCompetition">
          <h2>Classement du dernier concours</h2>
          <div className="podium">
            {usersPodium.map((user, index) => {
              return (
                <div className="podiumUsers" key={user.id}>
                  <p className="place">{index + 1}</p>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${user.image}`}
                    alt={user.pseudo}
                  />
                  <p>{user.pseudo}</p>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={handleDeletePodium}>
            Réinitialiser le podium ?
          </button>
        </div>
      ) : (
        <div className="adminCompetition">
          <div className="adminCompetition">
            <h2>En attente de déclaration</h2>
            <div className="podium">
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
            <div className="podium">
              <p>4</p>
              <p>5</p>
              <p>6</p>
            </div>
            <button onClick={handleNewConcours} type="button">
              Annoncer des nouveaux vainqueurs !
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCompetition;
