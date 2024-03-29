import { Outlet, useLocation } from "react-router-dom";
import { React, useState, useEffect, useMemo } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import UserContext from "./contexts/UserContext";
import GameContext from "./contexts/GameContext";

function App() {
  const location = useLocation();
  const [background, setBackground] = useState("fond1");
  const [userConnected, setUserConnected] = useState(null);
  const [adminOrNot, setAdminOrNot] = useState(false);
  // States pour la borne d'arcade en ligne
  const [openGames, setOpenGames] = useState(false);
  const [isPressedRed, setIsPressedRed] = useState(false);
  const [isPressedBlue, setIsPressedBlue] = useState(false);
  const [isPressedGreen, setIsPressedGreen] = useState(false);
  const [isPressedYellow, setIsPressedYellow] = useState(false);
  const [isJoystickSelected, setIsJoystickSelected] = useState(false);
  const [chooseScreen, setChooseScreen] = useState("start");
  const [gameSelected, setGameSelected] = useState(0);
  const [chooseArrow, setChooseArrow] = useState([false, false, false, false]);
  const [scorePlayer, setScorePlayer] = useState(0);
  const [missedArrow, setMissedArrow] = useState([]);
  const [intervalIsActive, setIntervalIsActive] = useState(true);
  const [winPlayer, setWinPlayer] = useState(false);

  useEffect(() => {
    const currentUrl = location.pathname;
    if (currentUrl === "/presentationarcaderealm") {
      setBackground("fond2");
    } else {
      setBackground("fond1");
    }
  }, [location]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    if (user) {
      const fetchUser = async () => {
        try {
          const dataUser = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/userbytoken`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          setUserConnected(dataUser.data[0]);

          if (dataUser.data[0].admin) {
            setAdminOrNot(true);
          }
        } catch (err) {
          if (err.response.data.error === "token expired") {
            localStorage.removeItem("token");
          } else {
            console.error(err);
          }
        }
      };
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider
      value={useMemo(
        () => ({ userConnected, setUserConnected, adminOrNot, setAdminOrNot }),
        [userConnected, setUserConnected, adminOrNot, setAdminOrNot]
      )}
    >
      <GameContext.Provider
        value={useMemo(
          () => ({
            winPlayer,
            setWinPlayer,
            setIntervalIsActive,
            intervalIsActive,
            missedArrow,
            setMissedArrow,
            chooseArrow,
            setChooseArrow,
            scorePlayer,
            setScorePlayer,
            gameSelected,
            setGameSelected,
            isJoystickSelected,
            setIsJoystickSelected,
            setIsPressedRed,
            setIsPressedBlue,
            setIsPressedGreen,
            setIsPressedYellow,
            isPressedYellow,
            isPressedGreen,
            isPressedBlue,
            isPressedRed,
            openGames,
            setOpenGames,
            chooseScreen,
            setChooseScreen,
          }),
          [
            winPlayer,
            setWinPlayer,
            missedArrow,
            setMissedArrow,
            chooseArrow,
            setChooseArrow,
            scorePlayer,
            setScorePlayer,
            gameSelected,
            setGameSelected,
            isJoystickSelected,
            setIsJoystickSelected,
            setIsPressedRed,
            setIsPressedBlue,
            setIsPressedGreen,
            setIsPressedYellow,
            isPressedYellow,
            isPressedGreen,
            isPressedBlue,
            isPressedRed,
            openGames,
            setOpenGames,
            chooseScreen,
            setChooseScreen,
          ]
        )}
      >
        <div className={`App ${background}`}>
          {!openGames ? <NavBar /> : ""}
          <Outlet />

          <div className="footerContainer" />
          {!openGames ? <Footer /> : ""}
        </div>
      </GameContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
