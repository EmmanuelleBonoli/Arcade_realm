import axios from "axios";
import { useState, useEffect } from "react";
import DetailsUserProfile from "./DetailsUserProfile";

export default function AdminUserProfile() {
  const [user, setUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(user);
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

        setUser(response.data);
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

    const filteredUsersResult = user.filter((users) =>
      users.pseudo.toLowerCase().includes(inputValue.toLowerCase())
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

  function handleDetailsUser(playerId) {
    setDetailsProfile(playerId);
    setOpenDetailsProfile(true);
  }

  return (
    <div>
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
            {filteredUsers.map(
              (player) =>
                !player.admin && (
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
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
