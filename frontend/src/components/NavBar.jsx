import { NavLink } from "react-router-dom";

function NavBar() {

  function determineActive({ isActive }) {
    if (isActive === true) {
      return "active";
    } else {
      return "";
    }
  }


  return <div className="navBar">
    <div className="Int-navBar">
<nav className="nav-pt-1">
  <NavLink to={"/"} className={determineActive}>HOME</NavLink>
  <NavLink to={"/Contact"}> CONTACT</NavLink>
</nav>
<img src="./Images/logo.png" alt="logo-arcade"/>
<nav className="nav-pt-2">
<p>INSCRIPTION</p>
<p>CONNEXION</p>

</nav>


</div>
    </div>;
}

export default NavBar;
