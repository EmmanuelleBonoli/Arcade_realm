import axios from "axios";
import { useState, useEffect } from "react";

export default function DonneesPerso() {
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
        <div className="container-user">
          <h1>Admin</h1>
          <div className="information-user">
            <p>Pseudo : {user[2].pseudo}</p>
            <p>Email : {user[2].email}</p>
            <p>Mot de passe : {user[2].password}</p>
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
