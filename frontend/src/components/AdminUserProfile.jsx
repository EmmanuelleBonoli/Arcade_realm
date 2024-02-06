import axios from "axios";
import { useState, useEffect, useContext } from "react";
import DetailsUserProfile from "./DetailsUserProfile";
import UserContext from "../contexts/UserContext";

export default function AdminUserProfile() {
  const { userConnected } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filterPseudo, setFilterPseudo] = useState("");
  const [detailsProfile, setDetailsProfile] = useState(0);
  const [openDetailsProfile, setOpenDetailsProfile] = useState(false);

  const fetchData = async () => {
    const userA = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/`,
        {
          headers: {
            Authorization: `Bearer ${userA.token}`,
          },
        }
      );

      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userConnected]);

  const handleInput = (event) => {
    const inputValue = event.target.value;
    setFilterPseudo(inputValue);

    const filteredUsersResult = users.filter((user) =>
      user.pseudo.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredUsers(filteredUsersResult);
  };

  const handleDeletePlayer = async (data) => {
    const userA = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${data}`,
        {
          headers: {
            Authorization: `Bearer ${userA.token}`,
          },
        }
      );
      setFilteredUsers(filteredUsers.filter((player) => player.id !== data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleAdminStatus = async (userId) => {
    const user = JSON.parse(localStorage.getItem("token"));
    let updatedUser = {};
    try {
      const selectedPlayer = users.find((player) => player.id === userId);
      if (selectedPlayer.admin === 0) {
        updatedUser = {
          id: selectedPlayer.id,
          email: selectedPlayer.email,
          image: selectedPlayer.image,
          podium: selectedPlayer.podium,
          points: selectedPlayer.points,
          pseudo: selectedPlayer.pseudo,
          tickets: selectedPlayer.tickets,
          admin: 1,
        };
      } else {
        updatedUser = {
          id: selectedPlayer.id,
          email: selectedPlayer.email,
          image: selectedPlayer.image,
          podium: selectedPlayer.podium,
          points: selectedPlayer.points,
          pseudo: selectedPlayer.pseudo,
          tickets: selectedPlayer.tickets,
          admin: 0,
        };
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${userId}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  function handleDetailsUser(playerId) {
    setDetailsProfile(playerId);
    setOpenDetailsProfile(true);
  }

  if (userConnected) {
    return (
      <div className="adminUserProfile">
        {openDetailsProfile ? (
          <DetailsUserProfile
            detailsProfile={detailsProfile}
            setOpenDetailsProfile={setOpenDetailsProfile}
          />
        ) : (
          <div className="container-player">
            <h1>JOUEURS</h1>
            <div className="wrapper-container">
              <input
                className="input-search-player"
                type="text"
                placeholder="Entrez le nom d'un joueur"
                value={filterPseudo}
                onChange={handleInput}
              />
            </div>{" "}
            <div className="overflow-player">
              {userConnected.id === 3
                ? filteredUsers
                    .filter((user) => user.id !== userConnected.id)
                    .map((player) => (
                      <div className="player-list" key={player.id}>
                        <p
                          onClick={() => handleDetailsUser(player.id)}
                          role="presentation"
                        >
                          {player.pseudo}
                        </p>
                        <img
                          src="/images/Utilisateur/Banned.png"
                          onClick={() => handleDeletePlayer(player.id)}
                          alt="Banned"
                          role="presentation"
                        />
                        <img
                          src={
                            player.admin
                              ? "/images/Utilisateur/admintrue.png"
                              : "/images/Utilisateur/adminfalse.png"
                          }
                          alt=""
                          onClick={() => handleToggleAdminStatus(player.id)}
                          role="presentation"
                        />
                      </div>
                    ))
                : filteredUsers
                    .filter((user) => user.id !== userConnected.id)
                    .map((player) => (
                      <div className="player-list" key={player.id}>
                        <p
                          onClick={() => handleDetailsUser(player.id)}
                          role="presentation"
                        >
                          {player.pseudo}
                        </p>
                        <img
                          src="/images/Utilisateur/Banned.png"
                          onClick={() => handleDeletePlayer(player.id)}
                          alt="Banned"
                          role="presentation"
                        />
                      </div>
                    ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
