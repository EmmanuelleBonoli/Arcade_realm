import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import LotSelection from "../components/LotSelection";
import Transfer from "../components/Transfer";

function Echange() {
  const { userConnected } = useContext(UserContext);
  const [lotsWin, setLotsWin] = useState([]);
  const [lotsAvailable, setLotsAvailable] = useState([]);
  const [selectedLotsWin, setSelectedLotsWin] = useState([]);
  const [selectedLotsAvailable, setSelectedLotsAvailable] = useState([]);
  const [transfer, setTransfer] = useState(false);
  const [lotOldPlayer, setLotOldPlayer] = useState([]);
  const [lotNewPlayer, setLotNewPlayer] = useState([]);
  const audio = useRef(null);
  const [playerExchange, setPlayerExchange] = useState({});
  const [pointsUser, setPointsUser] = useState(0);
  const [NotEnoughPoints, setNotEnoughPoints] = useState(false);

  const loadLotsWin = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot/win/${userConnected.id}`
      );
      setLotsWin(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadLotsAvailable = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot/exchange`
      );
      setLotsAvailable(response.data);

      const userScore = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${
          userConnected.id
        }`
      );
      setPointsUser(userScore.data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (userConnected) {
      loadLotsWin();
      loadLotsAvailable();
    }
  }, []);

  useEffect(() => {
    const selectedLotWinObject = lotsWin.find(
      (lot) => lot.id === selectedLotsWin[0]
    );
    const selectedLotAvailableObject = lotsAvailable.find(
      (lot) => lot.id === selectedLotsAvailable[0]
    );
    setLotNewPlayer(selectedLotAvailableObject);
    setLotOldPlayer(selectedLotWinObject);

    if (selectedLotAvailableObject !== undefined) {
      const getPlayerExchange = async () => {
        try {
          const fetchPlayer = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${
              selectedLotAvailableObject.utilisateur_id
            }`
          );
          setPlayerExchange(fetchPlayer.data[0]);
        } catch (err) {
          console.error(err);
        }
      };

      getPlayerExchange();
    }
  }, [selectedLotsWin, selectedLotsAvailable, lotsWin]);

  function handleTransfer() {
    if (lotNewPlayer !== undefined && lotOldPlayer !== undefined) {
      setTransfer(true);

      const doTheExchange = async () => {
        const updatedOldLot = {
          name: lotOldPlayer.name,
          image: lotOldPlayer.image,
          description: lotOldPlayer.description,
          utilisateurId: playerExchange.id,
          win: lotOldPlayer.win,
          exchange: 0,
          podium: lotOldPlayer.podium,
        };

        const updatedNewLot = {
          name: lotNewPlayer.name,
          image: lotNewPlayer.image,
          description: lotNewPlayer.description,
          utilisateurId: userConnected.id,
          win: lotNewPlayer.win,
          exchange: 0,
          podium: lotNewPlayer.podium,
        };

        try {
          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/lot/${lotOldPlayer.id}`,
            updatedOldLot
          );

          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/lot/${lotNewPlayer.id}`,
            updatedNewLot
          );
        } catch (err) {
          console.error(err);
        }
      };
      doTheExchange();
      setTimeout(() => {
        loadLotsWin();
        loadLotsAvailable();
        setTransfer(false);
      }, 20000);
    }
  }

  useEffect(() => {
    if (transfer === true) {
      if (audio.current != null) {
        audio.current.muted = false;
        audio.current.play();
      }
    } else {
      audio.current.muted = true;
    }
  }, [transfer]);

  function handleBuyMysteryBox() {
    if (userConnected && pointsUser) {
      if (pointsUser >= 50000) {
        const buyMystery = async () => {
          const updatedUser = {
            id: userConnected.id,
            pseudo: userConnected.pseudo,
            email: userConnected.email,
            image: userConnected.image,
            admin: userConnected.admin,
            points: userConnected.points - 50000,
            podium: userConnected.podium,
            tickets: userConnected.tickets,
          };

          try {
            await axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${
                userConnected.id
              }`,
              updatedUser
            );
          } catch (err) {
            console.error(err);
          }
        };
        buyMystery();
      } else {
        setNotEnoughPoints(true);
        setTimeout(() => setNotEnoughPoints(false), 3000);
      }
    }
  }
  return (
    <div>
      {userConnected ? (
        <div>
          <audio className="pokemonExchange" ref={audio} muted>
            <track kind="captions" />
            <source src="/sons/EchangeLot.mp3" type="audio/mp3" />
          </audio>
          {transfer ? (
            <Transfer
              playerExchange={playerExchange}
              lotOldPlayer={lotOldPlayer}
              lotNewPlayer={lotNewPlayer}
            />
          ) : (
            <div className="home-echange">
              <div className="container-echange">
                <NavLink to="/profilutilisateur">
                  <div className="retour-page">
                    <img src="/images/Utilisateur/retour.png" alt="retour" />
                    Retour à mon profil
                  </div>
                </NavLink>
                <div className="mes-lots">
                  <h1>{userConnected.pseudo}</h1>
                  <div className="lots-user">
                    <div className="lots-scores">
                      <p>Mes lot à échanger :</p>
                      <div className="images-recompense">
                        {lotsWin.map((lot) => (
                          <div className="lotWinPlayer" key={lot.id}>
                            <img
                              className="lotsWin"
                              src={`${import.meta.env.VITE_BACKEND_URL}${
                                lot.image
                              }`}
                              alt={lot.name}
                            />
                            <LotSelection
                              lotId={lot.id}
                              selectedLots={selectedLotsWin}
                              setSelectedLots={setSelectedLotsWin}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="gl-trait-echange">
                      <div className="trait-echange" />
                    </div>
                    <div className="user-score">
                      <p>
                        <strong>Score : </strong>
                      </p>
                      <p>{pointsUser.points} pts</p>
                    </div>
                  </div>
                </div>
                <div className="image-echangeur">
                  <img
                    onClick={handleTransfer}
                    role="presentation"
                    src="images/Utilisateur/echangeur.png"
                    alt="echangeur"
                  />
                  {NotEnoughPoints ? (
                    <p>
                      Tu n'as pas assez de points, n'hésites pas rejouer à nos
                      jeux !
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="echange-joueur">
                  <div className="Joueurs-p1">
                    <h1>Joueurs</h1>
                    <p>Les lots disponibles :</p>
                    <div className="lots-disponibles">
                      <div className="images-echange">
                        {lotsAvailable
                          .filter(
                            (excludeLot) =>
                              excludeLot.utilisateur_id !== userConnected.id
                          )
                          .map((lot) => (
                            <div className="lotWinPlayer" key={lot.id}>
                              <img
                                className="lotsWin"
                                src={`${import.meta.env.VITE_BACKEND_URL}${
                                  lot.image
                                }`}
                                alt={lot.name}
                              />
                              <LotSelection
                                lotId={lot.id}
                                selectedLots={selectedLotsAvailable}
                                setSelectedLots={setSelectedLotsAvailable}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="gl-trait-echange-2">
                    <div className="trait-echange-2" />
                  </div>
                  <div className="Joueurs-p2">
                    <h1>MYSTERY BOX</h1>
                    <img
                      src="/images/Utilisateur/mystery_box.png"
                      alt="mystery_box"
                      role="presentation"
                      onClick={handleBuyMysteryBox}
                    />
                    <p>50 000 pts</p>
                  </div>
                </div>
              </div>
              <div className="avatar">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${
                    userConnected.image
                  }`}
                  alt="avatar"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Echange;
