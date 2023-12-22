// import { NavLink } from "react-router-dom";
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
            `${import.meta.env.VITE_BACKEND_URL}/api/lot/email/${
              userConnected.id
            }`
          )
          .then((response) => {
            setLots(response.data);
            console.info(response.data);
          })
          .catch((error) => console.error(error));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <div>
      {userConnected ? (
        <div className="container-mle">
          <div className="pseudo-joueur">
            <img
              src="/images/Utilisateur/Rectangle 144.png"
              alt="medaille vector"
            />
            <h1>{userConnected.pseudo}</h1>
          </div>
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
              </div>
            ))}
          </div>
          {/* <NavLink to="/echange">
            <div className="bouton-echangerlot">
              <img
                src="/images/Utilisateur/Rectangle 139.png"
                alt="echange-bouton"
              />
              <p>Échanger un lot</p>
            </div>
          </NavLink> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default MesLotsEchanges;
