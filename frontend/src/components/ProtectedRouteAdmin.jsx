import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";

function ProtectedRoute({ children }) {
  const { userConnected } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userConnected.admin !== 1) {
      navigate("/");
    }
  }, [userConnected, navigate]);

  return children;
}

export default ProtectedRoute;
