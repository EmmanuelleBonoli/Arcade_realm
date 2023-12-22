import { Outlet, useLocation } from "react-router-dom";
import { React, useState, useEffect, useMemo } from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import UserContext from "./contexts/UserContext";

function App() {
  const location = useLocation();
  const [background, setBackground] = useState("fond1");
  const [userConnected, setUserConnected] = useState(null);
  const [adminOrNot, setAdminOrNot] = useState(false);

  useEffect(() => {
    const currentUrl = location.pathname;
    if (currentUrl === "/presentationarcaderealm") {
      setBackground("fond2");
    } else {
      setBackground("fond1");
    }
  }, [location]);

  return (
    <UserContext.Provider
      value={useMemo(
        () => ({ userConnected, setUserConnected, adminOrNot, setAdminOrNot }),
        [userConnected, setUserConnected, adminOrNot, setAdminOrNot]
      )}
    >
      <div className={`App ${background}`}>
        <NavBar />
        <Outlet />

        <div className="footerContainer" />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
