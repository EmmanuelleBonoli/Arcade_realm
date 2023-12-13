import axios from "axios";
import { useEffect, useState } from "react";

function PresentationDisplayGames() {
  const [games, setGames] = useState([]);
  const [searchGame, setSearchGame] = useState("");

  useEffect(() => {
    const getGames = async () => {
      const dataGames = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/jeu`
      );
      setGames(dataGames.data);
    };
    getGames();
  }, []);

  const handleSearchGame = (event) => {
    const search = event.target.value;
    setSearchGame(search);
  };
  return (
    <div className="presentationDisplayGames">
      <h2>Nos jeux</h2>
      <div className="games">
        <input
          type="text"
          placeholder="Rechercher un jeu"
          onChange={handleSearchGame}
        />
        <div className="displayGames">
          {games
            .filter((search) => search.name.toLowerCase().includes(searchGame))
            .map((game) => {
              return (
                <img
                  key={game.id}
                  src={`${import.meta.env.VITE_BACKEND_URL}${game.image}`}
                  alt={game.name}
                  className="displayGameImage"
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default PresentationDisplayGames;
