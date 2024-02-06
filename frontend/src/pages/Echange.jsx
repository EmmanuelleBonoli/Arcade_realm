import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import LotSelection from "../components/LotSelection";
import Transfer from "../components/Transfer";
import EchangeMysteryBox from "../components/EchangeMysteryBox";

function Echange() {
  const { userConnected } = useContext(UserContext);
  const [lotsWin, setLotsWin] = useState([]);
  const [lotsAvailable, setLotsAvailable] = useState([]);
  const [selectedLotsWin, setSelectedLotsWin] = useState([]);
  const [selectedLotsAvailable, setSelectedLotsAvailable] = useState([]);
  const [transfer, setTransfer] = useState(false);
  const [lotOldPlayer, setLotOldPlayer] = useState([]);
  const [lotNewPlayer, setLotNewPlayer] = useState([]);
  const [playerExchange, setPlayerExchange] = useState({});
  const [pointsUser, setPointsUser] = useState(0);
  const [NotEnoughPoints, setNotEnoughPoints] = useState(false);
  const [buyMystery, setBuyMystery] = useState(false);
  const [lotMystery, setLotMystery] = useState([]);
  const audio = useRef(null);
  const audio2 = useRef(null);
  const audio3 = useRef(null);
  const audio4 = useRef(null);
  const audio5 = useRef(null);

  const loadLotsWin = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot/win/${userConnected.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLotsWin(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadLotMystery = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot/mystery`
      );
      setLotMystery(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadLotsAvailable = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot/exchange`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLotsAvailable(response.data);

      const userScore = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${
          userConnected.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
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
      loadLotMystery();
    }
  }, [userConnected]);

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
        const user = JSON.parse(localStorage.getItem("token"));
        try {
          const fetchPlayer = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${
              selectedLotAvailableObject.utilisateur_id
            }`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
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
          mystery: lotOldPlayer.mystery,
        };

        const updatedNewLot = {
          name: lotNewPlayer.name,
          image: lotNewPlayer.image,
          description: lotNewPlayer.description,
          utilisateurId: userConnected.id,
          win: lotNewPlayer.win,
          exchange: 0,
          podium: lotNewPlayer.podium,
          mystery: lotNewPlayer.mystery,
        };
        const user = JSON.parse(localStorage.getItem("token"));
        try {
          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/lot/${lotOldPlayer.id}`,
            updatedOldLot,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/lot/${lotNewPlayer.id}`,
            updatedNewLot,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
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
      }, 10000);
    }
  }

  useEffect(() => {
    if (transfer === true) {
      if (audio.current !== null) {
        audio.current.muted = false;
        audio.current.play();
      }
    } else if (audio.current !== null) {
      audio.current.muted = true;
    }
  }, [transfer]);

  useEffect(() => {
    if (buyMystery === true) {
      if (
        audio5.current !== null &&
        audio2.current !== null &&
        audio3.current !== null &&
        audio4.current !== null
      ) {
        audio5.current.muted = false;
        audio5.current.play();
        setTimeout(() => {
          audio2.current.muted = false;
          audio2.current.play();
        }, 1000);
        setTimeout(() => {
          audio2.current.muted = false;
          audio2.current.play();
        }, 1000);
        setTimeout(() => {
          audio3.current.muted = false;
          audio3.current.play();
        }, 2000);
        setTimeout(() => {
          audio4.current.muted = false;
          audio4.current.play();
        }, 2500);
      }
    } else if (
      audio5.current !== null &&
      audio2.current !== null &&
      audio3.current !== null &&
      audio4.current !== null
    ) {
      audio5.current.muted = true;
      audio2.current.muted = true;
      audio3.current.muted = true;
      audio4.current.muted = true;
    }
  }, [buyMystery]);

  function handleBuyMysteryBox() {
    if (userConnected && pointsUser) {
      if (pointsUser.points >= 50000) {
        setBuyMystery(true);
        const buyMysteryBox = async () => {
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

          const updatedMystery = {
            name: lotMystery[0].name,
            image: lotMystery[0].image,
            description: lotMystery[0].description,
            utilisateurId: userConnected.id,
            win: 1,
            exchange: 0,
            podium: lotMystery[0].podium,
            mystery: 0,
          };

          const createNewMystery = {
            name: lotMystery[0].name,
            image: lotMystery[0].image,
            description: lotMystery[0].description,
            utilisateurId: null,
            win: 1,
            exchange: 0,
            podium: 0,
            mystery: 1,
          };

          const user = JSON.parse(localStorage.getItem("token"));
          try {
            await axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${
                userConnected.id
              }`,
              updatedUser,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );

            await axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/api/lot/${lotMystery[0].id}`,
              updatedMystery,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );

            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/lot/mystery`,
              createNewMystery,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
          } catch (err) {
            console.error(err);
          }
        };
        buyMysteryBox();
        // setTimeout(() => {
        //   setBuyMystery(false);
        //   loadLotsWin();
        //   loadLotsAvailable();
        // }, 8000);
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
          <audio className="buyMystery" ref={audio2} muted>
            <track kind="captions" />
            <source src="/sons/MarioJump.mp3" type="audio/mp3" />
          </audio>
          <audio className="buyMystery" ref={audio3} muted>
            <track kind="captions" />
            <source src="/sons/MarioOpen.mp3" type="audio/mp3" />
          </audio>
          <audio className="buyMystery" ref={audio4} muted>
            <track kind="captions" />
            <source src="/sons/MarioVictory.mp3" type="audio/mp3" />
          </audio>
          <audio className="buyMystery" ref={audio5} muted>
            <track kind="captions" />
            <source src="/sons/MarioYahoo.mp3" type="audio/mp3" />
          </audio>
          {transfer && !buyMystery ? (
            <Transfer
              playerExchange={playerExchange}
              lotOldPlayer={lotOldPlayer}
              lotNewPlayer={lotNewPlayer}
            />
          ) : (
            ""
          )}
          {!transfer && !buyMystery ? (
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
                      <p>Mes lots à échanger :</p>
                      <div className="images-recompense">
                        {lotsWin.map((lot) => (
                          <div className="lotWinPlayer" key={lot.id}>
                            <img
                              className="lotsWin"
                              src={`${import.meta.env.VITE_BACKEND_URL}/${
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
                      Tu n'as pas assez de points, n'hésites pas à rejouer à nos
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
                                src={`${import.meta.env.VITE_BACKEND_URL}/${
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
                      onClick={() => handleBuyMysteryBox()}
                    />
                    <p>50 000 pts</p>
                  </div>
                </div>
              </div>
              <div className="avatar">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    userConnected.image
                  }`}
                  alt="avatar"
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {!transfer && buyMystery ? (
            <EchangeMysteryBox lotMystery={lotMystery} />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Echange;
