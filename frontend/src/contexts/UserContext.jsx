import { createContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

const UserContext = createContext();
// const navigate = useNavigate();
// const location = useLocation();

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     axios.get`${import.meta.env.VITE_BACKEND_URL}/api/userbytoken`,
//     {
//         headers: {"Authorization: `Bearer $(localStorade.getItem("token")`"}
//     }
//   } else {
//     navigate("/login");
//   }
// }, [location.pathname]);

export default UserContext;
