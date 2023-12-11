import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
      <div className="footerContainer" />
      <Footer />
    </div>
  );
}

export default App;
