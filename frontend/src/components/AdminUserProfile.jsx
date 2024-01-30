import axios from "axios";
import { useState, useEffect } from "react";
import DetailsUserProfile from "./DetailsUserProfile";

export default function AdminUserProfile() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filterPseudo, setFilterPseudo] = useState("");
  const [detailsProfile, setDetailsProfile] = useState(0);
  const [openDetailsProfile, setOpenDetailsProfile] = useState(false);

  useEffect(() => {
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

    fetchData();
  }, []);

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
    const userA = JSON.parse(localStorage.getItem("token"));
    try {
      const userToUpdate = filteredUsers.find((user) => user.id === userId);
      const updatedUser = { ...userToUpdate, admin: !userToUpdate.admin };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${userId}`,
        { admin: updatedUser.admin },
        {
          headers: {
            Authorization: `Bearer ${userA.token}`,
          },
        }
      );

      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (err) {
      console.error(err);
    }
  };

  function handleDetailsUser(playerId) {
    setDetailsProfile(playerId);
    setOpenDetailsProfile(true);
  }

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
            {filteredUsers.map((player) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
