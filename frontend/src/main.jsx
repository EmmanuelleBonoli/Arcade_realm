import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./styles/index.scss";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Classement from "./pages/Classement";
import Presentation from "./pages/Presentation";
import PresentationGame, {
  loadPresentationGame,
} from "./pages/PresentationGame";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import MeilleursScore from "./components/MeilleursScore";
import Echange from "./pages/Echange";
import DonneesPerso from "./components/DonneesPerso";
import AdminServices from "./components/AdminServices";
import AdminUserProfile from "./components/AdminUserProfile";
import MesLotsEchanges from "./components/MesLotsEchanges";
import MesJeuxFavoris from "./components/MesJeuxFavoris";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";

import PresentationDisplayGames from "./components/PresentationDisplayGames";

import ArcadeGame2 from "./pages/ArcadeGame";
import AdminCompetition from "./components/AdminCompetition";

import AdminLots from "./components/AdminLots";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    id: "app",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/evenements",
        element: <Events />,
      },
      {
        path: "/jeuxenligne",
        element: <ArcadeGame2 />,
      },
      {
        path: "/classementetlots",
        element: <Classement />,
      },
      {
        path: "/presentationarcaderealm",
        element: <Presentation />,
      },
      {
        path: "/game/:id",
        element: <PresentationGame />,
        loader: loadPresentationGame,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/presentationgame",
        element: <PresentationDisplayGames />,
      },
      {
        path: "/profilutilisateur",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <DonneesPerso />
              </ProtectedRoute>
            ),
          },
          {
            path: "/profilutilisateur/adminservices",
            element: (
              <ProtectedRouteAdmin>
                <AdminServices />
              </ProtectedRouteAdmin>
            ),
          },
          {
            path: "/profilutilisateur/gestiondeslots",
            element: (
              <ProtectedRouteAdmin>
                <AdminLots />
              </ProtectedRouteAdmin>
            ),
          },
          {
            path: "/profilutilisateur/gestiondesconcours",
            element: (
              <ProtectedRouteAdmin>
                <AdminCompetition />
              </ProtectedRouteAdmin>
            ),
          },
          {
            path: "/profilutilisateur/gestionprofils",
            element: (
              <ProtectedRouteAdmin>
                <AdminUserProfile />
              </ProtectedRouteAdmin>
            ),
          },
          {
            path: "/profilutilisateur/meilleursscores",
            element: (
              <ProtectedRoute>
                <MeilleursScore />
              </ProtectedRoute>
            ),
          },
          {
            path: "/profilutilisateur/meslotsechanges",
            element: (
              <ProtectedRoute>
                <MesLotsEchanges />
              </ProtectedRoute>
            ),
          },
          {
            path: "/profilutilisateur/mesjeuxfavoris",
            element: (
              <ProtectedRoute>
                <MesJeuxFavoris />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/echange",
        element: (
          <ProtectedRoute>
            <Echange />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
