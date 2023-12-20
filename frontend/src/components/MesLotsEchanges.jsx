import { NavLink } from "react-router-dom";
import { useContext } from "react";
// import axios from "axios";
import UserContext from "../contexts/UserContext";

function MesLotsEchanges() {
  const { userConnected } = useContext(UserContext);
  // const [lots, setLots] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_BACKEND_URL}/api/lot/`, {
  //       params: {
  //         join: "utilisateur_id",
  //       },
  //     })
  //     .then((response) => setLots(response.data))
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <div className="container-mle">
      <div className="pseudo-joueur">
        <img
          src="/images/Utilisateur/Rectangle 144.png"
          alt="medaille vector"
        />
        <h1>{userConnected.pseudo}</h1>
      </div>
      <div className="mes-lots">
        {/* {lots.map((lot) => (
          <div key={lot.id} className="t-1">
            <div className="premier-prix">
              <p className="titre-prix">1er prix</p>
              <p className="nom-item">{lot.name}</p>
            </div>
            <div className="img-prix">
              <img src={lot.image} alt={lot.name} />
            </div>
          </div>
        ))} */}
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
  );
}

export default MesLotsEchanges;
