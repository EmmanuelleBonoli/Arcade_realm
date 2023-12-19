import axios from "axios";
import { useState, useEffect } from "react";

export default function AdminUserProfile() {
  const [user, setUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(user);
  const [filterPseudo, setFilterPseudo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/`
        );

        setUser(response.data);
        setFilteredUsers(response.data); // Affiche tous les utilisateurs initialement
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleInput = (event) => {
    const inputValue = event.target.value;
    setFilterPseudo(inputValue);

    // Filtrer les utilisateurs en fonction du pseudonyme saisi
    const filteredUsersResult = user.filter((users) =>
      users.pseudo.includes(inputValue)
    );

    setFilteredUsers(filteredUsersResult);
  };
  const handleDeletePlayer = async (data) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${data}`
      );
      setUser(user.filter((player) => player.id !== data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
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
          <img src="/images/Search.png" alt="Search" />
        </div>{" "}
        <div className="overflow-player">
          {filteredUsers.map((player) => (
            <div className="player-list" key={player.id}>
              <p>{player.pseudo}</p>
              <img
                src="/images/Banned.png"
                onClick={() => handleDeletePlayer(player.id)}
                alt="Banned"
                role="presentation"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
