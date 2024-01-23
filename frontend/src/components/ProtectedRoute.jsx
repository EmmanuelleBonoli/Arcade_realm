import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function ProtectedRoute({ children }) {
  const { setUserConnected } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("token"));
        if (!user.token) {
          navigate("/");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/userbytoken`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setUserConnected(res.data[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/");
      }
    };

    fetchUser();

    // Return a cleanup function to avoid issues with navigating after unmount
    return () => {};
  }, [navigate, setUserConnected, location.pathname]);

  return children;
}

export default ProtectedRoute;
