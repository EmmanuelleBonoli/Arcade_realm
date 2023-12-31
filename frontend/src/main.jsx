import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./styles/index.scss";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Classement from "./pages/Classement";
import Presentation from "./pages/Presentation";
import PresentationGame from "./pages/PresentationGame";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
// import ProfileAdmin from "./pages/ProfileAdmin";
import MeilleursScore from "./components/MeilleursScore";
import Echange from "./pages/Echange";
import DonneesPerso from "./components/DonneesPerso";
import AdminServices from "./components/AdminServices";
import AdminUserProfile from "./components/AdminUserProfile";
import MesLotsEchanges from "./components/MesLotsEchanges";
import MesJeuxFavoris from "./components/MesJeuxFavoris";
import ProtectedRoute from "./components/ProtectedRoute";

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
        path: "/classementetlots",
        element: <Classement />,
      },
      {
        path: "/presentationarcaderealm",
        element: <Presentation />,
      },
      {
        path: "/presentationarcaderealm/:id",
        element: <PresentationGame />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
              <ProtectedRoute>
                <AdminServices />
              </ProtectedRoute>
            ),
          },
          {
            path: "/profilutilisateur/gestionprofils",
            element: (
              <ProtectedRoute>
                <AdminUserProfile />
              </ProtectedRoute>
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
        element: <Echange />,
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
