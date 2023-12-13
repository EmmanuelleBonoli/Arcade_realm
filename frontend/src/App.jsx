import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
  const location = useLocation();
  const [background, setBackground] = useState("fond1");

  useEffect(() => {
    const currentUrl = location.pathname;
    if (currentUrl === "/presentationarcaderealm") {
      setBackground("fond2");
    } else {
      setBackground("fond1");
    }
  }, [location]);

  return (
    <div className={`App ${background}`}>
      <NavBar />
      <Outlet />
      <div className="footerContainer" />
      <Footer />
    </div>
  );
}

export default App;
