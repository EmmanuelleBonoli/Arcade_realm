import { useContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import UserContext from "../contexts/UserContext";

function Transfer({ lotOldPlayer, lotNewPlayer, playerExchange }) {
  const { userConnected } = useContext(UserContext);
  const [changeTextExchange, setChangeTextExchange] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setChangeTextExchange(true);
    }, 10000);
  }, []);

  return (
    <div className="transfer">
      {userConnected && playerExchange ? (
        <div className="transferPlayers">
          <div className="transferPlayersContainer">
            <div className="tubePart1">
              <div className="tubePart2">
                <h1>Echange en cours ...</h1>
                <img
                  className="symbolExchange"
                  src="images/Utilisateur/echangeur.png"
                  alt="echangeur"
                />
              </div>
              <div className="lotContainer position1">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${
                    lotOldPlayer.image
                  }`}
                  alt="lot échangé"
                />
              </div>
              <div className="lotContainer position2">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${
                    lotNewPlayer.image
                  }`}
                  alt="lot à recevoir"
                />
              </div>
            </div>
            <div className="avatarPlayers">
              <div className="avatarAndNameContainer">
                <div className="avatarContainer">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      userConnected.image
                    }`}
                    alt="avatar Player"
                  />
                </div>
                <p>{userConnected.pseudo}</p>
              </div>
              <div className="avatarAndNameContainer">
                <div className="avatarContainer">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      playerExchange.image
                    }`}
                    alt="avatar Player"
                  />
                </div>
                <p>{playerExchange.pseudo}</p>
              </div>
            </div>
            <div className="wordsContainer">
              <img src="/images/Echange/wordsLeft.png" alt="bulle de BD" />
              {!changeTextExchange ? (
                <p>Aurevoir {lotOldPlayer.name} !!</p>
              ) : (
                <p>Bienvenue {lotNewPlayer.name}!</p>
              )}
            </div>
            <div className="wordsContainer2">
              <img src="/images/Echange/wordsRight.png" alt="bulle de BD" />
              {!changeTextExchange ? (
                <p>Aurevoir {lotNewPlayer.name} !!</p>
              ) : (
                <p>Trop cool ce nouveau lot !</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

Transfer.propTypes = {
  lotOldPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    exchange: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    utilisateur_id: PropTypes.number.isRequired,
    win: PropTypes.number.isRequired,
  }).isRequired,
  lotNewPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    exchange: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    utilisateur_id: PropTypes.number.isRequired,
    win: PropTypes.number.isRequired,
  }).isRequired,
  playerExchange: PropTypes.shape({
    pseudo: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    admin: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
  }).isRequired,
};

export default Transfer;
