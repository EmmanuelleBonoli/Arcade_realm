import axios from "axios";
import { useState, useEffect } from "react";

export default function DonneesPerso() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/3`
        );
        setUser(response.data[0]);
        // console.log(user);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {user ? (
        <div className="container-user">
          <div className="header-wrapper">
            <div className="img-wrapper">
              <img src="/images/Edit.png" alt="edit-img" />
            </div>
            <h1>Admin</h1>
          </div>

          <div className="information-user">
            <p>
              <strong>
                <span>Pseudo</span>
              </strong>{" "}
              : {user.pseudo}
            </p>
            <p>
              <strong>
                <span>Email</span>
              </strong>{" "}
              : {user.email}
            </p>
            <p>
              <strong>
                <span>Mot de passe</span>
              </strong>{" "}
              : {user.password}
            </p>
          </div>
          <div className="btn-profil">
            <button className="deleteprofil" type="button">
              Supprimer le profil
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
