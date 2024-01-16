import { useContext } from "react";
import ProfileAdmin from "./ProfileAdmin";
import ProfileUser from "./ProfileUser";
import UserContext from "../contexts/UserContext";
import ProtectedRouteAdmin from "../components/ProtectedRouteAdmin";

function Profile() {
  const { userConnected, adminOrNot } = useContext(UserContext);

  if (userConnected === null) {
    return <div className="loading">Loading...</div>;
  }

  if (userConnected) {
    return adminOrNot ? (
      <ProtectedRouteAdmin>
        <ProfileAdmin />
      </ProtectedRouteAdmin>
    ) : (
      <ProfileUser />
    );
  }
}

export default Profile;
