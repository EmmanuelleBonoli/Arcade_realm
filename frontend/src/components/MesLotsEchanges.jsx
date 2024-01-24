import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function MesLotsEchanges() {
  const { userConnected } = useContext(UserContext);
  const [lots, setLots] = useState([]);

  const fetchLot = async () => {
    const user = JSON.parse(localStorage.getItem("token"));

    try {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/lot/win/${userConnected.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )

        .then((response) => {
          setLots(response.data);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (userConnected) {
      fetchLot();
    }
  }, []);

  async function handleStartExchange(lot) {
    let updatedExchangeLot = {};
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      if (lot.exchange === 1) {
        updatedExchangeLot = {
          name: lot.name,
          image: lot.image,
          description: lot.description,
          utilisateurId: userConnected.id,
          win: lot.win,
          exchange: 0,
          podium: lot.podium,
          mystery: lot.mystery,
        };
      } else if (lot.exchange === 0) {
        updatedExchangeLot = {
          name: lot.name,
          image: lot.image,
          description: lot.description,
          utilisateurId: userConnected.id,
          win: lot.win,
          exchange: 1,
          podium: lot.podium,
          mystery: lot.mystery,
        };
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot/${lot.id}`,
        updatedExchangeLot,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      fetchLot();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="lotsExchangeUser">
      {userConnected ? (
        <div className="container-mle">
          <div className="pseudo-joueur">
            <img
              src="/images/Utilisateur/Rectangle 144.png"
              alt="medaille vector"
            />
            <h1>{userConnected.pseudo}</h1>
          </div>
          <div className="ticketsPlayer">
            <img
              src="/images/Utilisateur/ticketgratuit.png"
              alt="tickets gratuits"
            />
            <p>parties gratuites :</p>
            <p>{userConnected.tickets}</p>
          </div>
          <h2>Mettre à l'échange ?</h2>
          <div className="mes-lots">
            {lots.map((lot) => (
              <div key={lot.id} className="t-1">
                <div className="premier-prix">
                  <p className="nom-item">{lot.name}</p>
                </div>
                <div className="img-prix">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${lot.image}`}
                    title={lot.description}
                    alt={lot.name}
                  />
                </div>

                <div className="inputSelectContainer">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="inputSelect">
                    <input
                      checked={lot.exchange === 1}
                      onChange={() => handleStartExchange(lot)}
                      type="checkbox"
                    />
                    <svg viewBox="0 0 64 64" height="2em" width="2em">
                      <path
                        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                        pathLength="575.0541381835938"
                        className="path"
                      />
                    </svg>
                  </label>
                </div>
                {/* <input
                  checked={lot.exchange === 1}
                  type="checkbox"
                  onChange={() => handleStartExchange(lot)}
                /> */}
              </div>
            ))}
          </div>
          <NavLink to="/echange">
            <div className="bouton-echangerlot">
              <img
                src="/images/Utilisateur/Rectangle 139.png"
                alt="echange-bouton"
              />
              <p>Échanger un lot</p>
            </div>
          </NavLink>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default MesLotsEchanges;
