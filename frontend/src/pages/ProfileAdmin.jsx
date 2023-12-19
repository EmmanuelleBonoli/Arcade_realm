import DonneesPerso from "../components/DonneesPerso";
import axios from "axios";
import { useState, useEffect } from "react";

function ProfileAdmin() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur`
        );
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {user[2] ? (
        <div className="profileAdmin">
          <div className="avatar">
            <img
              key={user.id}
              src={`${import.meta.env.VITE_BACKEND_URL}${user[2].image}`}
              alt="avatar"
            />
          </div>

          <div className="adminLayout">
            <div className="buttonsChoice">
              <button type="button" className="">
                
                Données Personnelles
              </button>

              <button type="button" className="">
                Gestion des services
              </button>
              <button type="button" className="">
                Gestion des profils
              </button>
            </div>
            <div className="displayChoice">
              <DonneesPerso />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default ProfileAdmin;
