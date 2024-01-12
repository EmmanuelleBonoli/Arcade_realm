import { useEffect, useState } from "react";
import axios from "axios";

function AdminLots() {
  const [dataLots, setDataLots] = useState([]);

  const getLots = async () => {
    try {
      const fetchLots = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot`
      );
      setDataLots(fetchLots.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLots();
  }, []);

  const handleDeleteLots = async (data) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/lot/${data}`);
      setDataLots(dataLots.filter((lot) => lot.id !== data));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="adminLots">
      <h2>Les lots à gagner</h2>
      <div className="allLots">
        {dataLots
          .filter((lotfilter) => lotfilter.win === 0)
          .map((lot) => {
            return (
              <div className="itemServices" key={lot.id}>
                <img
                  className="lots"
                  src={`${import.meta.env.VITE_BACKEND_URL}${lot.image}`}
                  alt="jeux"
                />
                <img
                  className="suppr"
                  src="/images/Utilisateur/delete.png"
                  alt="suppr"
                  onClick={() => handleDeleteLots(lot.id)}
                  role="presentation"
                />
              </div>
            );
          })}
      </div>
      <h2>Les lots du podium</h2>
      <div className="podium">
        <div className="firstPlace">
          <p>1er Prix :</p>
          <img src="" alt="" />
        </div>
        <div className="secondPlace">
          <p>2ème Prix :</p>
          <img src="" alt="" />
        </div>
        <div className="thirdPlace">
          <p>3ème Prix :</p>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
}

export default AdminLots;
