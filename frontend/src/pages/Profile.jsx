import { useContext } from "react";
import ProfileAdmin from "./ProfileAdmin";
import ProfileUser from "./ProfileUser";
import UserContext from "../contexts/UserContext";
import ProtectedRoute from "../components/ProtectedRoute";

function Profile() {
  const { userConnected, adminOrNot } = useContext(UserContext);

  if (userConnected === null) {
    return <div className="loading">Loading...</div>;
  }

  if (userConnected) {
    return adminOrNot ? (
      <ProtectedRoute>
        <ProfileAdmin />
      </ProtectedRoute>
    ) : (
      <ProfileUser />
    );
  }
}

export default Profile;
