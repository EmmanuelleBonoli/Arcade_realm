import { useEffect, useState } from "react";
import axios from "axios";
import ProfileAdmin from "./ProfileAdmin";
import ProfileUser from "./ProfileUser";

function Profile() {
  const [userConnected, setUserConnected] = useState(null);
  const [adminOrNot, setAdminOrNot] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const dataUser = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur/2
          `
        );
        setUserConnected(dataUser.data[0]);
      } catch (error) {
        console.error(error.message);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (userConnected && userConnected.admin === 1) {
      setAdminOrNot(true);
    } else {
      setAdminOrNot(false);
    }
  }, [userConnected]);

  if (userConnected === null) {
    return <div className="loading">Loading...</div>;
  }

  if (userConnected) {
    return adminOrNot ? (
      <ProfileAdmin userConnected={userConnected} />
    ) : (
      <ProfileUser userConnected={userConnected} />
    );
  }
}

export default Profile;
