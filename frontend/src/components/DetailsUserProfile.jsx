import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";

function DetailsUserProfile({ setOpenDetailsProfile, detailsProfile }) {
  function handleClose() {
    setOpenDetailsProfile(false);
  }

  const [userDetails, setUserDetails] = useState({});
  const [lotsWin, setlotsWin] = useState([]);

  const getUser = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const fetchUser = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${detailsProfile}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserDetails(fetchUser.data[0]);
    } catch (err) {
      console.error(err);
    }
  };
  const getLots = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const fetchLots = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot/win/${detailsProfile}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setlotsWin(fetchLots.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
    getLots();
  }, []);

  const handleDeleteLots = async (lotId) => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/lot/${lotId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setlotsWin(lotsWin.filter((lot) => lot.id !== lotId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTickets = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const NewUser = {
        pseudo: userDetails.pseudo,
        email: userDetails.email,
        image: userDetails.image,
        admin: userDetails.admin,
        points: userDetails.points,
        podium: userDetails.podium,
        tickets: userDetails.tickets + 5,
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${userDetails.id}`,
        NewUser,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
    getUser();
  };

  const handleDeleteTickets = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const NewUser = {
        pseudo: userDetails.pseudo,
        email: userDetails.email,
        image: userDetails.image,
        admin: userDetails.admin,
        points: userDetails.points,
        podium: userDetails.podium,
        tickets: userDetails.tickets - 5,
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/${userDetails.id}`,
        NewUser,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
    getUser();
  };

  return (
    <div className="detailsUserProfile">
      <img
        className="closeButton"
        src="/images/Jeux_ligne/x.png"
        onClick={handleClose}
        role="presentation"
        alt="fermer la fenetre"
      />
      <div className="playerDetails">
        <h1>{userDetails.pseudo}</h1>
        <h2>Les lots gagnés :</h2>
        <div className="lotsWin">
          {lotsWin.map((lot) => (
            <div className="lotsImages" key={lot.id}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${lot.image}`}
                alt={lot.name}
                className="imgLots"
              />
              <img
                className="suppr"
                src="/images/Utilisateur/delete.png"
                alt="suppr"
                onClick={() => handleDeleteLots(lot.id)}
                role="presentation"
              />
            </div>
          ))}
        </div>
        <h2>Attribution de tickets gratuits :</h2>
        <div className="tickets">
          <button type="button" className="btn-class-name">
            <span className="back" />
            <span
              role="presentation"
              onClick={handleDeleteTickets}
              className="front"
            >
              -
            </span>
          </button>
          <div className="detailsTickets">
            <img
              src="/images/Utilisateur/ticketgratuit.png"
              alt="tickets gratuits"
            />
            <p>{userDetails.tickets}</p>
          </div>

          <button type="button" className="btn-class-name">
            <span className="back" />
            <span
              role="presentation"
              onClick={handleAddTickets}
              className="front"
            >
              +
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

DetailsUserProfile.propTypes = {
  setOpenDetailsProfile: PropTypes.func.isRequired,
  detailsProfile: PropTypes.number.isRequired,
};

export default DetailsUserProfile;
