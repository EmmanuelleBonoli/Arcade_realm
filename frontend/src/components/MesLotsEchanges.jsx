import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function MesLotsEchanges() {
  const { userConnected } = useContext(UserContext);
  const [lots, setLots] = useState([]);

  useEffect(() => {
    if (userConnected) {
      try {
        axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/api/lot/win/${
              userConnected.id
            }`
          )
          .then((response) => {
            setLots(response.data);
          })
          .catch((error) => console.error(error));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  function handleStartExchange(lot) {
    return async () => {
      let updatedExchangeLot = {};

      try {
        if (lot.exchange === 1) {
          updatedExchangeLot = {
            name: lot.name,
            image: lot.image,
            description: lot.description,
            utilisateurId: userConnected.id,
            win: lot.win,
            exchange: 0,
          };
        } else if (lot.exchange === 0) {
          updatedExchangeLot = {
            name: lot.name,
            image: lot.image,
            description: lot.description,
            utilisateurId: userConnected.id,
            win: lot.win,
            exchange: 1,
          };
        }

        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/lot/${lot.id}`,
          updatedExchangeLot
        );
      } catch (err) {
        console.error(err);
      }
    };
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
                <input
                  checked={lot.exchange === 1}
                  type="checkbox"
                  onChange={handleStartExchange(lot)}
                />
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
