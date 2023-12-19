import axios from "axios";
import { useState, useEffect } from "react";

export default function AdminUserProfile() {
  const [user, setUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterPseudo, setFilterPseudo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleInput = (event) => {
    const inputValue = event.target.value;
    setFilterPseudo(inputValue);

    // Filter users based on the entered pseudonym
    const filteredUsersResult = user.filter((users) =>
      users.pseudo.includes(inputValue)
    );

    setFilteredUsers(filteredUsersResult);
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
        </div>{" "}
        {user.length > 0 && (
          <div className="overflow-player">
            {filteredUsers.map((player) => (
              <div className="player-list" key={player.id}>
                <p>{player.pseudo}</p>
                <img src="/images/Banned.png" alt="Banned" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
