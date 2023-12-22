import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function Echange() {
  const { userConnected } = useContext(UserContext);
  const [lots, setLots] = useState([]);
  const [lotSelected, setLotSelected] = useState(
    "images/Utilisateur/img-n-coche.png"
  );

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

  function handleSelect() {
    if (lotSelected === "images/Utilisateur/img-n-coche.png") {
      setLotSelected("images/Utilisateur/img-coche.png");
    } else {
      setLotSelected("images/Utilisateur/img-n-coche.png");
    }
  }
  function handleSelect2() {
    if (lotSelected === "images/Utilisateur/img-n-coche.png") {
      setLotSelected("images/Utilisateur/img-coche.png");
    } else {
      setLotSelected("images/Utilisateur/img-n-coche.png");
    }
  }

  return (

    <div>
      {userConnected ? (
        <div className="home-echange">
          <div className="container-echange">
            <NavLink to="/profilutilisateur">
              <div className="retour-page">Retour à mon profil</div>
            </NavLink>
            <div className="mes-lots">
              <h1>Wild_Gamer</h1>
              <div className="lots-user">
                <div className="lots-scores">
                  <p>Mes lot à échanger :</p>
                  <div className="images-recompense">
                    {lots.map((lot) => (
                      <div>
                        <img
                          key={lot.id}
                          src={`${import.meta.env.VITE_BACKEND_URL}${
                            lot.image
                          }`}
                          alt={lot.name}
                        />
                        <div className="elispe-coché">
                          <img
                            src={lotSelected}
                            onClick={handleSelect}
                            alt="coche échange"
                            role="presentation"
                          />
                        </div>
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
                  <p>24 500 pts</p>

                </div>
              </div>
            </div>
            <div className="image-echangeur">
              <img src="images/Utilisateur/echangeur.png" alt="echangeur" />
            </div>
            <div className="echange-joueur">
              <div className="Joueurs-p1">
                <h1>Joueurs</h1>
                <p>Les lots disponibles :</p>
                <div className="lots-disponibles">
                  <div className="images-echange">
                    <img src="images/SuperNes3.png" alt="" />
                    <div className="elispe-coché-echange">
                      <img
                        src={lotSelected}
                        onClick={handleSelect2}
                        alt="coche échange"
                        role="presentation"
                      />
                    </div>
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
                />
                <p>50 000 pts</p>
              </div>
            </div>
          </div>
          <div className="avatar">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${userConnected.image}`}
              alt="avatar"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Echange;
